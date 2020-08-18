const locales = require("./src/i18n/locales")

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage },
}) => {
  // Delete the original page (since we are gonna create localized versions of it)
  await deletePage(page)

  // Create one page for each locale
  await Promise.all(
    Object.entries(locales).map(async ([locale, params]) => {
      const originalPath = page.path

      let localizedPath = originalPath
      if (params.slug) {
        localizedPath = "/" + params.slug + localizedPath
      }

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          locale,
        },
      })
    })
  )
}
