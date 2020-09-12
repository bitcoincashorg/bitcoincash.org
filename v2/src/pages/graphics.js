import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Nav, Col } from "react-bootstrap"
import S from "./graphics.module.scss"
import GraphicsTile from "components/graphics-tile/graphics-tile.js"
import PrimaryButton from "components/buttons/primary-button"
import Link from "global/link.js"
import Logo from "assets/images/logos/bitcoin-cash-logo.jpg"
import LogoWhite from "assets/images/logos/bitcoin-cash-logo-white.jpg"
import LogoFlag from "assets/images/logos/bitcoin-cash-logo-flag.jpg"
import LogoHz from "assets/images/logos/bitcoin-cash-logo-hz.jpg"
import LogoHzWhite from "assets/images/logos/bitcoin-cash-logo-hz-white.jpg"
import LogoSquare from "assets/images/logos/bitcoin-cash-logo-square.jpg"
import AcceptedHere from "assets/images/logos/bitcoin-cash-accepted-here.jpg"
import AcceptedHereOrange from "assets/images/logos/bitcoin-cash-logo-accepted-here-orange.jpg"
import Donations from "assets/images/logos/bitcoin-cash-logo-donations-accepted.jpg"
import DonationsOrange from "assets/images/logos/bitcoin-cash-logo-donations-accepted-orange.jpg"
import DownloadIcon from "assets/icons/download.svg"

