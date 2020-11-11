import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Col } from "react-bootstrap"
import S from "./developers.module.scss"
import PrimaryButton from "components/buttons/primary-button"
import Python from "assets/icons/python-logo.svg"
import Javascript from "assets/icons/javascript-logo.svg"
import Check from "assets/icons/checkbox.svg"
import Wallet from "assets/icons/wallet.svg"
import Cog from "assets/icons/getting-started/cog.svg"
import Document from "assets/icons/wallets/paper-wallet.svg"

const DevelopersPage = () => {
  return (
    <>
      <SEO title={fbt("Developer Portal", "Developer page SEO title")} />
      <div className={S.topSection}>
        <Container className={S.topContainer}>
          <h1>
            <fbt desc="Developers page, main title">
              Create amazing apps with Bitcoin Cash
            </fbt>
          </h1>
          <br />
          <p>
            <fbt desc="Developers page, top paragraph">
              Resources for developers, by developers.
            </fbt>
          </p>
        </Container>
      </div>

      <Container className={S.titleContianer}>
        <h2>
          <fbt desc="Developers page, Libraries title">Libraries</fbt>
        </h2>
      </Container>
      <Container>
        <Row>
          <Col md={6}>
            <div className={S.card}>
              <div className={S.language}>
                <Python />
                <h4>Python</h4>
              </div>
              <h3>BitCash</h3>
              <p>
                <fbt desc="Developers page, BitCash description">
                  Python’s fastest Bitcoin Cash library. Intuitive and
                  effortless to use.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://github.com/pybitcash/bitcash"}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className={S.card}>
              <div className={S.language}>
                <Javascript />
                <h4>JavaScript</h4>
              </div>
              <h3>FullStack.cash</h3>
              <p>
                <fbt desc="Developers page, FullStack.cash description">
                  Fully featured, powerful javascript framework for Bitcoin
                  Cash.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://fullstack.cash"}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container className={S.titleContianer}>
        <h2>
          <fbt desc="Developers page, Resources title">Resources</fbt>
        </h2>
      </Container>
      <Container>
        <Row>
          <Col md={6} style={{ padding: "10px" }}>
            <div className={S.card}>
              <div className={S.language}>
                <Check className={S.icons} />
              </div>
              <h3>
                <fbt desc="Developers page, Specs title">Specs</fbt>
              </h3>
              <p>
                <fbt desc="Developers page, BitCash description">
                  Vocabulary and associated APIs for Bitcoin Cash
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"/specs.html"}
              />
            </div>
          </Col>

          <Col md={6} style={{ padding: "10px" }}>
            <div className={S.card}>
              <div className={S.language}>
                <Wallet className={S.icons} />
              </div>
              <h3>Web Wallet</h3>
              <p>
                <fbt desc="Developers page, web wallet description">
                  An open source web wallet to hack and white label for your own
                  application.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://wallet.fullstack.cash"}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6} style={{ padding: "10px" }}>
            <div className={S.card}>
              <div className={S.language}>
                <Cog className={S.icons} />
              </div>
              <h3>Example Code</h3>
              <p>
                <fbt desc="Developers page, SLP SDK description">
                  Get started quick with example code and walk-through videos
                  for working with Bitcoin Cash and SLP Tokens.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://fullstack.cash/examples"}
              />
            </div>
          </Col>

          <Col md={6} style={{ padding: "10px" }}>
            <div className={S.card}>
              <div className={S.language}>
                <Document className={S.icons} />
              </div>
              <h3>Documentation</h3>
              <p>
                <fbt desc="Developers page, SLP SDK description">
                  From basic conecepts to advanced topics, a range of
                  documentation and videos for developers interested in
                  programmable money.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://fullstack.cash/documentation"}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DevelopersPage
