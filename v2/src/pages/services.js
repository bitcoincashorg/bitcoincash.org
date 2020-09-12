import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import Tiles from "components/tiles/tiles.js"
import * as AllServices from "../partners/services/*.js"

const ServicesPage = () => {
  const services = Object.values(AllServices).map(getServices => getServices())

  return (
    <>
      <SEO
        title="Bitcoin Cash Services"
        description={fbt(
          "Bitcoin Cash brings sound money to the world. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.",
          "Default SEO page description"
        )}
      />
      <Container>
        <h2 className="centerh2">
          <fbt desc="'Services' heading on services page">Services</fbt>
        </h2>
        <Tiles tiles={services} md={3} />
      </Container>
    </>
  )
}

export default ServicesPage
