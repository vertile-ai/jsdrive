import fs from "node:fs";
import ts from "typescript";

const sourcePath = process.argv[2];
if (sourcePath === undefined) throw new Error("Expected a TypeScript test file path");

const source = ts.createSourceFile(
  sourcePath,
  fs.readFileSync(sourcePath, "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const titles = [];
const unknown = Symbol("unknown");
const nodeTestFunction = Symbol("node:test function");
const skipReasonFunction = Symbol("browser case skip helper");

function sourceContainsTestIdLiteral(node) {
  if (
    (ts.isStringLiteral(node) || ts.isTemplateLiteralToken(node))
    && /ZDTEST-\d{4}/.test(node.text)
  ) return true;
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && sourceContainsTestIdLiteral(child)) found = true;
  });
  return found;
}

const sourceHasTestIdCandidate = sourceContainsTestIdLiteral(source);

function unwrap(node) {
  while (
    ts.isAsExpression(node)
    || ts.isSatisfiesExpression(node)
    || ts.isParenthesizedExpression(node)
  ) node = node.expression;
  return node;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function valueContainsTestId(value, seen = new Set()) {
  if (typeof value === "string") return /ZDTEST-\d{4}/.test(value);
  if (value === null || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).some((item) => valueContainsTestId(item, seen));
}

function valueContainsUnknown(value, seen = new Set()) {
  if (value === unknown) return true;
  if (value === null || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).some((item) => valueContainsUnknown(item, seen));
}

function scopeContainsTestId(scope) {
  return [...scope.values()].some((value) => valueContainsTestId(value));
}

function syntaxContainsTestId(node, scope) {
  node = unwrap(node);
  if (ts.isFunctionLike(node)) return false;
  if (ts.isStringLiteral(node) || ts.isTemplateLiteralToken(node)) {
    return /ZDTEST-\d{4}/.test(node.text);
  }
  if (ts.isIdentifier(node) && valueContainsTestId(scope.get(node.text))) return true;
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && syntaxContainsTestId(child, scope)) found = true;
  });
  return found;
}

function rejectUnsupported(node) {
  const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
  throw new Error(
    `Unsupported ZDTEST registration syntax in ${sourcePath}:${line + 1}:${character + 1}`,
  );
}

function evaluate(node, scope) {
  node = unwrap(node);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isIdentifier(node)) return scope.get(node.text) ?? unknown;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => evaluate(element, scope));
  if (ts.isObjectLiteralExpression(node)) {
    const result = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) return unknown;
      const name = propertyName(property.name);
      if (name === undefined) return unknown;
      result[name] = evaluate(property.initializer, scope);
    }
    return result;
  }
  if (ts.isPropertyAccessExpression(node)) {
    const owner = evaluate(node.expression, scope);
    return owner !== unknown && owner !== null && typeof owner === "object"
      ? owner[node.name.text] ?? unknown
      : unknown;
  }
  if (ts.isElementAccessExpression(node) && node.argumentExpression !== undefined) {
    const owner = evaluate(node.expression, scope);
    const key = evaluate(node.argumentExpression, scope);
    return owner !== unknown && owner !== null && typeof owner === "object" && key !== unknown
      ? owner[key] ?? unknown
      : unknown;
  }
  if (ts.isConditionalExpression(node)) {
    const condition = evaluate(node.condition, scope);
    return condition === true
      ? evaluate(node.whenTrue, scope)
      : condition === false
        ? evaluate(node.whenFalse, scope)
        : unknown;
  }
  if (ts.isTemplateExpression(node)) {
    let value = node.head.text;
    for (const span of node.templateSpans) {
      const expression = evaluate(span.expression, scope);
      if (!["string", "number", "boolean"].includes(typeof expression)) return unknown;
      value += String(expression) + span.literal.text;
    }
    return value;
  }
  return unknown;
}

function bind(name, value, scope) {
  if (ts.isIdentifier(name)) {
    scope.set(name.text, value);
    return;
  }
  if (ts.isArrayBindingPattern(name)) {
    for (const [index, element] of name.elements.entries()) {
      if (ts.isBindingElement(element)) bind(element.name, Array.isArray(value) ? value[index] : unknown, scope);
    }
    return;
  }
}

function isAssignment(expression) {
  return ts.isBinaryExpression(expression)
    && expression.operatorToken.kind >= ts.SyntaxKind.FirstAssignment
    && expression.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
}

function isNodeTestHookCall(expression, scope) {
  return ts.isCallExpression(expression)
    && ts.isPropertyAccessExpression(expression.expression)
    && ["before", "after", "beforeEach", "afterEach"].includes(expression.expression.name.text)
    && evaluate(expression.expression.expression, scope) === nodeTestFunction;
}

function isAllowedRegistrationHelperCall(expression, scope) {
  expression = unwrap(expression);
  return ts.isCallExpression(expression)
    && ts.isIdentifier(expression.expression)
    && evaluate(expression.expression, scope) === skipReasonFunction
    && expression.arguments.every((argument) => {
      const value = evaluate(argument, scope);
      return !valueContainsUnknown(value);
    });
}

