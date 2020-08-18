"use strict"

const fetch = require("node-fetch")
const yargs = require("yargs")
const assert = require("assert")
const path = require("path")
const fs = require("fs")

const args = {
  ORG: "org",
  PROJECT: "project",
  RESOURCE: "resource",
  LOCALES: "locales",
  DST: "dst",
}

const { argv } = yargs
  .string(args.ORG)
  .default(args.ORG, "bitcoin-cash")
  .describe(args.ORG, "The transifex organization.")
  .string(args.PROJECT)
  .default(args.PROJECT, "bitcoin-cash-website")
  .describe(args.PROJECT, "The transifex project.")
  .string(args.RESOURCE)
  .default(args.RESOURCE, "transifexjson")
  .describe(args.RESOURCE, "The transifex resource.")
  .string(args.LOCALES)
  .default(args.LOCALES, "src/i18n/locales")
  .describe(args.LOCALES, "Path to locale object / module.")
  .string(args.DST)
  .default(args.DST, "src/i18n/locales")
  .describe(args.DST, "Folder in which the locale files will be generated.")

const safeRequire = modulePath => {
  try {
    // eslint-disable-next-line global-require
    return require(modulePath)
  } catch {
    return false
  }
}

const fetchTransifexLocale = async (locale, options) => {
  console.time(`Fetch Transifex locale ${locale}`)

  const { organization, project, resource, auth } = options

  const TRANSLATION_URL = `https://www.transifex.com/api/2/project/${project}/resource/${resource}/translation/${locale}/`
  const url_options = {
    method: "GET",
    headers: {
      Authorization: "Basic " + new Buffer.from(auth).toString("base64"),
    },
  }

  try {
    const response = await fetch(TRANSLATION_URL, url_options)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const generateLocales = async options => {
  const locales = safeRequire(path.join(process.cwd(), argv[args.LOCALES]))
  assert(locales, "Could not locales (defaults to src/i18n/locales.js).")

  await Promise.all(
    Object.entries(locales).map(async ([locale, params]) => {
      const response = await fetchTransifexLocale(params.transifex, options)
      const content = JSON.parse(response.content)

      let translations = {}
      Object.entries(content).forEach(([key, translation]) => {
        translations[key] = {
          translations: [
            {
              translation: translation.string,
            },
          ],
        }
      })

      const fbtlocale = {
        "fb-locale": locale,
        translations: translations,
      }

      const translationsFilePath = path.join(
        process.cwd(),
        argv[args.DST],
        `${locale}.json`
      )

      fs.writeFileSync(translationsFilePath, JSON.stringify(fbtlocale, null, 2))
    })
  )
}

let options = {
  organization: argv[args.ORG],
  project: argv[args.PROJECT],
  resource: argv[args.RESOURCE],
  auth: `api:${process.env.TRANSIFEX_TOKEN}`,
}

generateLocales(options)
