import React from "react"
import livePricingStyles from "./live-price-widget.module.css"

const LivePriceWidget = ({ currentPrice, ticker, url }) => {
  return (
    <a className={livePricingStyles.widgetContainer} href={url}>
      <div className={livePricingStyles.currentPrice}>{currentPrice}</div>
      <div className={livePricingStyles.ticker}>{ticker}</div>
    </a>
  )
}

export default LivePriceWidget
