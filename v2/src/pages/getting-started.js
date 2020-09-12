import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row } from "react-bootstrap"
import Sidebar from "components/sidebar/sidebar.js"
import LargeTile from "components/large-tile/large-tile.js"
import Fast from "assets/icons/getting-started/speedometer.svg"
import Cog from "assets/icons/getting-started/cog.svg"
import Arrow from "assets/icons/getting-started/arrow-down.svg"
import Simple from "assets/icons/getting-started/cafe.svg"
import Stable from "assets/icons/getting-started/business.svg"
import Secure from "assets/icons/getting-started/lock.svg"

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
      icon: <Arrow />,
    },
    {
      title: fbt("Simple", "Getting started page learn column 'simple' title"),
      paragraph: fbt(
        "Easy to use. No hassles.",
        "Getting started page learn column 'simple' paragraph"
      ),
      icon: <Simple />,
    },
    {
      title: fbt("Stable", "Getting started page learn column 'stable' title"),
      paragraph: fbt(
        "A payment system that's a proven store of value.",
        "Getting started page learn column 'stable' paragraph"
      ),
      icon: <Stable />,
    },
    {
      title: fbt("Secure", "Getting started page learn column 'secure' title"),
      paragraph: fbt(
        "World's most robust blockchain technology.",
        "Getting started page learn column 'secure' paragraph"
      ),
      icon: <Secure />,
    },
  ]

  const largeTileContent = [
    {
      subtitle: fbt(
        "What is peer to peer electronic cash?",
        "Getting started page subtitle"
      ),
      title: fbt("Getting Started", "Getting started page title"),
      paragraph: (
        <fbt desc="Getting started page main paragraph">
          Peer to peer (P2P) electronic cash is simply described as online money
          sent from one person to another without the need for a trusted
          third-party. As described in the original Bitcoin whitepaper by
          Satoshi Nakamoto, P2P cash makes use of digital signatures as part of
          the solution, but the main benefits are lost if a trusted third party
          is still required to prevent fraud. This makes P2P cash a trustless
          and safe way to transact without the need of intermediaries.
        </fbt>
      ),
    },
  ]

  return (
    <>
      <SEO title={fbt("Getting Started", "Getting Started page SEO title")} />
      <Container>
        <Row>
          <Sidebar
            content={sideBarContent}
            title={fbt(
              "Learn all about Bitcoin Cash",
              "sidebar title 'getting started' page"
            )}
          />
          <LargeTile
            content={largeTileContent}
            buttontext={fbt("Learn more", "learn more button")}
            href={"/faq/"}
          >
            <iframe
              src="https://www.youtube-nocookie.com/embed/OE3QTbgh-p8?rel=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="What is Bitcoin Cash"
            />
          </LargeTile>
        </Row>
      </Container>
    </>
  )
}

export default GettingStartedPage