function visitStatements(statements, parentScope) {
  const scope = new Map(parentScope);
  shadowRuntimeTestDeclarations(statements, scope);
  for (const statement of statements) {
    if (ts.isVariableStatement(statement)) {
      const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
      for (const declaration of statement.declarationList.declarations) {
        const value = declaration.initializer === undefined
          ? unknown
          : evaluate(declaration.initializer, scope);
        if (
          (!isConst || valueContainsUnknown(value))
          && declaration.initializer !== undefined
          && (
            syntaxContainsTestId(declaration.initializer, scope)
            || (
              scopeContainsTestId(scope)
              && !isAllowedRegistrationHelperCall(declaration.initializer, scope)
              && !ts.isFunctionLike(unwrap(declaration.initializer))
            )
          )
        ) rejectUnsupported(declaration);
        bind(declaration.name, isConst ? value : unknown, scope);
      }
      continue;
    }
    if (ts.isForOfStatement(statement)) {
      const values = evaluate(statement.expression, scope);
      const supported = Array.isArray(values)
        && ts.isVariableDeclarationList(statement.initializer)
        && (statement.initializer.flags & ts.NodeFlags.Const) !== 0;
      if (!supported) {
        if (scopeContainsTestId(scope) || syntaxContainsTestId(statement, scope)) {
          rejectUnsupported(statement);
        }
        continue;
      }
      const declaration = statement.initializer.declarations[0];
      if (declaration === undefined) continue;
      for (const value of values) {
        const iterationScope = new Map(scope);
        bind(declaration.name, value, iterationScope);
        visitStatement(statement.statement, iterationScope);
      }
      continue;
    }
    visitStatement(statement, scope);
  }
}

function bindingNames(name, result) {
  if (ts.isIdentifier(name)) {
    result.add(name.text);
    return;
  }
  if (ts.isArrayBindingPattern(name) || ts.isObjectBindingPattern(name)) {
    for (const element of name.elements) {
      if (ts.isBindingElement(element)) bindingNames(element.name, result);
    }
  }
}

function shadowRuntimeTestDeclarations(statements, scope) {
  const names = new Set();
  for (const statement of statements) {
    if (
      (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement))
      && statement.name !== undefined
    ) names.add(statement.name.text);
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        bindingNames(declaration.name, names);
      }
    }
  }
  for (const name of names) {
    if (scope.get(name) === nodeTestFunction) scope.set(name, unknown);
  }
}

function visitStatement(statement, scope) {
  if (ts.isBlock(statement)) {
    visitStatements(statement.statements, scope);
    return;
  }
  if (!ts.isExpressionStatement(statement)) {
    if (scopeContainsTestId(scope) || syntaxContainsTestId(statement, scope)) {
      rejectUnsupported(statement);
    }
    return;
  }
  const expression = unwrap(statement.expression);
  if (isAssignment(expression)) {
    if (scopeContainsTestId(scope) || syntaxContainsTestId(expression, scope)) {
      rejectUnsupported(expression);
    }
    return;
  }
  if (isNodeTestHookCall(expression, scope)) {
    const callback = expression.arguments[0];
    if (
      expression.arguments.length !== 1
      || callback === undefined
      || (!ts.isArrowFunction(callback) && !ts.isFunctionExpression(callback))
    ) {
      if (sourceHasTestIdCandidate) rejectUnsupported(expression);
    }
    return;
  }
  if (
    ts.isCallExpression(expression)
    && ts.isIdentifier(expression.expression)
    && evaluate(expression.expression, scope) === nodeTestFunction
  ) {
    const title = expression.arguments[0];
    const value = title === undefined ? unknown : evaluate(title, scope);
    if (typeof value === "string") titles.push(value);
    else if (
      sourceHasTestIdCandidate
      || (title !== undefined && syntaxContainsTestId(title, scope))
    ) rejectUnsupported(title ?? expression);
    return;
  }
  if (scopeContainsTestId(scope) || syntaxContainsTestId(expression, scope)) {
    rejectUnsupported(expression);
  }
}

function runtimeImports() {
  const imports = new Map();
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement)
      || !ts.isStringLiteral(statement.moduleSpecifier)
      || statement.importClause === undefined
      || statement.importClause.isTypeOnly
    ) continue;
    const moduleName = statement.moduleSpecifier.text;
    if (moduleName === "node:test" && statement.importClause.name !== undefined) {
      imports.set(statement.importClause.name.text, nodeTestFunction);
    }
    const bindings = statement.importClause.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) {
        if (element.isTypeOnly) continue;
        const importedName = element.propertyName?.text ?? element.name.text;
        if (moduleName === "node:test" && (importedName === "test" || importedName === "it")) {
          imports.set(element.name.text, nodeTestFunction);
        }
        if (
          moduleName === "./support/persistent-harness.js"
          && importedName === "browserCaseSkipReason"
        ) imports.set(element.name.text, skipReasonFunction);
      }
    }
  }
  return imports;
}

visitStatements(source.statements, runtimeImports());
process.stdout.write(`${JSON.stringify(titles.sort())}\n`);