const GraphicsPage = () => {
  return (
    <>
      <SEO title={fbt("Logos and Graphics", "Graphics page SEO title")} />
      <div className={S.topSection}>
        <Container className={S.topContainer}>
          <h1>
            <fbt desc="Graphics page, main title">Promotional Graphics</fbt>
          </h1>
          <p>
            <fbt desc="Graphics page, top paragraph">
              These Bitcoin Cash logos and brand assets can be used for display
              in online services, retail establishments, press or other
              promotional purposes.
            </fbt>
          </p>
        </Container>
      </div>
      <div className={S.topSectionBar}>
        <Container className={S.topContainer}>
          <Nav className={S.topNav}>
            <Nav.Item>
              <Nav.Link href="#logos">
                <fbt desc="Graphics page, 'Logos' link">Logos</fbt>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#merchants">
                <fbt desc="Graphics page, 'Logos' link">Merchant</fbt>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#donations">
                <fbt desc="Graphics page, 'Logos' link">Donations</fbt>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#identity">
                <fbt desc="Graphics page, 'Logos' link">Identity</fbt>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      <Container className={S.titleContianer} id="logos">
        <h2>
          <fbt desc="Graphics page, merchant buttons title">Logos</fbt>
        </h2>
        <p>
          <fbt desc="Graphics page, merchant buttons description">
            Download Bitcoin Cash logos in PNG and SVG
          </fbt>
        </p>
        <Link href="/images/media-kit/Bitcoin-Cash-Logos.zip">
          <DownloadIcon />
          <fbt desc="Graphics page, merchant buttons description">
            Download All
          </fbt>
        </Link>
      </Container>
      <Container>
        <Row>
          <GraphicsTile
            title={fbt("BCH Logo Primary", "graphics page primary logo title")}
            lg={4}
            img={Logo}
            smallImg="/images/media-kit/3-bitcoin-cash-logo-ot-small.png"
            mediumImg="/images/media-kit/3-bitcoin-cash-logo-ot-medium.png"
            largeImg="/images/media-kit/3-bitcoin-cash-logo-ot-large.png"
            fullImg="/images/media-kit/3-bitcoin-cash-logo-ot-full.png"
            vectorImg="/images/media-kit/3-bitcoin-cash-logo-ot.svg"
          />
          <GraphicsTile
            title={fbt(
              "BCH Logo White Text",
              "graphics page white text logo title"
            )}
            lg={4}
            img={LogoWhite}
            smallImg="/images/media-kit/2-bitcoin-cash-logo-wt-small.png"
            mediumImg="/images/media-kit/2-bitcoin-cash-logo-wt-medium.png"
            largeImg="/images/media-kit/2-bitcoin-cash-logo-wt-large.png"
            fullImg="/images/media-kit/2-bitcoin-cash-logo-wt-full.png"
            vectorImg="/images/media-kit/2-bitcoin-cash-logo-wt.svg"
          />
          <GraphicsTile
            title={fbt("BCH Logo Mark", "graphics page logo mark title")}
            lg={4}
            img={LogoFlag}
            smallImg="/images/media-kit/4-bitcoin-cash-logo-flag-small.png"
            mediumImg="/images/media-kit/4-bitcoin-cash-logo-flag-medium.png"
            largeImg="/images/media-kit/4-bitcoin-cash-logo-flag-large.png"
            fullImg="/images/media-kit/4-bitcoin-cash-logo-flag-full.png"
            vectorImg="/images/media-kit/4-bitcoin-cash-logo-flag.svg"
          />
          <GraphicsTile
            title={fbt(
              "BCH Logo Horizontal Primary",
              "graphics page horizontal primary logo title"
            )}
            lg={4}
            img={LogoHz}
            smallImg="/images/media-kit/6-bitcoin-cash-logo-horizontal-small.png"
            mediumImg="/images/media-kit/6-bitcoin-cash-logo-horizontal-medium.png"
            largeImg="/images/media-kit/6-bitcoin-cash-logo-horizontal-large.png"
            fullImg="/images/media-kit/6-bitcoin-cash-logo-horizontal-full.png"
            vectorImg="/images/media-kit/6-bitcoin-cash-logo-horizontal.svg"
          />
          <GraphicsTile
            title={fbt(
              "BCH Logo Horizontal White",
              "graphics page horizontal white logo title"
            )}
            lg={4}
            img={LogoHzWhite}
            smallImg="/images/media-kit/5-bitcoin-cash-logo-horizontal-wt-small.png"
            mediumImg="/images/media-kit/5-bitcoin-cash-logo-horizontal-wt-medium.png"
            largeImg="/images/media-kit/5-bitcoin-cash-logo-horizontal-wt-large.png"
            fullImg="/images/media-kit/5-bitcoin-cash-logo-horizontal-wt-full.png"
            vectorImg="/images/media-kit/5-bitcoin-cash-logo-horizontal-wt.svg"
          />
          <GraphicsTile
            title={fbt(
              "BCH Logo For Wallets / Exchanges",
              "graphics page horizontal white logo title"
            )}
            lg={4}
            img={LogoSquare}
            smallImg="/images/media-kit/12-bitcoin-cash-square-crop-small.png"
            mediumImg="/images/media-kit/12-bitcoin-cash-square-crop-medium.png"
            largeImg="/images/media-kit/12-bitcoin-cash-square-crop-large.png"
            fullImg="/images/media-kit/12-bitcoin-cash-square-crop-full.png"
            vectorImg="/images/media-kit/12-bitcoin-cash-square-crop.svg"
          />
        </Row>
      </Container>
      <Container className={S.titleContianer} id="merchants">
        <h2>
          <fbt desc="Graphics page, merchant buttons title">
            Merchant Buttons
          </fbt>
        </h2>
        <p>
          <fbt desc="Graphics page, merchant buttons description">
            Show your customers that you accept Bitcoin Cash
          </fbt>
        </p>
      </Container>
      <Container>
        <Row>
          <GraphicsTile
            title={fbt(
              "Bitcoin Cash Accepted Here Primary",
              "graphics page BCH accepted here primary logo title"
            )}
            lg={6}
            img={AcceptedHere}
            smallImg="/images/media-kit/7-bitcoin-cash-accepted-here-small.png"
            mediumImg="/images/media-kit/7-bitcoin-cash-accepted-here-medium.png"
            largeImg="/images/media-kit/7-bitcoin-cash-accepted-here-large.png"
            fullImg="/images/media-kit/7-bitcoin-cash-accepted-here-full.png"
            vectorImg="/images/media-kit/7-bitcoin-cash-accepted-here.svg"
          />
          <GraphicsTile
            title={fbt(
              "Bitcoin Cash Accepted Here Primary",
              "graphics page BCH accepted here primary logo title"
            )}
            lg={6}
            img={AcceptedHereOrange}
            smallImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-small.png"
            mediumImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-medium.png"
            largeImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-large.png"
            fullImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-full.png"
            vectorImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange.svg"
          />
        </Row>
      </Container>

      <Container className={S.titleContianer} id="donations">
        <h2>
          <fbt desc="Graphics page, donation buttons title">
            Donation Buttons
          </fbt>
        </h2>
        <p>
          <fbt desc="Graphics page, donations buttons description">
            Promote the acceptance of Bitcoin Cash as a donation method.
          </fbt>
        </p>
      </Container>
      <Container>
        <Row>
          <GraphicsTile
            title={fbt(
              "Bitcoin Cash Donations Accepted Primary",
              "graphics page BCH donations primary logo title"
            )}
            lg={6}
            img={Donations}
            smallImg="/images/media-kit/10-bitcoin-cash-donations-small.png"
            mediumImg="/images/media-kit/10-bitcoin-cash-donations-medium.png"
            largeImg="/images/media-kit/10-bitcoin-cash-donations-large.png"
            fullImg="/images/media-kit/10-bitcoin-cash-donations-full.png"
            vectorImg="/images/media-kit/10-bitcoin-cash-donations.svg"
          />
          <GraphicsTile
            title={fbt(
              "Bitcoin Cash Donations Accepted Orange",
              "graphics page BCH donations orange logo title"
            )}
            lg={6}
            img={DonationsOrange}
            smallImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-small.png"
            mediumImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-medium.png"
            largeImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-large.png"
            fullImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange-full.png"
            vectorImg="/images/media-kit/8-bitcoin-cash-accepted-here-orange.svg"
          />
        </Row>
      </Container>

      <Container className={S.titleContianer} id="identity">
        <h2>
          <fbt desc="Graphics page, visual identity title">Visual Identity</fbt>
        </h2>
        <p>
          <fbt desc="Graphics page, visual identity description">
            Bitcoin Cash fonts, colors, and more.
          </fbt>
        </p>
      </Container>

      <Container>
        <Row>
          <Col md={6} className={S.visualIDCtn}>
            <div className={S.visualID}>
              <h3>Ubuntu Bold</h3>
              <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?!%</p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "Download Font",
                  "Download font button on graphics page"
                )}
                href={
                  "https://fonts.google.com/specimen/Ubuntu?selection.family=Ubuntu:700"
                }
              />
            </div>
            <div className={S.visualID}>
              <h3 style={{ fontStyle: "italic" }}>Ubuntu Bold Italic</h3>
              <p style={{ fontStyle: "italic" }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?!%
              </p>
              <PrimaryButton
                noMarginLeft={true}
                buttonText={fbt(
                  "Download Font",
                  "Download font button on graphics page"
                )}
                href={
                  "https://fonts.google.com/specimen/Ubuntu?selection.family=Ubuntu:700i"
                }
              />
            </div>
          </Col>
          <Col md={6} className={S.colorctnpadding}>
            <Row>
              <Col xs={4} className={S.colorctn}>
                <span
                  className={S.boxcolor}
                  style={{ background: "#F59332" }}
                />
              </Col>
              <Col xs={8} className={S.colorinfoctn}>
                <h4>
                  <fbt desc="Graphics page, visual identity color description orange">
                    Bitcoin Cash Orange
                  </fbt>
                </h4>
                <p>
                  Hex: #F59332
                  <br />
                  RGB: 247 / 148 / 29
                  <br />
                  CMYK: 0 / 50 / 100 / 0<br />
                  Pantone: 1375C
                </p>
              </Col>
            </Row>
            <Row className={S.rowpadding}>
              <Col xs={4} className={S.colorctn}>
                <span
                  className={S.boxcolor}
                  style={{ background: "#4D4D4D" }}
                />
              </Col>
              <Col xs={8} className={S.colorinfoctn}>
                <h4>
                  <fbt desc="Graphics page, visual identity color description grey">
                    Bitcoin Cash Grey
                  </fbt>
                </h4>
                <p>
                  Hex: #4D4D4D
                  <br />
                  RGB: 77 / 77 / 77
                  <br />
                  CMYK: 65 / 58 / 57 / 37
                  <br />
                  Pantone: 11C
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={4} className={S.colorctn}>
                <span
                  className={S.boxcolor}
                  style={{ background: "#fff", border: "1px solid #444" }}
                />
              </Col>
              <Col xs={8} className={S.colorinfoctn}>
                <h4>
                  <fbt desc="Graphics page, visual identity color description white">
                    Bitcoin Cash White
                  </fbt>
                </h4>
                <p>
                  Hex: #FFFFFF
                  <br />
                  RGB: 255 / 255 / 255
                  <br />
                  CMYK: 0 / 0 / 0 / 0<br />
                  Pantone: paper
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GraphicsPage
