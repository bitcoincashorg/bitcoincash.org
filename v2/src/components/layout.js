/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "./layout.scss"
import "global/global.scss"
import Header from "./header/header"
import Footer from "./footer/footer"
import LocaleProvider from "i18n/provider"

const Layout = ({ children, pageContext }) => {
  return (
    <LocaleProvider locale={pageContext.locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LocaleProvider>
  )
}

export default Layout
