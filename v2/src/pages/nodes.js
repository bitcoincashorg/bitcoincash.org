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
      <SEO
        title="Bitcoin Cash Nodes"
        description={fbt(
          "Bitcoin Cash brings sound money to the world. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.",
          "Default SEO page description"
        )}
      />
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
