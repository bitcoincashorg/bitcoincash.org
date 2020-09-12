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
      <SEO
        title="Bitcoin Cash Exchanges"
        description={fbt(
          "Bitcoin Cash brings sound money to the world. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.",
          "Default SEO page description"
        )}
      />
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
