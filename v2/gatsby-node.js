const locales = require("./src/i18n/locales")

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
