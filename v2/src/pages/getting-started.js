import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Col } from "react-bootstrap"
// import Link from "global/link.js"
import S from "./getting-started.module.scss"
import Buy from "assets/images/hero.png"
import Fast from "assets/icons/getting-started/speedometer.svg"


const GettingStartedPage = () => {
  return (
    <>
      <SEO title="Getting Started" />
      <Container className={S.containerPadding}>
          <Row>
              <Col md={4} className={S.card}>
                 
                      <h3>Learn all about Bitcoin Cash</h3>
                      {/* <div className={S.iconRows}> */}
                      <Row className={S.cardIconRow}>
                            <Col xs={3} className={S.cardIcon}>
                                {Fast}
                            </Col>
                            <Col xs={9} className={S.cardIconText}>
                                <h4>Fast</h4>
                                <p>Transact in seconds. Get confirmed in minutes.</p>
                            </Col>
                        </Row>
                          {/* </div>
                          <div class="row type">
                              <div class="col-xs-3">
                                  <ion-icon name="cog"></ion-icon>
                              </div>
                              <div class="col-xs-9">
                                  <h4>Reliable</h4>
                                  <p>A network that runs without congestion.</p>
                              </div>
                          </div>
                          <div class="row type">
                              <div class="col-xs-3">
                                  <ion-icon name="arrow-down"></ion-icon>
                              </div>
                              <div class="col-xs-9">
                                  <h4>Low Fees</h4>
                                  <p>Send money globally for pennies.</p>
                              </div>
                          </div>
                          <div class="row type">
                              <div class="col-xs-3">
                                  <ion-icon name="ios-cafe"></ion-icon>
                              </div>
                              <div class="col-xs-9">
                                  <h4>Simple</h4>
                                  <p>Easy to use. No hassles.</p>
                              </div>
                          </div>
                          <div class="row type">
                              <div class="col-xs-3">
                                  <ion-icon name="business"></ion-icon>
                              </div>
                              <div class="col-xs-9">
                                  <h4>Stable</h4>
                                  <p>A payment system that's a proven store of value.</p>
                              </div>
                          </div>
                          <div class="row type">
                              <div class="col-xs-3">
                                  <ion-icon name="lock"></ion-icon>
                              </div>
                              <div class="col-xs-9">
                                  <h4>Secure</h4>
                                  <p>World's most robust blockchain technology.</p>
                              </div>
                          </div> */}
                     
              </Col>
              <Col md={8}>
                  <div class="card-user-profile text-left">
                      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OE3QTbgh-p8?rel=0" frameborder="0" allow="autoplay; encrypted-media"
                          allowfullscreen></iframe>
                      <div class="card-user-profile-content card-section">
                          <h3 class="card-user-profile-name">What is peer to peer electronic cash?</h3>
                          <h1 class="card-user-profile-status">Getting Started</h1>
                          <p class="card-user-profile-info">Peer to peer (P2P) electronic cash is simply described as online money sent from one person to another without the need for a trusted third-party. As described in the original Bitcoin whitepaper by Satoshi Nakamoto, P2P cash makes use of digital signatures as part of the solution, but the main benefits are lost if a trusted third party is still required to prevent fraud. This makes P2P cash a trustless and safe way to transact without the need of intermediaries.</p>
                      </div>
                      <div class="card-user-profile-actions">
                          <a href="faq.html" class="btn btn-primary btn-round">Learn More</a>
                      </div>
                  </div>
              
              </Col>
          </Row>
          <div class="row text-center">
              <a href="wallets.html" class="card-user-profile-button btn btn-secondary btn-round secondary">Download a wallet &raquo;</a>
          </div>
      </Container>
    </>
  )
}

export default GettingStartedPage


{/* <fbt desc="Getting Started Card 'Accept' content">
                    <p className={S.cardParagraph}>
                    As a merchant one of your main goals is to be able to accept and process payments as quickly and seamlessly as possible so you can make your customers happy and receive payments without any headaches. Bitcoin Cash is the solution, as it has fast and low-cost transactions. As the world goes digital, electronic currencies such as Bitcoin are becoming the go-to method for paying online and in retail shops. Easily accept Bitcoin Cash directly or use third-party providers to accept Bitcoin Cash using their platforms and convert all or part of the sale into local fiat currency.
                    </p>
                  </fbt>
                </div>

                <div className={S.cardButtonContainer}>
                  <PrimaryButton
                    noMarginLeft={true}
                    buttonText={fbt("View More", "'View More' button")}
                    href={"/accept-bitcoin-cash.html"}
                  />
                </div> */}