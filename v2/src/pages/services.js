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
      <SEO title={fbt("Bitcoin Cash Services", "Services page SEO title")} />
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
