import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface SchemaNode {
  readonly $ref?: string;
  readonly enum?: readonly string[];
  readonly items?: SchemaNode;
  readonly properties?: readonly SchemaProperty[];
  readonly type?: string;
}

interface SchemaProperty extends SchemaNode {
  readonly name: string;
  readonly optional?: boolean;
}

interface NamedType extends SchemaNode {
  readonly id: string;
}

interface Command {
  readonly name: string;
  readonly parameters?: readonly SchemaProperty[];
  readonly returns?: readonly SchemaProperty[];
  readonly experimental?: boolean;
  readonly deprecated?: boolean;
}

interface Event {
  readonly name: string;
  readonly parameters?: readonly SchemaProperty[];
  readonly experimental?: boolean;
  readonly deprecated?: boolean;
}

interface Domain {
  readonly domain: string;
  readonly types?: readonly NamedType[];
  readonly commands?: readonly Command[];
  readonly events?: readonly Event[];
}

interface ProtocolSchema {
  readonly version: {
    readonly major: string;
    readonly minor: string;
  };
  readonly domains: readonly Domain[];
}

interface ProtocolInput {
  readonly version: ProtocolSchema["version"];
  readonly domains: readonly Domain[];
}

const sourceVersion = "devtools-protocol@0.0.1677763";
const generatorDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(generatorDirectory, "../../..");
const schemaDirectory = resolve(repositoryRoot, "packages/protocol-schema");
const tsOutput = resolve(repositoryRoot, "packages/protocol/src/generated/protocol.ts");
const rustOutput = resolve(repositoryRoot, "crates/protocol/src/generated.rs");

function pascalCase(value: string): string {
  return value.length === 0 ? value : value[0]!.toUpperCase() + value.slice(1);
}

function snakeCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/-/g, "_")
    .toLowerCase();
}

const rustKeywords = new Set([
  "abstract", "as", "async", "await", "become", "box", "break", "const", "continue",
  "crate", "do", "dyn", "else", "enum", "extern", "false", "final", "fn", "for",
  "gen", "if", "impl", "in", "let", "loop", "macro", "match", "mod", "move", "mut",
  "override", "priv", "pub", "ref", "return", "self", "static", "struct", "super",
  "trait", "true", "try", "type", "typeof", "unsafe", "unsized", "use", "virtual",
  "where", "while", "yield",
]);

function rustFieldName(value: string): string {
  const name = snakeCase(value);
  return rustKeywords.has(name) ? `${name}_` : name;
}

function rustEnumVariants(values: readonly string[]): readonly { readonly name: string; readonly value: string }[] {
  const names = new Map<string, number>();
  return values.map((value) => {
    const words = value.split(/[^A-Za-z0-9]+/).filter((word) => word.length > 0);
    let base = words.map(pascalCase).join("");
    if (base.length === 0 || /^[0-9]/.test(base) || base === "Self") {
      base = `Value${base}`;
    }
    const occurrence = (names.get(base) ?? 0) + 1;
    names.set(base, occurrence);
    return { name: occurrence === 1 ? base : `${base}${occurrence}`, value };
  });
}

function renderTsType(node: SchemaNode, domainName: string): string {
  if (node.$ref !== undefined) {
    const separator = node.$ref.indexOf(".");
    return separator === -1
      ? node.$ref
      : `Protocol.${node.$ref.slice(0, separator)}.${node.$ref.slice(separator + 1)}`;
  }
  if (node.enum !== undefined) {
    return node.enum.map((value) => JSON.stringify(value)).join(" | ");
  }
  switch (node.type) {
    case "string":
      return "string";
    case "integer":
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return `ReadonlyArray<${renderTsType(required(node.items, `${domainName} array items`), domainName)}>`;
    case "object":
      return node.properties === undefined
        ? "Readonly<Record<string, unknown>>"
        : renderTsObject(node.properties, domainName);
    case "any":
      return "unknown";
    default:
      throw new Error(`Unsupported schema type ${String(node.type)} in ${domainName}`);
  }
}

