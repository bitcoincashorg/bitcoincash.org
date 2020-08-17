"use strict"

const yargs = require("yargs")
const assert = require("assert")
const path = require("path")
const fs = require("fs")

const args = {
  SRC: "src",
  DST: "dst",
}

const { argv } = yargs
  .string(args.SRC)
  .default(args.SRC, ".source_strings.json")
  .describe(args.SRC, "Path to source.")
  .string(args.DST)
  .default(args.DST, "src/i18n/transifex.json")
  .describe(args.DST, "Path to transifex translation file.")

const safeRequire = modulePath => {
  try {
    // eslint-disable-next-line global-require
    return require(modulePath)
  } catch {
    return false
  }
}

const sourceStrings = safeRequire(path.join(process.cwd(), argv[args.SRC]))
assert(
  sourceStrings,
  "Could not find source (defaults to .source_string.json)."
)

const { phrases } = sourceStrings

let transifex = {}
phrases.forEach(phrase => {
  let desc = phrase.desc
  let context = phrase.filepath + ":" + phrase.line_beg + ":" + phrase.line_end

  Object.entries(phrase.hashToText).forEach(([hash, text]) => {
    transifex[hash] = {
      string: text,
      developer_comment: desc,
      context: context,
    }
  })
})

fs.writeFileSync(argv[args.DST], JSON.stringify(transifex, null, 2))
