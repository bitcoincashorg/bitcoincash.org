import React from "react"
import Layout from "components/layout"

export const wrapRootElement = ({ element }) => {
  return <>{element}</>
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout pageContext={props.pageContext}>{element}</Layout>
}