function renderTsObject(properties: readonly SchemaProperty[], domainName: string): string {
  if (properties.length === 0) {
    return "Readonly<Record<string, never>>";
  }
  const fields = properties.map((property) => {
    const optional = property.optional === true ? "?" : "";
    return `readonly ${JSON.stringify(property.name)}${optional}: ${renderTsType(property, domainName)};`;
  });
  return `{ ${fields.join(" ")} }`;
}

function renderTsInterface(
  name: string,
  properties: readonly SchemaProperty[],
  domainName: string,
  indent: string,
): string {
  if (properties.length === 0) {
    return `${indent}export type ${name} = Readonly<Record<string, never>>;`;
  }
  const lines = properties.map((property) => {
    const optional = property.optional === true ? "?" : "";
    return `${indent}  readonly ${JSON.stringify(property.name)}${optional}: ${renderTsType(property, domainName)};`;
  });
  return [`${indent}export interface ${name} {`, ...lines, `${indent}}`].join("\n");
}

function renderTypeScript(input: ProtocolInput): string {
  const output: string[] = [
    `// Generated from ${sourceVersion}. Do not edit.`,
    "",
    "export namespace Protocol {",
  ];
  for (const domain of input.domains) {
    output.push(`  export namespace ${domain.domain} {`);
    for (const type of domain.types ?? []) {
      if (type.type === "object" && type.properties !== undefined) {
        output.push(renderTsInterface(type.id, type.properties, domain.domain, "    "));
      } else {
        output.push(`    export type ${type.id} = ${renderTsType(type, domain.domain)};`);
      }
    }
    output.push("    export namespace Commands {");
    for (const command of domain.commands ?? []) {
      const name = pascalCase(command.name);
      output.push(
        (command.parameters?.length ?? 0) === 0
          ? `      export type ${name}Params = undefined;`
          : renderTsInterface(`${name}Params`, command.parameters ?? [], domain.domain, "      "),
      );
      output.push(renderTsInterface(`${name}Result`, command.returns ?? [], domain.domain, "      "));
    }
    output.push("    }");
    output.push("    export namespace Events {");
    for (const event of domain.events ?? []) {
      output.push(renderTsInterface(`${pascalCase(event.name)}Event`, event.parameters ?? [], domain.domain, "      "));
    }
    output.push("    }");
    output.push("  }");
  }
  output.push("}", "", "export interface ProtocolCommandMap {");
  for (const domain of input.domains) {
    for (const command of domain.commands ?? []) {
      const name = pascalCase(command.name);
      output.push(
        `  readonly ${JSON.stringify(`${domain.domain}.${command.name}`)}: {`,
        `    readonly params: Protocol.${domain.domain}.Commands.${name}Params;`,
        `    readonly result: Protocol.${domain.domain}.Commands.${name}Result;`,
        "  };",
      );
    }
  }
  output.push("}", "", "export interface ProtocolEventMap {");
  for (const domain of input.domains) {
    for (const event of domain.events ?? []) {
      output.push(
        `  readonly ${JSON.stringify(`${domain.domain}.${event.name}`)}: Protocol.${domain.domain}.Events.${pascalCase(event.name)}Event;`,
      );
    }
  }
  output.push(
    "}",
    "",
    "export type ProtocolCommand = keyof ProtocolCommandMap;",
    "export type ProtocolEvent = keyof ProtocolEventMap;",
    "export type CommandParams<M extends ProtocolCommand> = ProtocolCommandMap[M][\"params\"];",
    "export type CommandResult<M extends ProtocolCommand> = ProtocolCommandMap[M][\"result\"];",
    "export type EventPayload<E extends ProtocolEvent> = ProtocolEventMap[E];",
    "",
    "export interface ProtocolCommandDescriptor<M extends ProtocolCommand = ProtocolCommand> {",
    "  readonly method: M;",
    "  readonly hasParams: boolean;",
    "  readonly hasResult: boolean;",
    "  readonly experimental: boolean;",
    "  readonly deprecated: boolean;",
    "}",
    "",
    "export const commandDescriptors = {",
  );
  for (const domain of input.domains) {
    for (const command of domain.commands ?? []) {
      const method = `${domain.domain}.${command.name}`;
      output.push(
        `  ${JSON.stringify(method)}: { method: ${JSON.stringify(method)}, hasParams: ${(command.parameters?.length ?? 0) > 0}, hasResult: ${(command.returns?.length ?? 0) > 0}, experimental: ${command.experimental === true}, deprecated: ${command.deprecated === true} },`,
      );
    }
  }
  const commandCount = input.domains.reduce((count, domain) => count + (domain.commands?.length ?? 0), 0);
  const eventCount = input.domains.reduce((count, domain) => count + (domain.events?.length ?? 0), 0);
  const typeCount = input.domains.reduce((count, domain) => count + (domain.types?.length ?? 0), 0);
  output.push(
    "} as const satisfies { readonly [M in ProtocolCommand]: ProtocolCommandDescriptor<M> };",
    "",
    "export const protocolMetadata = {",
    `  source: ${JSON.stringify(sourceVersion)},`,
    `  version: ${JSON.stringify(`${input.version.major}.${input.version.minor}`)},`,
    `  domainCount: ${input.domains.length},`,
    `  typeCount: ${typeCount},`,
    `  commandCount: ${commandCount},`,
    `  eventCount: ${eventCount},`,
    "} as const;",
    "",
  );
  return output.join("\n");
}

