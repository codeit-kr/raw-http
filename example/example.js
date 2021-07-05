const { RawHttpClient } = require("../dist")
const fs = require("fs")
const path = require("path")

const firstArgument = process.argv[2]
let fileContent
if (firstArgument.startsWith("-")) {
  switch (firstArgument.slice(1)) {
    case "f":
      const filePath = process.argv[3]
      fileContent = fs.readFileSync(path.resolve(filePath)).toString()
      break
    default:
      throw Error("Unknown option.")
  }
} else {
  fileContent = process.argv[2]
}

new RawHttpClient({ beautify: true }).requestAll(fileContent).then(r => console.log(r[r.length - 1]))
