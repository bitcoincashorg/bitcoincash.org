import { IntlVariations, init as fbtInit } from "fbt"
import translations from "i18n/translations.json"

export const initLocale = locale => {
  const viewerContext = {
    GENDER: IntlVariations.GENDER_UNKNOWN,
    locale: locale,
  }

  fbtInit({
    translations: translations,
    hooks: {
      getViewerContext: () => viewerContext,
    },
  })
}

export default initLocale
