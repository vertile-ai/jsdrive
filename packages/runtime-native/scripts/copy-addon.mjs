import { copyFile, mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const extension = process.platform === "win32" ? "dll" : process.platform === "darwin" ? "dylib" : "so";
const prefix = process.platform === "win32" ? "" : "lib";
const source = resolve(packageRoot, `../../target/debug/${prefix}nodriver_node_binding.${extension}`);
const target = resolve(packageRoot, `native/nodriver.${process.platform}-${process.arch}.node`);
await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
if (process.platform === "darwin") await promisify(execFile)("codesign", ["--force", "--sign", "-", target]);
console.log(target);
