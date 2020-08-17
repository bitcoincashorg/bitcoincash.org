/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import "./layout.scss"
import "../global/global.scss"
import Header from "./header/header"
import Footer from "./footer/footer"

import { IntlVariations, init } from "fbt"

const viewerContext = {
  GENDER: IntlVariations.GENDER_UNKNOWN,
  locale: "en_US",
}

init({
  translations: {},
  hooks: {
    getViewerContext: () => viewerContext,
  },
})

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
