import fs from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";

const helperMode = process.argv[2] === "--transport-helper";
const sourcePath = helperMode ? process.argv[3] : process.argv[2];
if (sourcePath === undefined) throw new Error("Expected a TypeScript test file path");

const sourceText = fs.readFileSync(sourcePath, "utf8");
const source = ts.createSourceFile(
  sourcePath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const registrations = [];
const unknown = Symbol("unknown");
const nodeTestFunction = Symbol("node:test function");
const skipReasonFunction = Symbol("browser case skip helper");
const transportMatrixFunction = Symbol("transport matrix helper");
const transportNotApplicableFunction = Symbol("transport not-applicable helper");
const jsonBuiltin = Symbol("JSON builtin");
const stringBuiltin = Symbol("String builtin");
const undefinedBuiltin = Symbol("undefined builtin");
const staticImportBindings = new Set();
const phaseSkipMarker = Symbol("phase skip");
const evidencePattern = /(?:ZDTEST-\d{4}|ZDAPI-[A-Z0-9][A-Z0-9-]*)/;

function phaseSkip(headless) {
  return { [phaseSkipMarker]: true, phase: headless ? "headless0" : "headless1" };
}

function directCall(statement) {
  if (!ts.isExpressionStatement(statement)) return undefined;
  let expression = unwrap(statement.expression);
  const awaited = ts.isAwaitExpression(expression);
  if (awaited) expression = unwrap(expression.expression);
  return ts.isCallExpression(expression) ? { call: expression, awaited } : undefined;
}

function bindingNameTexts(name, result) {
  if (ts.isIdentifier(name)) {
    result.add(name.text);
    return;
  }
  if (ts.isArrayBindingPattern(name) || ts.isObjectBindingPattern(name)) {
    for (const element of name.elements) {
      if (ts.isBindingElement(element)) bindingNameTexts(element.name, result);
    }
  }
}

function callbackShadowsTransportBinding(callback, scope) {
  const protectedNames = new Set(
    [...scope.entries()]
      .filter(([, value]) => value === transportMatrixFunction || value === transportNotApplicableFunction)
      .map(([name]) => name),
  );
  let shadowed = false;
  function visit(node) {
    if (shadowed) return;
    const names = new Set();
    if (ts.isParameter(node) || ts.isVariableDeclaration(node) || ts.isBindingElement(node)) {
      bindingNameTexts(node.name, names);
    } else if (
      (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node))
      && node.name !== undefined
    ) names.add(node.name.text);
    if ([...names].some((name) => protectedNames.has(name))) {
      shadowed = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(callback, visit);
  return shadowed;
}

function transportDeclaration(expression, scope, title) {
  const caseId = title.match(/^ZDTEST-\d{4}/)?.[0];
  if (caseId === undefined) return undefined;
  const callback = [...expression.arguments].reverse().find((argument) => {
    const candidate = unwrap(argument);
    return ts.isArrowFunction(candidate) || ts.isFunctionExpression(candidate);
  });
  if (callback === undefined) return undefined;
  const body = unwrap(callback).body;
  if (!ts.isBlock(body)) return undefined;
  if (callbackShadowsTransportBinding(callback, scope)) rejectUnsupported(callback);

  const markers = [];
  for (const statement of body.statements) {
    const direct = directCall(statement);
    if (direct === undefined || !ts.isIdentifier(direct.call.expression)) continue;
    const { call, awaited } = direct;
    const binding = evaluate(call.expression, scope);
    if (binding !== transportMatrixFunction && binding !== transportNotApplicableFunction) continue;
    if (evaluate(call.arguments[0], scope) !== caseId) rejectUnsupported(call);
    if (binding === transportMatrixFunction) {
      if (!awaited) rejectUnsupported(call);
      if (call.arguments.length !== 3) rejectUnsupported(call);
      const options = unwrap(call.arguments[1]);
      if (!ts.isObjectLiteralExpression(options)) rejectUnsupported(call.arguments[1]);
      const optionNames = options.properties.map((property) => {
        if (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) {
          return propertyName(property.name);
        }
        return undefined;
      });
      if (
        optionNames.includes(undefined)
        || optionNames.length !== 2
        || !optionNames.includes("executable")
        || !optionNames.includes("headless")
      ) rejectUnsupported(options);
      const action = unwrap(call.arguments[2]);
      if (!ts.isArrowFunction(action) && !ts.isFunctionExpression(action)) {
        rejectUnsupported(call.arguments[2]);
      }
      const normalizedCallback = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
        removeComments: true,
      }).printNode(ts.EmitHint.Unspecified, callback, source);
      markers.push({
        applicability: "applicable",
        callbackFingerprint: createHash("sha256")
          .update(normalizedCallback)
          .digest("hex"),
      });
      continue;
    }
    if (call.arguments.length !== 2) rejectUnsupported(call);
    const caseArgument = unwrap(call.arguments[0]);
    const reasonArgument = unwrap(call.arguments[1]);
    const reason = evaluate(reasonArgument, scope);
    if (
      !ts.isStringLiteral(caseArgument)
      || caseArgument.text !== caseId
      || !ts.isObjectLiteralExpression(reasonArgument)
      || reasonArgument.properties.some((property) => (
        !ts.isPropertyAssignment(property)
        || !ts.isStringLiteral(unwrap(property.initializer))
      ))
      ||
      reason === null
      || typeof reason !== "object"
      || Array.isArray(reason)
      || Object.keys(reason).sort().join(",") !== "code,detail"
      || typeof reason.code !== "string"
      || reason.code.length === 0
      || typeof reason.detail !== "string"
      || reason.detail.length === 0
    ) rejectUnsupported(call.arguments[1]);
    markers.push({ applicability: "not-applicable", reason });
  }
  if (markers.length > 1) rejectUnsupported(callback);
  return markers[0];
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
      || scope.get(name) === transportMatrixFunction
      || scope.get(name) === transportNotApplicableFunction
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
      if (options.eligible) registrations.push({
        title: value,
        phase: options.phase,
        ...(nodeTestId(value) === undefined
          ? {}
          : { transport: transportDeclaration(expression, scope, value) ?? null }),
      });
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
        if (moduleName === "./support/transport-matrix.js") {
          if (importedName === "runTransportMatrix") {
            imports.set(element.name.text, transportMatrixFunction);
          }
          if (importedName === "transportNotApplicable") {
            imports.set(element.name.text, transportNotApplicableFunction);
          }
        }
      }
    }
    if (
      bindings !== undefined
      && ts.isNamespaceImport(bindings)
    ) imports.set(bindings.name.text, staticImportBinding(bindings.name.text));
  }
  return imports;
}

