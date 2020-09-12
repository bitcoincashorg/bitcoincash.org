import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import FeaturedTiles from "components/featured-tiles/featured-tiles.js"
import Tiles from "components/tiles/tiles.js"
import * as AllExchanges from "../partners/exchanges/*.js"

const ExchangesPage = () => {
  const filterExchanges = (array, property) => {
    return array.reduce(function (newarray, obj) {
      let key = obj[property]
      if (key) {
        newarray.push(obj)
      }
      return newarray
    }, [])
  }

  const exchanges = Object.values(AllExchanges).map(getExchanges =>
    getExchanges()
  )
  const featuredExchanges = filterExchanges(exchanges, "featured")

  return (
    <>
      <SEO title={fbt("Bitcoin Cash Exchanges", "Exchanges page SEO title")} />
      <Container>
        <h2 className="centerh2">
          <fbt desc="'Exchanges' heading on Exchanges page">
            Featured Exchanges
          </fbt>
        </h2>
        <FeaturedTiles tiles={featuredExchanges} md={4} />
        <Tiles tiles={exchanges} md={3} />
      </Container>
    </>
  )
}

export default ExchangesPage
