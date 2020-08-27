/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./page.scss"
import "./global.scss"
import Header from "./header"
import Footer from "./footer"
import LocaleProvider from "i18n/provider"
import initLocale from "i18n/init"

const Page = ({ children, context }) => {
  initLocale(context.locale)

  return (
    <LocaleProvider locale={context.locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LocaleProvider>
  )
}

export default Page
