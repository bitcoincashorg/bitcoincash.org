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
import Bitcoindotcom from "assets/images/wallets/bitcoindotcom.png"
import Electroncash from "assets/images/wallets/electroncash.png"
import Bread from "assets/images/wallets/bread.png"
import Copay from "assets/images/wallets/copay.png"
import Jaxx from "assets/images/wallets/jaxx.png"
import Edge from "assets/images/wallets/edge.png"
import Coinbase from "assets/images/wallets/coinbase.png"
import Mobi from "assets/images/wallets/mobi.png"
import Bitpay from "assets/images/wallets/bitpay.png"
import Strongcoin from "assets/images/wallets/strongcoin.png"
import Ifwallet from "assets/images/wallets/ifwallet.png"
import Gemini from "assets/images/wallets/gemini.png"
import Exodus from "assets/images/wallets/exodus.png"
import Badger from "assets/images/wallets/badger.jpg"
import Ledger from "assets/images/wallets/ledger.png"
import Trezor from "assets/images/wallets/trezor.png"
import Coldlar from "assets/images/wallets/coldlar.png"
import Cashaddress from "assets/images/wallets/cashaddress.png"
import Bitcoincashnotes from "assets/images/wallets/bitcoincashnotes.png"

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

  const featuredTiles = [
    {
      link: "https://wallet.bitcoin.com",
      img: Bitcoindotcom,
      alt: "bitcoin.com wallet",
      text: (
        <fbt desc="Wallets page Bitcoin.com featured wallet text">
          Start using the Bitcoin.com Wallet for a simple, secure way to send
          and receive Bitcoin. The wallet supports both Bitcoin Cash (BCH) and
          Bitcoin Core (BTC), allowing users to switch between the two different
          currencies effortlessly.
        </fbt>
      ),
    },
    {
      link: "https://electroncash.org/",
      img: Electroncash,
      alt: "electroncash wallet",
      text: (
        <fbt desc="Wallets page ElectronCash featured wallet text">
          Your private keys are encrypted and never leave your computer. Your
          funds can be recovered from a secret phrase. Electron Cash is fast,
          because it uses servers that index the Bitcoin Cash blockchain. You
          can export your private keys and use them in other Bitcoin Cash
          clients.
        </fbt>
      ),
    },
  ]

  const wallets = [
    {
      link: "https://wallet.bitcoin.com",
      alt: "Bitcoin.com Wallet",
      img: Bitcoindotcom,
      android: true,
      ios: true,
      windows: true,
    },
    {
      link: "https://paperwallet.bitcoin.com",
      alt: "Bitcoin.com Paper Wallet",
      img: Bitcoindotcom,
      paper: true,
    },
    {
      link: "https://electroncash.org",
      alt: "Electron Cash Wallet",
      img: Electroncash,
      android: true,
      ios: true,
      windows: true,
    },
    {
      link: "https://breadapp.com/",
      alt: "Bread",
      img: Bread,
      android: true,
      ios: true,
    },
    {
      link: "https://blog.bitpay.com/bitcoin-cash-wallet-beta/",
      alt: "Copay",
      img: Copay,
      android: true,
      ios: true,
    },
    {
      link: "https://jaxx.io/",
      alt: "Jaxx",
      img: Jaxx,
      android: true,
      ios: true,
    },
    {
      link: "https://edgesecure.co/",
      alt: "Edge",
      img: Edge,
      android: true,
      ios: true,
    },
    {
      link: "https://www.coinbase.com/",
      alt: "Coinbase",
      img: Coinbase,
      android: true,
      ios: true,
    },
    {
      link: "https://www.mobi.me/",
      alt: "Mobi",
      img: Mobi,
      android: true,
      ios: true,
    },
    {
      link: "https://bitpay.com/wallet",
      alt: "Bitpay Wallet",
      img: Bitpay,
      android: true,
      ios: true,
      windows: true,
    },
    {
      link: "https://strongcoin.com/",
      alt: "StrongCoin",
      img: Strongcoin,
      ios: true,
    },
    {
      link: "https://www.ifwallet.com",
      alt: "ifwallet.com",
      img: Ifwallet,
      android: true,
      ios: true,
    },
    {
      link: "https://gemini.com/wallet",
      alt: "Gemini Wallet",
      img: Gemini,
      android: true,
      ios: true,
    },
    {
      link: "https://www.exodus.io/",
      alt: "Exodus Wallet",
      img: Exodus,
      windows: true,
    },
    {
      link: "https://badger.bitcoin.com",
      alt: "Badger Wallet",
      img: Badger,
      windows: true,
    },
    {
      link: "https://www.ledger.com/",
      alt: "Ledger Wallet",
      img: Ledger,
      hardware: true,
    },
    {
      link: "https://wallet.trezor.io/#/",
      alt: "Trezor Wallet",
      img: Trezor,
      hardware: true,
    },
    {
      link: "https://www.coldlar.com/",
      alt: "Coldlar Wallet",
      img: Coldlar,
      hardware: true,
    },
    {
      link: "https://cashaddress.org/",
      alt: "Cashaddress Wallet",
      img: Cashaddress,
      paper: true,
    },
    {
      link: "https://bitcoincashnotes.com/",
      alt: "Bitcoincash Notes Wallet",
      img: Bitcoincashnotes,
      paper: true,
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

  let androidWallets = filterWalletTypes(wallets, "android")
  let iosWallets = filterWalletTypes(wallets, "ios")
  let desktopWallets = filterWalletTypes(wallets, "windows")
  let hardwareWallets = filterWalletTypes(wallets, "hardware")
  let paperWallets = filterWalletTypes(wallets, "paper")

  return (
    <>
      <SEO title="Bitcoin Cash Wallets" />
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
        <FeaturedTiles tiles={featuredTiles} md={6} />
      </Container>
      <Container>
        <h2 className="centerh2">
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
        <h2 className="centerh2">
          <fbt desc="Wallets page wallet list 'Desktop wallets' header">
            Desktop Wallets
          </fbt>
        </h2>
        <Tabs defaultActiveKey="windows">
          <Tab eventKey="windows" title="Windows">
            <Tiles tiles={desktopWallets} md={3} />
          </Tab>
          <Tab eventKey="mac" title="macOS">
            <Tiles tiles={desktopWallets} md={3} />
          </Tab>
          <Tab eventKey="linux" title="Linux">
            <Tiles tiles={desktopWallets} md={3} />
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <h2 className="centerh2">
          <fbt desc="Wallets page wallet list 'Hardware wallets' header">
            Hardware Wallets
          </fbt>
        </h2>
        <Tiles tiles={hardwareWallets} md={4} />
      </Container>
      <Container>
        <h2 className="centerh2">
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
