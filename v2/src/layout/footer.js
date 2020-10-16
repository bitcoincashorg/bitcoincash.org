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
import NavItems, { communityDropdownLinks } from "./nav-items.js"

const Footer = () => {
  const navItems = NavItems()
  const communityLinks = communityDropdownLinks()
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
              {navItems.map(footerLink =>
                footerLink.footerCategory === "start-here" ? (
                  <Link to={footerLink.href}>{footerLink.text}</Link>
                ) : null
              )}
            </div>
          </Col>
          <Col md={3} xs={6}>
            <div className={S.footerLinkHeaders}>
              <fbt desc="community footer column header">Community</fbt>
            </div>
            <div className={S.footerLinks}>
              {communityLinks.map(footerLink => (
                <Link to={footerLink.href}>{footerLink.text}</Link>
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
              {navItems.map(footerLink =>
                footerLink.footerCategory === "about" ? (
                  <Link to={footerLink.href}>{footerLink.text}</Link>
                ) : null
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <div className={S.socialBar}>
          <a className={S.socialIcon} href="https://twitter.com/bitcoincashorg">
            <Twitter />
          </a>
          <a className={S.socialIcon} href="https://t.me/bitcoincashfork">
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
          <a className={S.socialIcon} href="https://www.reddit.com/r/bitcoin_cash/">
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
