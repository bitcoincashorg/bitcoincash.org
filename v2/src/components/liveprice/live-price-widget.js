import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocaleContext } from "i18n/provider"
import livePricingStyles from "./live-price-widget.module.css"

const LivePriceWidget = () => {
  const { currency, currencySymbol } = useLocaleContext()
  const bchPriceApi =
    "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD,JPY,EUR,RUB,CNY,IDR,KRW,BRL,TRY,TWD"
  const [currentPrice, setCurrentPrice] = useState("-")
  const updateBchPrice = () => {
    axios.get(bchPriceApi).then(response => {
      if (response.data) {
        setCurrentPrice(response.data)
      }
    })
  }

  useEffect(() => {
    updateBchPrice()
    const interval = setInterval(() => {
      updateBchPrice()
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <a className={livePricingStyles.widgetContainer} href="/buy-bitcoin-cash/">
      <div className={livePricingStyles.currentPrice}>
        {currencySymbol}
        {currentPrice[currency]}
      </div>
      <div className={livePricingStyles.ticker}>{currency}</div>
    </a>
  )
}

export default LivePriceWidget
