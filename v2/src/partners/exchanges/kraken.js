import React from "react"
import fbt from "fbt"
import KrakenLogo from "./kraken.png"

const Kraken = () => ({
  link: "https://www.kraken.com/",
  alt: "Kraken Exchange",
  img: KrakenLogo,
  text: (
    <fbt desc="Kraken featured exchange text">
      Kraken is the largest Bitcoin exchange in euro volume and liquidity and
      also trading Canadian dollars, US dollars, British pounds and Japanese
      yen. Kraken is consistently rated the best and most secure Bitcoin
      exchange by independent news media.
    </fbt>
  ),
  featured: true,
})

export default Kraken
