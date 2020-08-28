const locales = require("./src/i18n/locales")
const path = require("path")

// Execute some function for each locale of a given page
const forEachLocale = async (page, fn) => {
  await Promise.all(
    Object.entries(locales).map(async ([locale, localizationParams]) => {
      const originalPath = page.path
      const context = {
        ...page.context,
        originalPath,
        locale,
      }

      let localizedPath = originalPath
      if (localizationParams.slug) {
        localizedPath = "/" + localizationParams.slug + localizedPath
      }

      await fn(page, context, localizationParams, localizedPath)
    })
  )
}

const createPageForEachLocale = async (createPage, page) => {
  await forEachLocale(
    page,
    async (page, context, localizationParams, localizedPath) => {
      createPage({
        ...page,
        path: localizedPath,
        context,
      })
    }
  )
}

const createRedirectForEachLocale = async (createRedirect, page) => {
  await forEachLocale(
    page,
    async (page, context, localizationParams, localizedPath) => {
      createRedirect({
        fromPath: localizedPath,
        // By default, assume paths of the form `/path/` transform to
        // v1 paths of the form `/path.html`
        toPath: localizedPath.replace(/\/$/, "") + ".html",
        redirectInBrowser: true,
        isPermanent: false,
      })
    }
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  // Fetch path info for all pages
  const result = await graphql(`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "jekyll-migration" }
          extension: { eq: "js" }
        }
      ) {
        nodes {
          name
          relativeDirectory
          absolutePath
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }

  await Promise.all(
    result.data.allFile.nodes.map(async node => {
      let originalPath = "/" + (node.name == "index" ? "" : node.name + "/")
      if (node.relativeDirectory) {
        originalPath = "/" + node.relativeDirectory + originalPath
      }

      const page = {
        path: originalPath,
        component: path.resolve(node.absolutePath),
        context: {},
      }

      // In production, we redirect in-development v2 pages to v1 equivalent routes.
      // In non-prod environments, we create all pages and do not redirect.
      if (process.env.GATSBY_APP_ENV == "prod") {
        await createRedirectForEachLocale(createRedirect, page)
      } else {
        await createPageForEachLocale(createPage, page)
      }
    })
  )
}

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage },
}) => {
  // Delete the original page (since we are gonna create localized versions of it)
  await deletePage(page)

  // Create one page for each locale
  await forEachLocale(
    page,
    (page, context, localizationParams, localizedPath) => {
      createPage({
        ...page,
        path: localizedPath,
        context,
      })
    }
  )
}
