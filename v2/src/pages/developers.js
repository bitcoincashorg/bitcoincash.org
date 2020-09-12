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
import Branch from "assets/icons/branch.svg"

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
              <h3>BitBox</h3>
              <p>
                <fbt desc="Developers page, BitBox description">
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
                href={"https://developer.bitcoin.com/bitbox/"}
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
          <Col md={4}>
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
                href={"/specs/"}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={S.card}>
              <div className={S.language}>
                <Wallet className={S.icons} />
              </div>
              <h3>Badger SDK</h3>
              <p>
                <fbt desc="Developers page, Badger SDK description">
                  Badger Wallet injects an API into pages a user visits to allow
                  apps to request a users's permission to send Bitcoin Cash,
                  send tokens, or authenticate with CashID.
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://developer.bitcoin.com/badger/"}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={S.card}>
              <div className={S.language}>
                <Branch className={S.icons} />
              </div>
              <h3>SLP SDK</h3>
              <p>
                <fbt desc="Developers page, SLP SDK description">
                  Simple Tokens - Secure Tokens on Bitcoin Cash
                </fbt>
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "View More",
                  "View more button on developers page"
                )}
                href={"https://developer.bitcoin.com/slp-indexer/"}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DevelopersPage
