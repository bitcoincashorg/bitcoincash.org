import React from "react"
import Page from "layout/page"

export const wrapRootElement = ({ element }) => {
  return <>{element}</>
}

export const wrapPageElement = ({ element, props }) => {
  return <Page context={props.pageContext}>{element}</Page>
}
