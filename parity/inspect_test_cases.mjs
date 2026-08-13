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

function visit(node) {
  if (
    ts.isCallExpression(node)
    && ts.isIdentifier(node.expression)
    && (node.expression.text === "test" || node.expression.text === "it")
  ) {
    const title = node.arguments[0];
    if (title !== undefined && (ts.isStringLiteral(title) || ts.isNoSubstitutionTemplateLiteral(title))) {
      titles.push(title.text);
    }
  }
  ts.forEachChild(node, visit);
}

visit(source);
process.stdout.write(`${JSON.stringify(titles.sort())}\n`);
