import React from "react"
import fbt from "fbt"
import BitcoinDotComLogo from "./bitcoindotcom.png"

const BitcoinDotCom = () => ({
  link: "https://wallet.bitcoin.com",
  alt: "Bitcoin.com Wallet",
  img: BitcoinDotComLogo,
  text: (
    <fbt desc="Bitcoin.com featured wallet text">
      Start using the Bitcoin.com Wallet for a simple, secure way to send and
      receive Bitcoin. The wallet supports both Bitcoin Cash (BCH) and Bitcoin
      Core (BTC), allowing users to switch between the two different currencies
      effortlessly.
    </fbt>
  ),
  featured: true,
  android: true,
  ios: true,
  windows: true,
  mac: true,
  linux: true,
})

export default BitcoinDotCom
