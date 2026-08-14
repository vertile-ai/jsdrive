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
const registrations = [];
const unknown = Symbol("unknown");
const nodeTestFunction = Symbol("node:test function");
const skipReasonFunction = Symbol("browser case skip helper");
const jsonBuiltin = Symbol("JSON builtin");
const stringBuiltin = Symbol("String builtin");
const undefinedBuiltin = Symbol("undefined builtin");
const staticImportBindings = new Set();
const phaseSkipMarker = Symbol("phase skip");
const evidencePattern = /(?:ZDTEST-\d{4}|ZDAPI-[A-Z0-9][A-Z0-9-]*)/;

function phaseSkip(headless) {
  return { [phaseSkipMarker]: true, phase: headless ? "headless0" : "headless1" };
}

function isPhaseSkip(value) {
  return value !== null
    && typeof value === "object"
    && value[phaseSkipMarker] === true
    && (value.phase === "headless0" || value.phase === "headless1");
}

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

function valueContainsEvidence(value, seen = new Set()) {
  if (typeof value === "string") return evidencePattern.test(value);
  if (value === null || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).some((item) => valueContainsEvidence(item, seen));
}

function valueContainsUnknown(value, seen = new Set()) {
  if (value === unknown) return true;
  if (value === null || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).some((item) => valueContainsUnknown(item, seen));
}

function isFullyStaticValue(value, seen = new Set()) {
  if (value === undefinedBuiltin) return true;
  if (value === unknown || typeof value === "symbol" || typeof value === "undefined") return false;
  if (value === null || ["string", "number", "boolean"].includes(typeof value)) return true;
  if (isPhaseSkip(value)) return true;
  if (typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).every((item) => isFullyStaticValue(item, seen));
}

function isFullyStaticIterableValue(value, seen = new Set()) {
  if (value === undefinedBuiltin || staticImportBindings.has(value)) return true;
  if (value === unknown || typeof value === "undefined") return false;
  if (value === null || ["string", "number", "boolean"].includes(typeof value)) return true;
  if (isPhaseSkip(value)) return true;
  if (typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).every((item) => isFullyStaticIterableValue(item, seen));
}

function staticImportBinding(name) {
  const binding = Symbol(`static import ${name}`);
  staticImportBindings.add(binding);
  return binding;
}

function scopeContainsEvidence(scope) {
  return [...scope.values()].some((value) => valueContainsEvidence(value));
}

function syntaxContainsEvidence(node, scope) {
  node = unwrap(node);
  if (ts.isFunctionLike(node)) return false;
  if (ts.isStringLiteral(node) || ts.isTemplateLiteralToken(node)) {
    return evidencePattern.test(node.text);
  }
  if (ts.isIdentifier(node) && valueContainsEvidence(scope.get(node.text))) return true;
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && syntaxContainsEvidence(child, scope)) found = true;
  });
  return found;
}

function syntaxContainsRuntimeCall(node) {
  node = unwrap(node);
  if (ts.isFunctionLike(node)) return false;
  if (
    ts.isCallExpression(node)
    || ts.isNewExpression(node)
    || ts.isTaggedTemplateExpression(node)
  ) return true;
  let found = false;
  ts.forEachChild(node, (child) => {
    if (!found && syntaxContainsRuntimeCall(child)) found = true;
  });
  return found;
}

function rejectUnsupported(node) {
  const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
  throw new Error(
    `Unsupported evidence registration syntax in ${sourcePath}:${line + 1}:${character + 1}`,
  );
}

function evaluate(node, scope) {
  node = unwrap(node);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isIdentifier(node)) return scope.get(node.text) ?? unknown;
  if (
    ts.isCallExpression(node)
    && ts.isIdentifier(node.expression)
    && evaluate(node.expression, scope) === skipReasonFunction
  ) {
    if (node.arguments.length !== 1) return unknown;
    const headless = evaluate(node.arguments[0], scope);
    return typeof headless === "boolean" ? phaseSkip(headless) : unknown;
  }
  if (
    ts.isCallExpression(node)
    && ts.isPropertyAccessExpression(node.expression)
    && evaluate(node.expression.expression, scope) === jsonBuiltin
    && node.expression.name.text === "stringify"
    && node.arguments.length === 1
  ) {
    const value = evaluate(node.arguments[0], scope);
    return isFullyStaticValue(value) ? JSON.stringify(value) : unknown;
  }
  if (
    ts.isTaggedTemplateExpression(node)
    && ts.isPropertyAccessExpression(node.tag)
    && evaluate(node.tag.expression, scope) === stringBuiltin
    && node.tag.name.text === "raw"
    && ts.isNoSubstitutionTemplateLiteral(node.template)
  ) return node.template.rawText ?? node.template.text;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => evaluate(element, scope));
  if (ts.isObjectLiteralExpression(node)) {
    const result = Object.create(null);
    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = propertyName(property.name);
        if (name === undefined) return unknown;
        result[name] = evaluate(property.initializer, scope);
        continue;
      }
      if (
        ts.isShorthandPropertyAssignment(property)
        && property.objectAssignmentInitializer === undefined
      ) {
        result[property.name.text] = evaluate(property.name, scope);
        continue;
      }
      return unknown;
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

