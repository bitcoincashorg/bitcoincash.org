import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "components/sidebar/sidebar.js"
import S from "./getting-started.module.scss"
import Fast from "assets/icons/getting-started/speedometer.svg"
import Cog from "assets/icons/getting-started/cog.svg"

const GettingStartedPage = () => {
  const sideBarContent = [
    {
      title: fbt("Fast", "Getting started page learn column 'Fast' title"),
      paragraph: fbt(
        "Transact in seconds. Get confirmed in minutes.",
        "Getting started page learn column 'Fast' paragraph"
      ),
      icon: <Fast />,
    },
    {
      title: fbt(
        "Reliable",
        "Getting started page learn column 'Reliable' title"
      ),
      paragraph: fbt(
        "A network that runs without congestion.",
        "Getting started page learn column 'Reliable' paragraph"
      ),
      icon: <Cog />,
    },
    {
      title: fbt(
        "Low Fees",
        "Getting started page learn column 'low fees' title"
      ),
      paragraph: fbt(
        "Send money globally for pennies.",
        "Getting started page learn column 'Low fees' paragraph"
      ),
      icon: <Fast />,
    },
    {
      title: fbt("Simple", "Getting started page learn column 'simple' title"),
      paragraph: fbt(
        "Easy to use. No hassles.",
        "Getting started page learn column 'simple' paragraph"
      ),
      icon: <Fast />,
    },
    {
      title: fbt("Stable", "Getting started page learn column 'stable' title"),
      paragraph: fbt(
        "A payment system that's a proven store of value.",
        "Getting started page learn column 'stable' paragraph"
      ),
      icon: <Fast />,
    },
    {
      title: fbt("Secure", "Getting started page learn column 'secure' title"),
      paragraph: fbt(
        "World's most robust blockchain technology.",
        "Getting started page learn column 'secure' paragraph"
      ),
      icon: <Fast />,
    },
  ]

  return (
    <>
      <SEO title="Getting Started" />
      <Container className={S.containerPadding}>
        <Row>
          <Sidebar
            content={sideBarContent}
            title={fbt(
              "Learn all about Bitcoin Cash",
              "sidebar title 'getting started' page"
            )}
          />

          <Col md={8}>
            <div class="card-user-profile text-left">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/OE3QTbgh-p8?rel=0"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
              <div class="card-user-profile-content card-section">
                <h3 class="card-user-profile-name">
                  What is peer to peer electronic cash?
                </h3>
                <h1 class="card-user-profile-status">Getting Started</h1>
                <p class="card-user-profile-info">
                  Peer to peer (P2P) electronic cash is simply described as
                  online money sent from one person to another without the need
                  for a trusted third-party. As described in the original
                  Bitcoin whitepaper by Satoshi Nakamoto, P2P cash makes use of
                  digital signatures as part of the solution, but the main
                  benefits are lost if a trusted third party is still required
                  to prevent fraud. This makes P2P cash a trustless and safe way
                  to transact without the need of intermediaries.
                </p>
              </div>
              <div class="card-user-profile-actions">
                <a href="faq.html" class="btn btn-primary btn-round">
                  Learn More
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <div class="row text-center">
          <a
            href="wallets.html"
            class="card-user-profile-button btn btn-secondary btn-round secondary"
          >
            Download a wallet &raquo;
          </a>
        </div>
      </Container>
    </>
  )
}

export default GettingStartedPage
