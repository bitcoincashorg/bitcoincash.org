import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import Tiles from "components/tiles/tiles.js"
import * as AllNodes from "../partners/nodes/*.js"

const NodesPage = () => {
  const nodes = Object.values(AllNodes).map(getNodes => getNodes())

  return (
    <>
      <SEO title={fbt("Bitcoin Cash Nodes", "Nodes page SEO title")} />
      <Container style={{ padding: "130px 0" }}>
        <h2 className="centerh2">
          <fbt desc="'Nodes' heading on nodes page">Nodes</fbt>
        </h2>
        <Tiles tiles={nodes} md={4} />
      </Container>
    </>
  )
}

export default NodesPage