function isPotentialEvidenceRegistration(statement, scope) {
  if (!ts.isExpressionStatement(statement)) return false;
  const expression = unwrap(statement.expression);
  if (
    !ts.isCallExpression(expression)
    || !ts.isIdentifier(expression.expression)
    || evaluate(expression.expression, scope) !== nodeTestFunction
  ) return false;
  const title = expression.arguments[0];
  if (title === undefined) return true;
  const value = evaluate(title, scope);
  return typeof value !== "string" || evidencePattern.test(value);
}

function eligibleTestOptions(expression, scope, title) {
  const options = expression.arguments[1];
  if (options === undefined || ts.isFunctionLike(unwrap(options))) {
    return { eligible: true, phase: null };
  }
  const value = evaluate(options, scope);
  if (
    value === null
    || typeof value !== "object"
    || Array.isArray(value)
    || !isFullyStaticValue(value)
  ) return { eligible: false, phase: null };

  const skip = value.skip;
  if (skip === true || typeof skip === "string") return { eligible: false, phase: null };
  if (skip !== undefined && skip !== false && !isPhaseSkip(skip)) {
    return { eligible: false, phase: null };
  }
  if (value.todo !== undefined && value.todo !== false) {
    return { eligible: false, phase: null };
  }

  const phase = isPhaseSkip(skip) ? skip.phase : null;
  const titlePhases = [...title.matchAll(/\[(headless[01])\]/g)].map((match) => match[1]);
  if (
    titlePhases.length > 0
    && (phase === null || titlePhases.length !== 1 || titlePhases[0] !== phase)
  ) return { eligible: false, phase: null };
  return { eligible: true, phase };
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

function evidenceStatementIndexes(statements, scope) {
  const previewScope = new Map(scope);
  let firstIndex = -1;
  let lastIndex = -1;
  for (const [index, statement] of statements.entries()) {
    if (
      syntaxContainsEvidence(statement, previewScope)
      || isPotentialEvidenceRegistration(statement, previewScope)
    ) {
      if (firstIndex === -1) firstIndex = index;
      lastIndex = index;
    }
    if (!ts.isVariableStatement(statement)) continue;
    const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
    for (const declaration of statement.declarationList.declarations) {
      const value = declaration.initializer === undefined
        ? unknown
        : evaluate(declaration.initializer, previewScope);
      bind(declaration.name, isConst ? value : unknown, previewScope);
    }
  }
  return { firstIndex, lastIndex };
}

function visitStatements(
  statements,
  parentScope,
  inheritedStrict = false,
  inheritedPostEvidence = false,
) {
  const scope = new Map(parentScope);
  shadowRuntimeTestDeclarations(statements, scope);
  const { firstIndex: firstEvidenceIndex, lastIndex: lastEvidenceIndex } =
    evidenceStatementIndexes(statements, scope);
  for (const [statementIndex, statement] of statements.entries()) {
    const strictRegistrationScope = inheritedStrict
      || statementIndex <= lastEvidenceIndex;
    const postEvidenceScope = inheritedPostEvidence
      || (
        !inheritedStrict
        && firstEvidenceIndex !== -1
        && statementIndex > lastEvidenceIndex
      );
    if (
      ts.isImportDeclaration(statement)
      || ts.isFunctionDeclaration(statement)
      || ts.isInterfaceDeclaration(statement)
      || ts.isTypeAliasDeclaration(statement)
    ) continue;
    if (ts.isVariableStatement(statement)) {
      const isConst = (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
      for (const declaration of statement.declarationList.declarations) {
        const value = declaration.initializer === undefined
          ? unknown
          : evaluate(declaration.initializer, scope);
        if (
          strictRegistrationScope
          && declaration.initializer !== undefined
          && !isFullyStaticValue(value)
        ) rejectUnsupported(declaration);
        if (
          postEvidenceScope
          && declaration.initializer !== undefined
          && !isFullyStaticValue(value)
          && syntaxContainsRuntimeCall(declaration.initializer)
        ) rejectUnsupported(declaration);
        if (
          (!isConst || valueContainsUnknown(value))
          && declaration.initializer !== undefined
          && (
            syntaxContainsEvidence(declaration.initializer, scope)
            || (
              scopeContainsEvidence(scope)
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
        && isFullyStaticIterableValue(values)
        && ts.isVariableDeclarationList(statement.initializer)
        && (statement.initializer.flags & ts.NodeFlags.Const) !== 0;
      if (!supported) {
        if (
          strictRegistrationScope
          || postEvidenceScope
          || scopeContainsEvidence(scope)
          || syntaxContainsEvidence(statement, scope)
        ) {
          rejectUnsupported(statement);
        }
        continue;
      }
      const declaration = statement.initializer.declarations[0];
      if (declaration === undefined) continue;
      for (const value of values) {
        const iterationScope = new Map(scope);
        bind(declaration.name, value, iterationScope);
        visitStatement(
          statement.statement,
          iterationScope,
          true,
          strictRegistrationScope
            || syntaxContainsEvidence(statement.statement, iterationScope),
          postEvidenceScope,
        );
      }
      continue;
    }
    visitStatement(
      statement,
      scope,
      false,
      strictRegistrationScope,
      postEvidenceScope,
    );
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
    if (
      scope.get(name) === nodeTestFunction
      || scope.get(name) === skipReasonFunction
      || scope.get(name) === jsonBuiltin
      || scope.get(name) === stringBuiltin
      || scope.get(name) === undefinedBuiltin
      || staticImportBindings.has(scope.get(name))
    ) scope.set(name, unknown);
  }
}

function visitStatement(
  statement,
  scope,
  allowRegistrationBlock = false,
  strictRegistrationScope = false,
  postEvidenceScope = false,
) {
  if (ts.isBlock(statement)) {
    if ((strictRegistrationScope || postEvidenceScope) && !allowRegistrationBlock) {
      rejectUnsupported(statement);
    }
    visitStatements(
      statement.statements,
      scope,
      strictRegistrationScope,
      postEvidenceScope,
    );
    return;
  }
  if (!ts.isExpressionStatement(statement)) {
    if (
      strictRegistrationScope
      || (postEvidenceScope && syntaxContainsRuntimeCall(statement))
      || scopeContainsEvidence(scope)
      || syntaxContainsEvidence(statement, scope)
    ) {
      rejectUnsupported(statement);
    }
    return;
  }
  const expression = unwrap(statement.expression);
  if (isAssignment(expression)) {
    if (
      strictRegistrationScope
      || postEvidenceScope
      || scopeContainsEvidence(scope)
      || syntaxContainsEvidence(expression, scope)
    ) {
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
      if (strictRegistrationScope || postEvidenceScope) rejectUnsupported(expression);
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
    if (typeof value === "string") {
      const options = eligibleTestOptions(expression, scope, value);
      if (options.eligible) registrations.push({ title: value, phase: options.phase });
    }
    else if (
      strictRegistrationScope
      || postEvidenceScope
      || (title !== undefined && syntaxContainsEvidence(title, scope))
    ) rejectUnsupported(title ?? expression);
    return;
  }
  if (
    strictRegistrationScope
    || postEvidenceScope
    || scopeContainsEvidence(scope)
    || syntaxContainsEvidence(expression, scope)
  ) {
    rejectUnsupported(expression);
  }
}

function runtimeImports() {
  const imports = new Map([
    ["JSON", jsonBuiltin],
    ["String", stringBuiltin],
    ["undefined", undefinedBuiltin],
  ]);
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement)
      || !ts.isStringLiteral(statement.moduleSpecifier)
      || statement.importClause === undefined
      || statement.importClause.isTypeOnly
    ) continue;
    const moduleName = statement.moduleSpecifier.text;
    const defaultImport = statement.importClause.name;
    if (defaultImport !== undefined) {
      if (moduleName === "node:test") imports.set(defaultImport.text, nodeTestFunction);
      else imports.set(defaultImport.text, staticImportBinding(defaultImport.text));
    }
    const bindings = statement.importClause.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) {
        if (element.isTypeOnly) continue;
        const importedName = element.propertyName?.text ?? element.name.text;
        imports.set(element.name.text, staticImportBinding(element.name.text));
        if (moduleName === "node:test" && (importedName === "test" || importedName === "it")) {
          imports.set(element.name.text, nodeTestFunction);
        }
        if (
          moduleName === "./support/persistent-harness.js"
          && importedName === "browserCaseSkipReason"
        ) imports.set(element.name.text, skipReasonFunction);
      }
    }
    if (
      bindings !== undefined
      && ts.isNamespaceImport(bindings)
    ) imports.set(bindings.name.text, staticImportBinding(bindings.name.text));
  }
  return imports;
}

visitStatements(source.statements, runtimeImports());
registrations.sort((left, right) => left.title.localeCompare(right.title));
const output = process.argv[3] === "--details"
  ? registrations
  : registrations.map((registration) => registration.title);
process.stdout.write(`${JSON.stringify(output)}\n`);