function required<T>(value: T | undefined, label: string): T {
  if (value === undefined) {
    throw new Error(`Missing ${label}`);
  }
  return value;
}

function buildTypeKinds(domains: readonly Domain[]): ReadonlyMap<string, string | undefined> {
  const kinds = new Map<string, string | undefined>();
  for (const domain of domains) {
    for (const type of domain.types ?? []) {
      kinds.set(`${domain.domain}.${type.id}`, type.type);
    }
  }
  return kinds;
}

function renderRustType(
  node: SchemaNode,
  domainName: string,
  typeKinds: ReadonlyMap<string, string | undefined>,
  inlineEnumType?: string,
): string {
  if (node.enum !== undefined) {
    return required(inlineEnumType, `${domainName} inline enum type`);
  }
  if (node.$ref !== undefined) {
    const qualified = node.$ref.includes(".") ? node.$ref : `${domainName}.${node.$ref}`;
    const [referenceDomain, referenceType] = qualified.split(".");
    const path = `crate::generated::${snakeCase(required(referenceDomain, "reference domain"))}::${required(referenceType, "reference type")}`;
    return typeKinds.get(qualified) === "object" ? `Box<${path}>` : path;
  }
  switch (node.type) {
    case "string":
      return "String";
    case "integer":
      return "i64";
    case "number":
      return "f64";
    case "boolean":
      return "bool";
    case "array":
      return `Vec<${renderRustType(required(node.items, `${domainName} array items`), domainName, typeKinds)}>`;
    case "object":
      return "std::collections::BTreeMap<String, crate::generated::JsonValue>";
    case "any":
      return "crate::generated::JsonValue";
    default:
      throw new Error(`Unsupported schema type ${String(node.type)} in ${domainName}`);
  }
}

