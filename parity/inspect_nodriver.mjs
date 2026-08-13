#!/usr/bin/env node
/** Inspect the current built jsdriver runtime and parse its declarations. */

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const parityDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(parityDirectory, "..");
const api = await import(resolve(root, "packages/api/dist/index.js"));
const declarationFiles = [
  ...[
    "browser.d.ts",
    "config.d.ts",
    "cookies.d.ts",
    "download.d.ts",
    "element.d.ts",
    "http-api.d.ts",
    "input.d.ts",
    "network.d.ts",
    "provider.d.ts",
    "tab.d.ts",
    "trace.d.ts",
  ].map((file) => `packages/api/dist/${file}`),
  "packages/runtime-js/dist/connection.d.ts",
];

function normalizedText(node, sourceFile) {
  return node.getText(sourceFile).replace(/\s+/g, " ").trim();
}

function modifiers(node) {
  return new Set((node.modifiers ?? []).map((modifier) => modifier.kind));
}

function isExported(node) {
  return modifiers(node).has(ts.SyntaxKind.ExportKeyword);
}

function isPrivateMember(node) {
  return (
    modifiers(node).has(ts.SyntaxKind.PrivateKeyword) ||
    (node.name && ts.isPrivateIdentifier(node.name))
  );
}

function nodeName(node, sourceFile) {
  if (!node.name) return null;
  return normalizedText(node.name, sourceFile);
}

function parameterData(parameter, sourceFile) {
  return {
    name: normalizedText(parameter.name, sourceFile),
    type: parameter.type ? normalizedText(parameter.type, sourceFile) : null,
    optional: Boolean(parameter.questionToken),
    rest: Boolean(parameter.dotDotDotToken),
    hasDeclaredDefault: Boolean(parameter.initializer),
    declaredDefault: parameter.initializer
      ? normalizedText(parameter.initializer, sourceFile)
      : null,
  };
}

function callableSignature(node, sourceFile) {
  return {
    typeParameters: (node.typeParameters ?? []).map((parameter) =>
      normalizedText(parameter, sourceFile),
    ),
    parameters: (node.parameters ?? []).map((parameter) =>
      parameterData(parameter, sourceFile),
    ),
    returnType: node.type ? normalizedText(node.type, sourceFile) : null,
    declaration: normalizedText(node, sourceFile),
  };
}

function classMemberData(member, sourceFile) {
  if (ts.isConstructorDeclaration(member)) {
    return { name: "constructor", kind: "constructor", ...callableSignature(member, sourceFile) };
  }
  const name = nodeName(member, sourceFile);
  if (!name) return null;
  if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
    return {
      name,
      kind: "method",
      static: modifiers(member).has(ts.SyntaxKind.StaticKeyword),
      ...callableSignature(member, sourceFile),
    };
  }
  if (ts.isGetAccessorDeclaration(member)) {
    return { name, kind: "property", access: "get", ...callableSignature(member, sourceFile) };
  }
  if (ts.isSetAccessorDeclaration(member)) {
    return { name, kind: "property", access: "set", ...callableSignature(member, sourceFile) };
  }
  if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
    return {
      name,
      kind: "property",
      type: member.type ? normalizedText(member.type, sourceFile) : null,
      optional: Boolean(member.questionToken),
      readonly: modifiers(member).has(ts.SyntaxKind.ReadonlyKeyword),
      hasDeclaredDefault: Boolean(member.initializer),
      declaredDefault: member.initializer
        ? normalizedText(member.initializer, sourceFile)
        : null,
      declaration: normalizedText(member, sourceFile),
    };
  }
  return null;
}

const declaredSymbols = {};
const declaredClasses = {};
const declaredSupportingClasses = {};
const declarationPaths = [];

function addSymbol(name, kind, relativePath, declaration) {
  if (!declaredSymbols[name]) {
    declaredSymbols[name] = { kind, file: relativePath, declarations: [] };
  }
  declaredSymbols[name].declarations.push(declaration);
}

for (const relativePath of declarationFiles) {
  const text = await readFile(resolve(root, relativePath), "utf8");
  const sourceFile = ts.createSourceFile(
    relativePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (sourceFile.parseDiagnostics.length > 0) {
    throw new Error(
      `TypeScript declaration parse failed for ${relativePath}: ${sourceFile.parseDiagnostics
        .map((diagnostic) => diagnostic.messageText)
        .join("; ")}`,
    );
  }
  declarationPaths.push(relativePath);

  for (const statement of sourceFile.statements) {
    if (!isExported(statement)) continue;
    if (!relativePath.startsWith("packages/api/")) {
      if (ts.isInterfaceDeclaration(statement) && statement.name.text === "RuntimeBackend") {
        const members = statement.members
          .map((member) => classMemberData(member, sourceFile))
          .filter(Boolean);
        declaredSupportingClasses[statement.name.text] = { file: relativePath, members, nonPublicMembers: [] };
      }
      continue;
    }
    if (ts.isClassDeclaration(statement) && statement.name) {
      const name = statement.name.text;
      const members = statement.members
        .filter((member) => !isPrivateMember(member))
        .map((member) => classMemberData(member, sourceFile))
        .filter(Boolean);
      const nonPublicMembers = statement.members
        .filter((member) => isPrivateMember(member))
        .map((member) => classMemberData(member, sourceFile))
        .filter(Boolean);
      declaredClasses[name] = { file: relativePath, members, nonPublicMembers };
      addSymbol(name, "class", relativePath, normalizedText(statement, sourceFile));
    } else if (ts.isInterfaceDeclaration(statement)) {
      addSymbol(statement.name.text, "interface", relativePath, normalizedText(statement, sourceFile));
    } else if (ts.isTypeAliasDeclaration(statement)) {
      addSymbol(statement.name.text, "type", relativePath, normalizedText(statement, sourceFile));
    } else if (ts.isEnumDeclaration(statement)) {
      addSymbol(statement.name.text, "enum", relativePath, normalizedText(statement, sourceFile));
    } else if (ts.isFunctionDeclaration(statement) && statement.name) {
      addSymbol(
        statement.name.text,
        "function",
        relativePath,
        callableSignature(statement, sourceFile),
      );
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        const name = nodeName(declaration, sourceFile);
        if (name) {
          addSymbol(name, "const", relativePath, {
            type: declaration.type ? normalizedText(declaration.type, sourceFile) : null,
            hasDeclaredDefault: Boolean(declaration.initializer),
            declaredDefault: declaration.initializer
              ? normalizedText(declaration.initializer, sourceFile)
              : null,
            declaration: normalizedText(declaration, sourceFile),
          });
        }
      }
    }
  }
}

const runtimeExports = Object.keys(api)
  .sort()
  .map((name) => {
    const value = api[name];
    const prototypeMembers =
      typeof value === "function" && value.prototype
        ? Object.getOwnPropertyNames(value.prototype)
            .filter((member) => member !== "constructor")
            .sort()
            .map((member) => {
              const descriptor = Object.getOwnPropertyDescriptor(value.prototype, member);
              return {
                name: member,
                kind: descriptor?.get ? "property" : "method",
              };
            })
        : [];
    return {
      name,
      kind: typeof value === "function" ? "function-or-class" : typeof value,
      functionLength: typeof value === "function" ? value.length : null,
      prototypeMembers,
    };
  });

process.stdout.write(
  `${JSON.stringify(
    {
      package: "jsdriver",
      declarationParser: `typescript-${ts.version}`,
      runtimeExports,
      declaredSymbols,
      declaredClasses,
      declaredSupportingClasses,
      declarationFiles: declarationPaths,
    },
    null,
    2,
  )}\n`,
);
