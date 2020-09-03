import React from "react"
import fbt from "fbt"
import ElectronCashLogo from "./electroncash.png"

const ElectronCash = () => ({
  link: "https://electroncash.org",
  alt: "Electron Cash Wallet",
  img: ElectronCashLogo,
  text: (
    <fbt desc="ElectronCash featured wallet text">
      Your private keys are encrypted and never leave your computer. Your funds
      can be recovered from a secret phrase. Electron Cash is fast, because it
      uses servers that index the Bitcoin Cash blockchain. You can export your
      private keys and use them in other Bitcoin Cash clients.
    </fbt>
  ),
  featured: true,
  android: true,
  ios: true,
  windows: true,
})

export default ElectronCash