function renderRustEnum(
  name: string,
  values: readonly string[],
  indent: string,
): string {
  const variants = rustEnumVariants(values);
  const output = [
    `${indent}// Protocol enum`,
    `${indent}#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]`,
    `${indent}pub enum ${name} {`,
    ...variants.map((variant) => `${indent}    ${variant.name},`),
    `${indent}}`,
    "",
    `${indent}impl ${name} {`,
    `${indent}    pub const fn as_str(self) -> &'static str {`,
    `${indent}        match self {`,
    ...variants.map((variant) => `${indent}            Self::${variant.name} => ${JSON.stringify(variant.value)},`),
    `${indent}        }`,
    `${indent}    }`,
    `${indent}}`,
    "",
    `${indent}impl AsRef<str> for ${name} {`,
    `${indent}    fn as_ref(&self) -> &str {`,
    `${indent}        self.as_str()`,
    `${indent}    }`,
    `${indent}}`,
    "",
    `${indent}impl TryFrom<&str> for ${name} {`,
    `${indent}    type Error = crate::generated::UnknownEnumValue;`,
    "",
    `${indent}    fn try_from(value: &str) -> Result<Self, crate::generated::UnknownEnumValue> {`,
    `${indent}        match value {`,
    ...variants.map((variant) => `${indent}            ${JSON.stringify(variant.value)} => Ok(Self::${variant.name}),`),
    `${indent}            _ => Err(crate::generated::UnknownEnumValue {`,
    `${indent}                enum_name: ${JSON.stringify(name)},`,
    `${indent}                value: value.to_owned(),`,
    `${indent}            }),`,
    `${indent}        }`,
    `${indent}    }`,
    `${indent}}`,
  ];
  return output.join("\n");
}

function renderRustStruct(
  name: string,
  properties: readonly SchemaProperty[],
  domainName: string,
  typeKinds: ReadonlyMap<string, string | undefined>,
  indent: string,
  inlineEnumType: (property: SchemaProperty) => string | undefined,
): string {
  if (properties.length === 0) {
    return `${indent}#[derive(Clone, Debug, PartialEq)]\n${indent}pub struct ${name};`;
  }
  const output = [
    `${indent}#[derive(Clone, Debug, PartialEq)]`,
    `${indent}pub struct ${name} {`,
  ];
  for (const property of properties) {
    const baseType = renderRustType(property, domainName, typeKinds, inlineEnumType(property));
    const fieldType = property.optional === true ? `Option<${baseType}>` : baseType;
    output.push(`${indent}    pub ${rustFieldName(property.name)}: ${fieldType},`);
  }
  output.push(`${indent}}`);
  return output.join("\n");
}

