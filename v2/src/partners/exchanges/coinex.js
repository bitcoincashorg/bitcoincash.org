import React from "react"
import fbt from "fbt"
import CoinexLogo from "./coinex.png"

const Coinex = () => ({
  link: "https://www.coinex.com/",
  alt: "Coinex Exchange",
  img: CoinexLogo,
  text: (
    <fbt desc="Coinex featured exchange text">
      CoinEx is dedicated to building a highly secure, stable and efficient
      digital coin exchange for global users. CoinEx now supports multiple
      languages and are providing global trading services in nearly 100
      countries/regions.
    </fbt>
  ),
  featured: true,
})

export default Coinex
