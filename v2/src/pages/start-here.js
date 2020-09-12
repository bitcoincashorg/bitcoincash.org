import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Col } from "react-bootstrap"
import Link from "global/link.js"
import S from "./start-here.module.scss"
import PrimaryButton from "components/buttons/primary-button"
import GetStarted from "assets/images/get-started/getting-started.jpg"
import Store from "assets/images/get-started/bitcoin-cash-wallet.jpg"
import Buy from "assets/images/get-started/buy-bitcoin-cash.jpg"
import Spend from "assets/images/get-started/spend-bitcoin-cash.jpg"
import Accept from "assets/images/get-started/accept-bitcoin-cash.jpg"

const StartHerePage = () => {
  return (
    <>
      <SEO title={fbt("Start Here", "Start here page SEO title")} />
      <Container>
        <Row>
          <Col md={12}>
            <h1 className={S.headeralign}>
              <fbt desc="Getting Started Header">Getting Started</fbt>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={S.card}>
              <Link to="/getting-started/">
                <img
                  className={S.cardImg}
                  src={GetStarted}
                  alt="Getting Started Bitcoin Cash"
                />
              </Link>
              <div className={S.cardContent}>
                <p className={S.cardSubtitle}>
                  <fbt desc="Getting Started Card 'What is' subtitle">
                    What is peer to peer electronic cash?
                  </fbt>
                </p>

                <p className={S.cardTitle}>
                  1.{" "}
                  <fbt desc="Getting Started Card 'What is' title">
                    Getting Started
                  </fbt>
                </p>

                <p className={S.cardParagraph}>
                  <fbt desc="Getting Started Card 'What is' content">
                    Peer to peer (P2P) electronic cash is simply described as
                    online money sent from one person to another without the
                    need for a trusted third-party. As described in the original
                    Bitcoin whitepaper by Satoshi Nakamoto, P2P cash makes use
                    of digital signatures as part of the solution, but the main
                    benefits are lost if a trusted third party is still required
                    to prevent fraud. This makes P2P cash a trustless and safe
                    way to transact without the need of intermediaries.
                  </fbt>
                </p>
              </div>

              <div className={S.cardButtonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  buttonText={fbt(
                    "View More",
                    "'View More' button on start here page to see more content"
                  )}
                  href={"/getting-started/"}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={S.card}>
              <Link to="/wallets/">
                <img
                  className={S.cardImg}
                  src={Store}
                  alt="Bitcoin Cash wallet"
                />
              </Link>
              <div className={S.cardContent}>
                <p className={S.cardSubtitle}>
                  <fbt desc="Getting Started Card 'Wallets' subtitle">
                    Where do I store my Bitcoin Cash?
                  </fbt>
                </p>

                <p className={S.cardTitle}>
                  2.{" "}
                  <fbt desc="Getting Started Card 'Wallets' title">
                    Download a wallet
                  </fbt>
                </p>

                <p className={S.cardParagraph}>
                  <fbt desc="Getting Started Card 'Wallets' content">
                    Getting started with Bitcoin Cash is super easy. The first
                    step is to download a wallet so that you can begin
                    participating in the Bitcoin economy. Most wallets are free
                    to download and are easy to use that have a few key features
                    such as sending, receiving, storing funds securely,
                    transaction lookups, and more.
                  </fbt>
                </p>
              </div>

              <div className={S.cardButtonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  buttonText={fbt(
                    "View More",
                    "'View More' button on start here page to see more content"
                  )}
                  href={"/wallets/"}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className={S.card}>
              <Link to="/buy-bitcoin-cash/">
                <img className={S.cardImg} src={Buy} alt="Buy Bitcoin Cash" />
              </Link>
              <div className={S.cardContent}>
                <p className={S.cardSubtitle}>
                  <fbt desc="Getting Started Card 'Buy' subtitle">
                    How do I get Bitcoin Cash?
                  </fbt>
                </p>

                <p className={S.cardTitle}>
                  3.{" "}
                  <fbt desc="Getting Started Card 'Buy' title">
                    Buy or Earn Bitcoin Cash
                  </fbt>
                </p>

                <p className={S.cardParagraph}>
                  <fbt desc="Getting Started Card 'Buy' content">
                    The two easiest ways to get Bitcoin Cash is to buy or work
                    for it. Buying Bitcoin Cash is the most used and convenient
                    way, where all you have to do is sign up for a Bitcoin
                    exchange and deposit funds so you can convert it to Bitcoin
                    Cash. The exchange will send you Bitcoin Cash after the
                    trade has occurred.
                  </fbt>
                </p>
              </div>

              <div className={S.cardButtonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  buttonText={fbt(
                    "View More",
                    "'View More' button on start here page to see more content"
                  )}
                  href={"/buy-bitcoin-cash/"}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={S.card}>
              <Link to="/spend-bitcoin-cash/">
                <img
                  className={S.cardImg}
                  src={Spend}
                  alt="Spend Bitcoin Cash"
                />
              </Link>
              <div className={S.cardContent}>
                <p className={S.cardSubtitle}>
                  <fbt desc="Getting Started Card 'Spend' subtitle">
                    What can I buy with Bitcoin Cash?
                  </fbt>
                </p>

                <p className={S.cardTitle}>
                  4.{" "}
                  <fbt desc="Getting Started Card 'Spend' title">
                    Spend Bitcoin Cash
                  </fbt>
                </p>

                <p className={S.cardParagraph}>
                  <fbt desc="Getting Started Card 'Spend' content">
                    Bitcoin Cash isn’t just for speculation. It’s intended usage
                    is a peer to peer electronic currency, which means, it
                    should be spent. Spending Bitcoin Cash is fast, with
                    near-instant transactions and sub-cent transaction fees,
                    making it the most secure and widely used digital currency
                    on the planet.
                  </fbt>
                </p>
              </div>

              <div className={S.cardButtonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  buttonText={fbt(
                    "View More",
                    "'View More' button on start here page to see more content"
                  )}
                  href={"/spend-bitcoin-cash/"}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className={S.card}>
              <Link to="/accept-bitcoin-cash/">
                <img
                  className={S.cardImg}
                  src={Accept}
                  alt="Accept Bitcoin Cash"
                />
              </Link>
              <div className={S.cardContent}>
                <p className={S.cardSubtitle}>
                  <fbt desc="Getting Started Card 'Accept' subtitle">
                    How can my business use Bitcoin Cash?
                  </fbt>
                </p>

                <p className={S.cardTitle}>
                  5.{" "}
                  <fbt desc="Getting Started Card 'Accept' title">
                    Accept Bitcoin Cash
                  </fbt>
                </p>

                <p className={S.cardParagraph}>
                  <fbt desc="Getting Started Card 'Accept' content">
                    As a merchant one of your main goals is to be able to accept
                    and process payments as quickly and seamlessly as possible
                    so you can make your customers happy and receive payments
                    without any headaches. Bitcoin Cash is the solution, as it
                    has fast and low-cost transactions. As the world goes
                    digital, electronic currencies such as Bitcoin are becoming
                    the go-to method for paying online and in retail shops.
                    Easily accept Bitcoin Cash directly or use third-party
                    providers to accept Bitcoin Cash using their platforms and
                    convert all or part of the sale into local fiat currency.
                  </fbt>
                </p>
              </div>

              <div className={S.cardButtonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  buttonText={fbt(
                    "View More",
                    "'View More' button on start here page to see more content"
                  )}
                  href={"/accept-bitcoin-cash/"}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default StartHerePage