function renderRust(input: ProtocolInput): string {
  const typeKinds = buildTypeKinds(input.domains);
  const output = [
    `// Generated from ${sourceVersion}. Do not edit.`,
    "",
    "#[derive(Clone, Debug, PartialEq)]",
    "pub enum JsonValue {",
    "    Null,",
    "    Boolean(bool),",
    "    Number(f64),",
    "    String(String),",
    "    Array(Vec<JsonValue>),",
    "    Object(std::collections::BTreeMap<String, JsonValue>),",
    "}",
    "",
    "#[derive(Clone, Debug, PartialEq, Eq)]",
    "pub struct UnknownEnumValue {",
    "    pub enum_name: &'static str,",
    "    pub value: String,",
    "}",
    "",
  ];
  for (const domain of input.domains) {
    output.push(`pub mod ${snakeCase(domain.domain)} {`);
    for (const type of domain.types ?? []) {
      if (type.type === "object") {
        for (const property of type.properties ?? []) {
          if (property.enum !== undefined) {
            const enumName = `${type.id}${pascalCase(property.name)}PropertyEnum`;
            output.push(renderRustEnum(enumName, property.enum, "    "));
          }
        }
      }
    }
    for (const type of domain.types ?? []) {
      if (type.enum !== undefined) {
        output.push(renderRustEnum(type.id, type.enum, "    "));
      } else if (type.type === "object" && type.properties !== undefined) {
        output.push(renderRustStruct(
          type.id,
          type.properties,
          domain.domain,
          typeKinds,
          "    ",
          (property) => property.enum === undefined
            ? undefined
            : `crate::generated::${snakeCase(domain.domain)}::${type.id}${pascalCase(property.name)}PropertyEnum`,
        ));
      } else {
        output.push(`    pub type ${type.id} = ${renderRustType(type, domain.domain, typeKinds)};`);
      }
    }
    output.push("", "    pub mod commands {");
    for (const command of domain.commands ?? []) {
      const name = pascalCase(command.name);
      for (const property of command.parameters ?? []) {
        if (property.enum !== undefined) {
          output.push(renderRustEnum(`${name}${pascalCase(property.name)}ParamEnum`, property.enum, "        "));
        }
      }
      for (const property of command.returns ?? []) {
        if (property.enum !== undefined) {
          output.push(renderRustEnum(`${name}${pascalCase(property.name)}ResultEnum`, property.enum, "        "));
        }
      }
      output.push(renderRustStruct(
        `${name}Params`,
        command.parameters ?? [],
        domain.domain,
        typeKinds,
        "        ",
        (property) => property.enum === undefined
          ? undefined
          : `crate::generated::${snakeCase(domain.domain)}::commands::${name}${pascalCase(property.name)}ParamEnum`,
      ));
      output.push(renderRustStruct(
        `${name}Result`,
        command.returns ?? [],
        domain.domain,
        typeKinds,
        "        ",
        (property) => property.enum === undefined
          ? undefined
          : `crate::generated::${snakeCase(domain.domain)}::commands::${name}${pascalCase(property.name)}ResultEnum`,
      ));
    }
    output.push("    }", "", "    pub mod events {");
    for (const event of domain.events ?? []) {
      const name = pascalCase(event.name);
      for (const property of event.parameters ?? []) {
        if (property.enum !== undefined) {
          output.push(renderRustEnum(`${name}${pascalCase(property.name)}EventEnum`, property.enum, "        "));
        }
      }
      output.push(renderRustStruct(
        `${name}Event`,
        event.parameters ?? [],
        domain.domain,
        typeKinds,
        "        ",
        (property) => property.enum === undefined
          ? undefined
          : `crate::generated::${snakeCase(domain.domain)}::events::${name}${pascalCase(property.name)}EventEnum`,
      ));
    }
    output.push("    }", "}", "");
  }
  output.push(
    "#[derive(Clone, Copy, Debug, PartialEq, Eq)]",
    "pub struct CommandDescriptor {",
    "    pub method: &'static str,",
    "    pub has_params: bool,",
    "    pub has_result: bool,",
    "}",
    "",
    "pub static COMMAND_DESCRIPTORS: &[CommandDescriptor] = &[",
  );
  for (const domain of input.domains) {
    for (const command of domain.commands ?? []) {
      output.push(
        `    CommandDescriptor { method: ${JSON.stringify(`${domain.domain}.${command.name}`)}, has_params: ${(command.parameters?.length ?? 0) > 0}, has_result: ${(command.returns?.length ?? 0) > 0} },`,
      );
    }
  }
  output.push("];");
  return `${output.join("\n")}\n`;
}

async function readSchema(path: string): Promise<ProtocolSchema> {
  return JSON.parse(await readFile(path, "utf8")) as ProtocolSchema;
}

async function main(): Promise<void> {
  const [browser, javascript] = await Promise.all([
    readSchema(resolve(schemaDirectory, "browser_protocol.json")),
    readSchema(resolve(schemaDirectory, "js_protocol.json")),
  ]);
  if (browser.version.major !== javascript.version.major || browser.version.minor !== javascript.version.minor) {
    throw new Error("Protocol schema versions do not match");
  }
  const domains = [...browser.domains, ...javascript.domains];
  const names = new Set(domains.map((domain) => domain.domain));
  if (names.size !== domains.length) {
    throw new Error("Protocol schema contains duplicate domains");
  }
  const input: ProtocolInput = { version: browser.version, domains };
  await Promise.all([mkdir(dirname(tsOutput), { recursive: true }), mkdir(dirname(rustOutput), { recursive: true })]);
  await Promise.all([
    writeFile(tsOutput, renderTypeScript(input)),
    writeFile(rustOutput, renderRust(input)),
  ]);
  const commandCount = domains.reduce((count, domain) => count + (domain.commands?.length ?? 0), 0);
  const eventCount = domains.reduce((count, domain) => count + (domain.events?.length ?? 0), 0);
  const typeCount = domains.reduce((count, domain) => count + (domain.types?.length ?? 0), 0);
  process.stdout.write(`Generated ${domains.length} domains, ${typeCount} types, ${commandCount} commands, and ${eventCount} events.\n`);
}

await main();
