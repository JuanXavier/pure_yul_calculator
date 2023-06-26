const path = require("path");
const fs = require("fs");
const solc = require("solc");

const outputPath = path.resolve(
  __dirname,
  "..",
  "build",
  "Calculator.bytecode.json"
);

const inputPath = path.resolve(__dirname, "..", "contracts", "Calculator.yul");

const source = fs.readFileSync(inputPath, "utf-8");

var input = {
  language: "Yul",
  sources: {
    "Calculator.yul": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["evm.bytecode"],
      },
    },
  },
};

const compiledContract = solc.compile(JSON.stringify(input));
const bytecode =
  JSON.parse(compiledContract).contracts["Calculator.yul"].Calculator.evm
    .bytecode.object;

fs.writeFile(outputPath, JSON.stringify(bytecode), (err) => {
  err && console.error(err);
});

console.log("done");