function nodeTestId(title) {
  return title.match(/^ZDTEST-\d{4}(?:\s|$)/)?.[0]?.trim();
}

function transportHelperSpec() {
  const importSources = new Map();
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement)
      || !ts.isStringLiteral(statement.moduleSpecifier)
      || statement.importClause?.namedBindings === undefined
      || !ts.isNamedImports(statement.importClause.namedBindings)
    ) continue;
    for (const element of statement.importClause.namedBindings.elements) {
      importSources.set(element.name.text, {
        imported: element.propertyName?.text ?? element.name.text,
        source: statement.moduleSpecifier.text,
      });
    }
  }

  let quadrantArray;
  let matrixFunction;
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name)
          && declaration.name.text === "TRANSPORT_QUADRANTS"
          && declaration.initializer !== undefined
        ) {
          const initializer = unwrap(declaration.initializer);
          if (ts.isArrayLiteralExpression(initializer)) quadrantArray = initializer;
        }
      }
    }
    if (
      ts.isFunctionDeclaration(statement)
      && statement.name?.text === "runTransportMatrix"
    ) matrixFunction = statement;
  }
  if (quadrantArray === undefined) throw new Error(`${sourcePath} must declare TRANSPORT_QUADRANTS as an array literal`);
  if (matrixFunction?.body === undefined) throw new Error(`${sourcePath} must declare runTransportMatrix`);

  const quadrants = quadrantArray.elements.map((element) => {
    const value = unwrap(element);
    if (!ts.isObjectLiteralExpression(value)) throw new Error("Transport quadrants must be object literals");
    const properties = new Map();
    for (const property of value.properties) {
      if (!ts.isPropertyAssignment(property)) throw new Error("Transport quadrant fields must be explicit assignments");
      const name = propertyName(property.name);
      if (name === undefined || properties.has(name)) throw new Error("Transport quadrant fields must be unique named properties");
      properties.set(name, unwrap(property.initializer));
    }
    if ([...properties.keys()].sort().join(",") !== "backend,backendFactory,connectionMode") {
      throw new Error("Transport quadrants must explicitly declare backend, backendFactory, and connectionMode");
    }
    const backend = properties.get("backend");
    const connectionMode = properties.get("connectionMode");
    const backendFactory = properties.get("backendFactory");
    if (!ts.isStringLiteral(backend) || !ts.isStringLiteral(connectionMode) || !ts.isIdentifier(backendFactory)) {
      throw new Error("Transport quadrant fields must be static and explicit");
    }
    const factoryImport = importSources.get(backendFactory.text);
    if (factoryImport === undefined) throw new Error("Transport backend factories must be imported");
    return {
      backend: backend.text,
      connectionMode: connectionMode.text,
      backendFactory: `${factoryImport.source}#${factoryImport.imported}`,
    };
  });

  const browserImport = [...importSources.entries()].find(([, value]) => (
    value.source === "../../src/index.js" && value.imported === "Browser"
  ))?.[0];
  if (browserImport === undefined) throw new Error("Transport matrix helper must import Browser");
  const startCalls = [];
  function collectStartCalls(node) {
    if (
      ts.isCallExpression(node)
      && ts.isPropertyAccessExpression(node.expression)
      && ts.isIdentifier(node.expression.expression)
      && node.expression.expression.text === browserImport
      && node.expression.name.text === "start"
    ) startCalls.push(node);
    ts.forEachChild(node, collectStartCalls);
  }
  collectStartCalls(matrixFunction.body);
  if (startCalls.length !== 1) throw new Error("Transport matrix helper must call Browser.start exactly once");
  const startOptions = startCalls[0].arguments[0] === undefined ? undefined : unwrap(startCalls[0].arguments[0]);
  if (!ts.isObjectLiteralExpression(startOptions)) throw new Error("Transport matrix Browser.start options must be explicit");
  const startProperties = new Map();
  for (const property of startOptions.properties) {
    if (ts.isPropertyAssignment(property)) {
      const name = propertyName(property.name);
      if (name !== undefined) startProperties.set(name, unwrap(property.initializer));
    } else if (ts.isShorthandPropertyAssignment(property)) {
      startProperties.set(property.name.text, property.name);
    }
  }
  const explicitFromQuadrant = (name, field) => {
    const value = startProperties.get(name);
    return ts.isPropertyAccessExpression(value)
      && ts.isIdentifier(value.expression)
      && value.expression.text === "quadrant"
      && value.name.text === field;
  };
  return {
    quadrants,
    moduleFingerprint: createHash("sha256")
      .update(sourceText)
      .digest("hex"),
    bodyFingerprint: createHash("sha256")
      .update(matrixFunction.body.getText(source))
      .digest("hex"),
    explicitBrowserStart: {
      backend: explicitFromQuadrant("backend", "backendFactory"),
      connectionMode: explicitFromQuadrant("connectionMode", "connectionMode"),
    },
  };
}

if (helperMode) {
  process.stdout.write(`${JSON.stringify(transportHelperSpec())}\n`);
} else {
  visitStatements(source.statements, runtimeImports());
  registrations.sort((left, right) => left.title.localeCompare(right.title));
  const output = process.argv[3] === "--details"
    ? registrations
    : registrations.map((registration) => registration.title);
  process.stdout.write(`${JSON.stringify(output)}\n`);
}
