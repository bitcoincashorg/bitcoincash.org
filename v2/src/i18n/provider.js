import React from "react"
import translations from "i18n/translations.json"
import { IntlVariations, init } from "fbt"

const LocaleProvider = ({ children, locale }) => {
  const viewerContext = {
    GENDER: IntlVariations.GENDER_UNKNOWN,
    locale: locale,
  }

  init({
    translations: translations,
    hooks: {
      getViewerContext: () => viewerContext,
    },
  })

  return <>{children}</>
}

export default LocaleProvider
