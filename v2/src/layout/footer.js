import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import fbt from "fbt"
import S from "./footer.module.scss"
import Logo from "assets/images/bitcoin-cash-logo-white-small.png"
import Github from "assets/icons/social/github.svg"
import Facebook from "assets/icons/social/facebook.svg"
import Reddit from "assets/icons/social/reddit.svg"
import Telegram from "assets/icons/social/telegram.svg"
import Twitter from "assets/icons/social/twitter.svg"
import Instagram from "assets/icons/social/instagram.svg"
import Link from "global/link"

const Footer = () => {
  const getstartedPages = [
    {
      text: <fbt desc="Getting started page footer title">Getting Started</fbt>,
      href: "/getting-started/",
    },
    {
      text: <fbt desc="Wallet page footer title">Wallets</fbt>,
      href: "/wallets/",
    },
    {
      text: <fbt desc="Buy page footer title">Buy Bitcoin Cash</fbt>,
      href: "/buy-bitcoin-cash/",
    },
    {
      text: <fbt desc="Spend page footer title">Spend Bitcoin Cash</fbt>,
      href: "/spend-bitcoin-cash/",
    },
    {
      text: <fbt desc="accept page footer title">Accept Bitcoin Cash</fbt>,
      href: "/accept-bitcoin-cash/",
    },
  ]

  const communityPages = [
    {
      text: <fbt desc="serices page title">Services</fbt>,
      href: "/services/",
    },
    {
      text: <fbt desc="projects page title">Projects</fbt>,
      href: "/projects",
    },
    {
      text: <fbt desc="exchanges page title">Exchanges</fbt>,
      href: "/exchanges/",
    },
    {
      text: <fbt desc="nodes page title">Nodes</fbt>,
      href: "/nodes/",
    },
    {
      text: <fbt desc="developers page title">Developers</fbt>,
      href: "/developers/",
    },
    {
      text: <fbt desc="graphics page title">Graphics</fbt>,
      href: "/graphics/",
    },
    {
      text: <fbt desc="whitepaper page title">Whitepaper</fbt>,
      href: "/bitcoin.pdf",
    },
    {
      text: <fbt desc="roadmap page title">Roadmap</fbt>,
      href: "/roadmap/",
    },
  ]

  const aboutPages = [
    {
      text: <fbt desc="faq page title">FAQ</fbt>,
      href: "/faq/",
    },
    {
      text: <fbt desc="footer link to get listed">Get Listed</fbt>,
      href: "/get-listed.html",
    },
    {
      text: <fbt desc="footer link to the privacy policy">Privacy Policy</fbt>,
      href: "/privacy-policy.html",
    },
    {
      text: <fbt desc="footer link to legalese">Legal</fbt>,
      href: "/legal.html",
    },
    {
      text: <fbt desc="footer link to help page">Help</fbt>,
      href: "https://help.bitcoincash.org/support/home",
    },
  ]

  return (
    <footer className={S.footerContainer}>
      <Container>
        <Row>
          <Col md={3} sm={12}>
            <div>
              <img
                src={Logo}
                className={S.footerLogo}
                alt="Bitcoin Cash Logo"
              />
              <div className={S.copyright}>
                <fbt desc="Copyright footer">
                  &#169;
                  <fbt:param name="current year">
                    {new Date().getFullYear()}
                  </fbt:param>, All Rights Reserved
                </fbt>
                <br />
                Bitcoincash.org
              </div>
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={S.footerLinkHeaders}>
              <fbt desc="start here footer column header">Start Here</fbt>
            </div>
            <div className={S.footerLinks}>
              {getstartedPages.map((footerLink, i) => (
                <Link to={footerLink.href} key={i}>
                  {footerLink.text}
                </Link>
              ))}
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={S.footerLinkHeaders}>
              <fbt desc="community footer column header">Community</fbt>
            </div>
            <div className={S.footerLinks}>
              {communityPages.map((footerLink, i) => (
                <Link to={footerLink.href} key={i}>
                  {footerLink.text}
                </Link>
              ))}
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div
              className={`${S.footerLinkHeaders} ${S.footerLinkHeaderMargin}`}
            >
              <fbt desc="about footer column header">About</fbt>
            </div>
            <div className={S.footerLinks}>
              {aboutPages.map((footerLink, i) => (
                <Link to={footerLink.href} key={i}>
                  {footerLink.text}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <div className={S.socialBar}>
          <a className={S.socialIcon} href="https://twitter.com/bitcoincashorg">
            <Twitter />
          </a>
          <a className={S.socialIcon} href="https://t.me/BCHUpdates">
            <Telegram />
          </a>
          <a
            className={S.socialIcon}
            href="https://www.instagram.com/bitcoincashorg/"
          >
            <Instagram />
          </a>
          <a
            className={S.socialIcon}
            href="https://www.facebook.com/bitcoincashorg/"
          >
            <Facebook />
          </a>
          <a className={S.socialIcon} href="https://reddit.com/r/bitcoincash">
            <Reddit />
          </a>
          <a
            className={S.socialIcon}
            href="https://github.com/bitcoincashorg/bitcoincash.org"
          >
            <Github />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
