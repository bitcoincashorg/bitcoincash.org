import React from "react"
import fbt from "fbt"
import CoinbaseLogo from "./coinbase.png"

const Coinbase = () => ({
  link: "https://www.coinbase.com/",
  alt: "Coinbase Exchange",
  img: CoinbaseLogo,
  text: (
    <fbt desc="Coinbase featured exchange text">
      Coinbase is a digital currency exchange headquartered in San Francisco,
      California. They broker exchanges of Bitcoin Cash and other
      cryptocurrencies with fiat currencies in approximately 32 countries.
    </fbt>
  ),
  featured: true,
})

export default Coinbase
