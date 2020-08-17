import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import footerStyles from "./footer.module.css"
import { EN_COPYRIGHT } from 'global/strings'
import Github from 'assets/icons/social/github.svg';
import Facebook from 'assets/icons/social/facebook.svg';
import Reddit from 'assets/icons/social/reddit.svg';
import Telegram from 'assets/icons/social/telegram.svg';
import Twitter from 'assets/icons/social/twitter.svg';
import Instagram from 'assets/icons/social/instagram.svg';
import Link from 'global/link';

const footerItems = [
    {text: "Get Listed", href:"/get-listed.html"},
    {text: "Privacy Policy", href: "/privacy-policy.html"},
    {text: "Legal", href:"/legal.html"},
]

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

  const theme = data.site.siteMetadata.themeColours;

  return (
    <footer className={footerStyles.footerContainer} style={{background: theme.primary_dark}}>
      <div />
      <div className={footerStyles.footerLinks}>
        {footerItems.map((footerLink, i) => <Link to={footerLink.href} key={i}>{footerLink.text}</Link>)}
      </div>
      <div className={footerStyles.lowerFooter}>
        <div className={footerStyles.socialBar}>
          <a className={footerStyles.socialIcon} href="https://twitter.com/bitcoincashorg"><Twitter></Twitter></a>
          <a className={footerStyles.socialIcon} href="https://t.me/BCHUpdates"><Telegram></Telegram></a>
          <a className={footerStyles.socialIcon} href="https://www.instagram.com/bitcoincashorg/"><Instagram></Instagram></a>
          <a className={footerStyles.socialIcon} href="https://www.facebook.com/bitcoincashorg/"><Facebook></Facebook></a>
          <a className={footerStyles.socialIcon} href="https://reddit.com/r/bitcoincash"><Reddit></Reddit></a>
          <a className={footerStyles.socialIcon} href="https://github.com/bitcoincashorg/bitcoincash.org"><Github></Github></a>
        </div>
        <div className={footerStyles.copyright}>{EN_COPYRIGHT}</div>
      </div>
    </footer>
  );
}

export default Footer
