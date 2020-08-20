import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import livePricingStyles from "./live-price-widget.module.css"

const LivePriceWidget = ({ currentPrice, ticker, url }) => {
  const data = useStaticQuery(graphql`
    query LivePriceThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
            primary_light
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours

  return (
    <a className={livePricingStyles.widgetContainer} href={url}>
      <div className={livePricingStyles.currentPrice}>{currentPrice}</div>
      <div className={livePricingStyles.tickerContainer}>
        <div
          className={livePricingStyles.ticker}
          style={{ color: theme.primary_dark }}
        >
          {ticker}
        </div>
      </div>
    </a>
  )
}

export default LivePriceWidget
