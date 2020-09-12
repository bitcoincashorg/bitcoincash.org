import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row } from "react-bootstrap"
import Link from "global/link.js"
import Sidebar from "components/sidebar/sidebar.js"
import LargeTile from "components/large-tile/large-tile.js"
import FeaturedTiles from "components/featured-tiles/featured-tiles.js"
import Tiles from "components/tiles/tiles.js"
import Cart from "assets/icons/cart.svg"
import Faucet from "assets/icons/water.svg"
import Phone from "assets/icons/wallets/phone.svg"
import Cash from "assets/icons/cash.svg"
import Globe from "assets/icons/globe.svg"
import People from "assets/icons/people.svg"
import Business from "assets/icons/getting-started/business.svg"
import Card from "assets/icons/card.svg"
import CoinImage from "assets/images/get-started/buy-bitcoin-cash.jpg"
import * as AllExchanges from "../partners/exchanges/*.js"
import * as AllMicroEconomy from "../partners/microeconomy/*.js"

const BuyPage = () => {
  const sideBarContent = [
    {
      title: fbt(
        "Buy from an Exchange",
        "Buy page side column 'Buy from an Exchange' header"
      ),
      paragraph: fbt(
        "Send fiat to a trusted 3rd party exchange and purchase Bitcoin Cash.",
        "Buy page side column 'Buy from an Exchange' paragraph"
      ),
      icon: <Cart />,
    },
    {
      title: fbt(
        "Use a Bitcoin Cash Faucet",
        "Buy page side column 'Use a Bitcoin Cash Faucet' header"
      ),
      paragraph: (
        <fbt desc="Buy page side column faucet paragraph">
          Use a trusted
          <Link href="https://free.bitcoin.com/">Bitcoin Cash faucet</Link> to
          receive a tiny amount of Bitcoin Cash for free!
        </fbt>
      ),
      icon: <Faucet />,
    },
    {
      title: fbt(
        "Purchase in an App",
        "Buy page side column 'Purchase in app' header"
      ),
      paragraph: fbt(
        "Use a trusted 3rd party app that sells Bitcoin Cash with a credit card.",
        "Buy page side column 'Purchase in app' paragraph"
      ),
      icon: <Phone />,
    },
    {
      title: fbt(
        "Purchase from a Bitcoin Cash ATM",
        "Buy page side column 'ATM' header"
      ),
      paragraph: fbt(
        "Many cities across the globe are setup with specialized Bitcoin Cash enabled ATM machines.",
        "Buy page side column 'ATM' paragraph"
      ),
      icon: <Cash />,
    },
    {
      title: fbt(
        "Earn Bitcoin Cash Online",
        "Buy page side column 'Earn' header"
      ),
      paragraph: (
        <fbt desc="Buy page side column 'Earn' paragraph">
          Participate on censorship resistant social media platforms like
          <fbt:param name="memo.cash">
            <Link href="https://memo.cash/">Memo.cash</Link>
          </fbt:param>.
        </fbt>
      ),
      icon: <Globe />,
    },
    {
      title: fbt(
        "Buy in Person",
        "Buy page side column 'Buy in Person' header"
      ),
      paragraph: (
        <fbt desc="Buy page side column 'Buy in person' paragraph">
          Connect with locals in your area who are selling Bitcoin Cash on
          <fbt:param name="local.bitcoin.com">
            <Link href="https://local.bitcoin.com/">Bitcoin.com Local</Link>
          </fbt:param>
          or
          <fbt:param name="localbitcoincash.org">
            <Link href="https://localbitcoincash.org/">
              LocalBitcoinCash.org
            </Link>
          </fbt:param>.
        </fbt>
      ),
      icon: <People />,
    },
    {
      title: fbt(
        "Accept Bitcoin Cash at your Business",
        "Buy page side column 'Accept at you business' header"
      ),
      paragraph: (
        <fbt desc="Buy page side column 'Accept at you business' paragraph">
          Add Bitcoin Cash as a payment method to your store with the
          <Link href="https://www.bitcoin.com/bitcoin-cash-register/">
            Bitcoin Cash Register
          </Link>. Sell items online or in person for Bitcoin Cash.
        </fbt>
      ),
      icon: <Business />,
    },
    {
      title: fbt(
        "Ask to be paid in Bitcoin Cash",
        "Buy page side column 'paid' header"
      ),
      paragraph: (
        <fbt desc="Buy page side column 'paid' paragraph">
          Enquire with your job about being paid in full or partially in Bitcoin
          Cash.
        </fbt>
      ),
      icon: <Card />,
    },
  ]

  const largeTileContent = [
    {
      subtitle: fbt("How do I get Bitcoin Cash?", "Buy page subtitle"),
      title: fbt("Buy or Earn Bitcoin Cash", "Buy page title"),
      paragraph: (
        <fbt desc="Buy page main paragraph">
          The two easiest ways to get Bitcoin Cash is to buy or work for it.
          Buying Bitcoin Cash is the most used and convenient way, where all you
          have to do is sign up for a Bitcoin exchange and deposit funds so you
          can convert it to Bitcoin Cash. The exchange will send you Bitcoin
          Cash after the trade has occurred. The other option is to earn Bitcoin
          Cash by working for it, for example finding a job on a job board that
          pays in Bitcoin Cash or creating your own service (selling t-shirts
          for example) and earning Bitcoin Cash.
        </fbt>
      ),
    },
    {
      subtitle: fbt(
        "Where can I find Bitcoin Cash locally?",
        "Buy page subtitle for finding bitcoin cash locally"
      ),
      paragraph: (
        <fbt desc="Buy page find locally paragraph">
          In many cities there is a market of Over The Counter (OTC) traders who
          trade fiat (such as USD, Yen, Euro, etc) for Bitcoin Cash. Or consider
          asking your employer if they would be willing to be at the forefront
          of the future of money and offer partial or complete payment in
          Bitcoin Cash. Some larger cities are also equipped with a Bitcoin Cash
          enabled ATM machine which make it very easy to trade in fiat for
          Bitcoin Cash. Ask at your nearest
          <Link href="https://events.bitcoin.com/">Bitcoin Cash Meetup</Link>
          about other options, or consider visiting restaurants in your city
          where you can
          <Link href="/spend-bitcoin-cash/">spend Bitcoin Cash</Link> and
          enquire there.
        </fbt>
      ),
    },
    {
      subtitle: fbt(
        "Can I buy Bitcoin Cash Online?",
        "Buy page subtitle for buying bitcoin cash online"
      ),
      paragraph: (
        <fbt desc="Buy page buy online paragraph">
          Buying Bitcoin Cash online is the most popular way to receive Bitcoin
          Cash. Online Exchanges which buy and sell local currency and
          cryptocurrencies allow you to perform bank transfers to trade for
          Bitcoin Cash. Some even accept credit card for immediate purchase. As
          with any online purchase, do your own research and ensure you have a
          your own wallet. We do not recommend leaving any Bitcoin Cash on
          exchanges. You should always store your Bitcoin Cash on your own
          wallet that's been safely backed up.
        </fbt>
      ),
    },
  ]

  const filterExchanges = (array, property) => {
    return array.reduce(function (newarray, obj) {
      let key = obj[property]
      if (key) {
        newarray.push(obj)
      }
      return newarray
    }, [])
  }

  const exchanges = Object.values(AllExchanges).map(getExchange =>
    getExchange()
  )
  const microeconomy = Object.values(AllMicroEconomy).map(getMicro =>
    getMicro()
  )
  const featuredExchanges = filterExchanges(exchanges, "featured")

  return (
    <>
      <SEO title={fbt("Buy Bitcoin Cash", "Buy page SEO title")} />
      <Container>
        <Row>
          <Sidebar
            content={sideBarContent}
            title={fbt(
              "Where can I get Bitcoin Cash?",
              "sidebar title 'buy' page"
            )}
          />
          <LargeTile content={largeTileContent}>
            <img src={CoinImage} alt="Buy Bitcoin Cash" />
          </LargeTile>
        </Row>
      </Container>
      <Container>
        <h2 className="centerh2">
          <fbt desc="'featured exchanges' heading on exchanges page">
            Featured Exchanges
          </fbt>
        </h2>
        <FeaturedTiles tiles={featuredExchanges} md={4} />
      </Container>
      <Container>
        <h2 className="centerh2">
          <fbt desc="Buy page exchange list header">Exchanges</fbt>
        </h2>
        <Tiles tiles={exchanges} md={3} />
      </Container>
      <Container>
        <h2 className="centerh2">
          <fbt desc="Buy page microeconomy list header">Microeconomy</fbt>
        </h2>
        <Tiles tiles={microeconomy} md={3} />
      </Container>
    </>
  )
}

export default BuyPage
