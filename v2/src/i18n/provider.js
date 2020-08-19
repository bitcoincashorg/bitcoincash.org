import React from "react"
import locales from "i18n/locales"

const LocaleContext = React.createContext({})

const LocaleProvider = ({ children, locale }) => {
  return (
    <LocaleContext.Provider value={locales[locale]}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleProvider

export const useLocaleContext = () => React.useContext(LocaleContext)
