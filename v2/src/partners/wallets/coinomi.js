import React from "react"
import fbt from "fbt"
import CoinomiLogo from "./coinomi.png"

const Coinomi = () => ({
  link: "https://www.coinomi.com",
  alt: "Coinomi Wallet",
  img: CoinomiLogo,
  text: (
    <fbt desc="Coinomi featured wallet text">
      The blockchain wallet trusted by millions. Securely store, manage and
      exchange Bitcoin Cash, Bitcoin, Ethereum, and more than 1,770 other
      blockchain assets. Available on all of your devices: Android, iOS,
      Windows, macOS and Linux.
    </fbt>
  ),
  featured: false,
  android: true,
  ios: true,
  windows: true,
  mac: true,
  linux: true,
})

export default Coinomi
