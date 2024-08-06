import { execSync } from "node:child_process";
import path from "node:path"

const kebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const execPath = path.dirname(process.argv[1])
const ARGV = process.argv.slice(2);

console.log("running make");

if (ARGV.length < 1) {
  console.error("help: npm run make <C++ file path> [output path]")
  process.exit()
}

console.log(ARGV)

const filePath = ARGV[0]
const name = path.parse(filePath).name
const outDir = ARGV.length >= 2 ? ARGV[1] : ""
const output = path.join(outDir, `${kebabCase(name)}.wasmmodule.js`)
console.log("output: " + output)

const command = `emcc --bind -O1 \
-s WASM=1 \
-s BINARYEN_ASYNC_COMPILATION=0 \
-s SINGLE_FILE=1 \
${filePath} \
-o ${output} \
--post-js "${path.join(execPath, "./lib/em-es6-module.js")}"`

console.log("exec: " + command)

execSync(command);

console.log("completed: make")
