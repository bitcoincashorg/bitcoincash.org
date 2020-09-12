import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Tab, Tabs } from "react-bootstrap"

import Sidebar from "components/sidebar/sidebar.js"
import LargeTile from "components/large-tile/large-tile.js"
import FeaturedTiles from "components/featured-tiles/featured-tiles.js"
import Tiles from "components/tiles/tiles.js"
import Mobile from "assets/icons/wallets/phone.svg"
import Desktop from "assets/icons/wallets/desktop-wallet.svg"
import Hardware from "assets/icons/wallets/hardware-wallet.svg"
import Paper from "assets/icons/wallets/paper-wallet.svg"
import Wallet from "assets/images/get-started/bitcoin-cash-wallet.jpg"
import * as AllWallets from "../partners/wallets/*.js"

const WalletsPage = () => {
  const sideBarContent = [
    {
      title: fbt(
        "Mobile Wallet",
        "Wallets page side column 'Mobile wallet' header"
      ),
      paragraph: fbt(
        "A mobile wallet is great for storing and spending Bitcoin Cash.",
        "Wallets page side column 'Mobile wallet' paragraph"
      ),
      icon: <Mobile />,
      link: "#mobile-wallets",
    },
    {
      title: fbt(
        "Desktop Wallet",
        "Wallets page side column 'desktop wallet' header"
      ),
      paragraph: fbt(
        "Try using a Desktop Wallet to bring Bitcoin Cash into your business.",
        "Wallets page side column 'desktop wallet' paragraph"
      ),
      icon: <Desktop />,
      link: "#desktop-wallets",
    },
    {
      title: fbt(
        "Hardware Wallet",
        "Wallets page side column 'hardware wallet' header"
      ),
      paragraph: fbt(
        "Keep your Bitcoin Cash in a secure hardware wallet. Great for long term storage.",
        "Wallets page side column 'hardware wallet' paragraph"
      ),
      icon: <Hardware />,
      link: "#hardware-wallets",
    },
    {
      title: fbt(
        "Paper Wallet",
        "Wallets page side column 'paper wallet' header"
      ),
      paragraph: fbt(
        "Store your Bitcoin Cash offline on a Paper Wallet. Great for long term storage or gifting to friends or family.",
        "Wallets page side column 'paper wallet' paragraph"
      ),
      icon: <Paper />,
      link: "#paper-wallets",
    },
  ]

  const largeTileContent = [
    {
      subtitle: fbt(
        "Where do I store my Bitcoin Cash?",
        "Wallets page subtitle"
      ),
      title: fbt("Download a wallet", "Wallets page title"),
      paragraph: (
        <fbt desc="Wallets page main paragraph">
          Getting started with Bitcoin Cash is super easy. The first step is to
          download a wallet so that you can begin participating in the Bitcoin
          economy. Most wallets are free to download and are easy to use that
          have a few key features such as sending, receiving, storing funds
          securely, transaction lookups, and more.
        </fbt>
      ),
    },
  ]

  const filterWalletTypes = (array, property) => {
    return array.reduce(function (newarray, obj) {
      let key = obj[property]
      if (key) {
        newarray.push(obj)
      }
      return newarray
    }, [])
  }

  const wallets = Object.values(AllWallets).map(getWallet => getWallet())
  const featuredWallets = filterWalletTypes(wallets, "featured")
  const androidWallets = filterWalletTypes(wallets, "android")
  const iosWallets = filterWalletTypes(wallets, "ios")
  const windowsWallets = filterWalletTypes(wallets, "windows")
  const macWallets = filterWalletTypes(wallets, "mac")
  const linuxWallets = filterWalletTypes(wallets, "linux")
  const hardwareWallets = filterWalletTypes(wallets, "hardware")
  const paperWallets = filterWalletTypes(wallets, "paper")

  return (
    <>
      <SEO title={fbt("Bitcoin Cash Wallets", "Wallets page SEO title")} />
      <Container>
        <Row>
          <Sidebar
            content={sideBarContent}
            title={fbt(
              "What kind of wallet should I use?",
              "sidebar title 'wallets' page"
            )}
          />
          <LargeTile content={largeTileContent}>
            <img src={Wallet} alt="Bitcoin Cash wallets" />
          </LargeTile>
        </Row>
      </Container>
      <Container>
        <h2 className="centerh2">
          <fbt desc="'featured wallets' heading on wallets page">
            Featured Wallets
          </fbt>
        </h2>
        <FeaturedTiles tiles={featuredWallets} md={6} />
      </Container>
      <Container>
        <h2 className="centerh2" id="mobile-wallets">
          <fbt desc="Wallets page wallet list 'Mobile wallets' header">
            Mobile Wallets
          </fbt>
        </h2>
        <Tabs defaultActiveKey="android">
          <Tab eventKey="android" title="Android">
            <Tiles tiles={androidWallets} md={3} />
          </Tab>
          <Tab eventKey="ios" title="iOS">
            <Tiles tiles={iosWallets} md={3} />
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <h2 className="centerh2" id="desktop-wallets">
          <fbt desc="Wallets page wallet list 'Desktop wallets' header">
            Desktop Wallets
          </fbt>
        </h2>
        <Tabs defaultActiveKey="windows">
          <Tab eventKey="windows" title="Windows">
            <Tiles tiles={windowsWallets} md={3} />
          </Tab>
          <Tab eventKey="mac" title="macOS">
            <Tiles tiles={macWallets} md={3} />
          </Tab>
          <Tab eventKey="linux" title="Linux">
            <Tiles tiles={linuxWallets} md={3} />
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <h2 className="centerh2" id="hardware-wallets">
          <fbt desc="Wallets page wallet list 'Hardware wallets' header">
            Hardware Wallets
          </fbt>
        </h2>
        <Tiles tiles={hardwareWallets} md={4} />
      </Container>
      <Container>
        <h2 className="centerh2" id="paper-wallets">
          <fbt desc="Wallets page wallet list 'Paper wallets' header">
            Paper Wallets
          </fbt>
        </h2>
        <Tiles tiles={paperWallets} md={4} />
      </Container>
    </>
  )
}

export default WalletsPage
