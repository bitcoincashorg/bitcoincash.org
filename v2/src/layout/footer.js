import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import fbt from "fbt"
import footerStyles from "./footer.module.scss"
import Github from "assets/icons/social/github.svg"
import Facebook from "assets/icons/social/facebook.svg"
import Reddit from "assets/icons/social/reddit.svg"
import Telegram from "assets/icons/social/telegram.svg"
import Twitter from "assets/icons/social/twitter.svg"
import Instagram from "assets/icons/social/instagram.svg"
import Link from "global/link"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours

  const footerItems = [
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
  ]

  return (
    <footer
      className={footerStyles.footerContainer}
      style={{ background: theme.primary_dark }}
    >
      <div />
      <div className={footerStyles.footerLinks}>
        {footerItems.map((footerLink, i) => (
          <Link to={footerLink.href} key={i}>
            {footerLink.text}
          </Link>
        ))}
      </div>
      <div className={footerStyles.lowerFooter}>
        <div className={footerStyles.socialBar}>
          <a
            className={footerStyles.socialIcon}
            href="https://twitter.com/bitcoincashorg"
          >
            <Twitter />
          </a>
          <a className={footerStyles.socialIcon} href="https://t.me/BCHUpdates">
            <Telegram />
          </a>
          <a
            className={footerStyles.socialIcon}
            href="https://www.instagram.com/bitcoincashorg/"
          >
            <Instagram />
          </a>
          <a
            className={footerStyles.socialIcon}
            href="https://www.facebook.com/bitcoincashorg/"
          >
            <Facebook />
          </a>
          <a
            className={footerStyles.socialIcon}
            href="https://reddit.com/r/bitcoincash"
          >
            <Reddit />
          </a>
          <a
            className={footerStyles.socialIcon}
            href="https://github.com/bitcoincashorg/bitcoincash.org"
          >
            <Github />
          </a>
        </div>
        <div className={footerStyles.copyright}>
          <fbt desc="Copyright footer">
            &#169;
            <fbt:param name="current year">
              {new Date().getFullYear()}
            </fbt:param>, All Rights Reserved
          </fbt>
        </div>
      </div>
    </footer>
  )
}

export default Footer
