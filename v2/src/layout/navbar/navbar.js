import React, { useState } from "react"
import S from "./navbar.module.scss"
import Dropdown from "./dropdown"
import Link from "global/link"
import fbt from "fbt"
import World from "assets/icons/world.svg"
import locales from "i18n/locales"

const NavBar = () => {

  const languageDropdownLinks = Object.entries(locales).map(([_, locale]) => {
    let link = "/"
    if (locale.slug) {
      link += locale.slug + "/"
    }
  
    return { text: locale.displayName, href: link, localize: false }
  })

  const communityDropdownLinks = [
    {
      text: fbt("Services", "Community menu 'services' link"),
      href: "/services/",
    },
    {
      text: fbt("Projects", "Community menu 'projects' link"),
      href: "/projects/",
    },
    {
      text: fbt("Exchanges", "Community menu 'exchanges' link"),
      href: "/exchanges/",
    },
    {
      text: fbt("Nodes", "Community menu 'nodes' link"),
      href: "/nodes/",
    },
    {
      text: fbt("Developer Portal", "Community menu 'developper portal' link"),
      href: "/developers/",
    },
    {
      text: fbt("Logos", "Community menu 'logos' link"),
      href: "/graphics/",
    },
    {
      text: fbt("Whitepaper", "Community menu 'whitepaper' link"),
      href: "/bitcoin.pdf",
      localize: false,
    },
    {
      text: fbt("Roadmap", "Community menu 'roadmap' link"),
      href: "/roadmap/",
    },
  ]

  const navBarItems = [
    {
      text: fbt("Start Here", "Top 'Start here' link"),
      href: "/start-here/",
    },
    {
      text: fbt("Wallets", "Top 'wallets' link"),
      href: "/wallets/",
    },
    {
      text: fbt("Explorer", "Link to the block explorer"),
      href: "https://explorer.bitcoincash.org/",
    },
    {
      text: fbt("Community", "Commnity menu"),
      links: communityDropdownLinks,
    },
    { text: fbt("About", "Top 'about' link"), href: "/faq/" },
    {
      text: (
        <>
          <World />
          <span style={{ paddingLeft: "5px" }}>
            <fbt desc="Language selector menu">Language</fbt>
          </span>
        </>
      ),
      links: languageDropdownLinks,
    },
  ]

  const [mobile, openMobile] = useState(false)

  return (
  <>
    <div className={S.headerLinks}>
      {navBarItems.map((headerLink, index) =>
        headerLink.href ? (
          <Link
            data-sal="slide-down"
            data-sal-delay={100 + index * 100}
            data-sal-duration="1000"
            data-sal-easing="ease"
            className={S.link}
            key={index}
            to={headerLink.href}
          >
            {headerLink.text}
          </Link>
        ) : (
          <Dropdown links={headerLink.links} index={index} key={index}>
            {headerLink.text}
          </Dropdown>
        )
      )}
    </div>

    <div className={S.mobileHeaderLinks}>
        <div
          className={`hamburger hamburger--squeeze ${
            mobile ? "is-active" : ""
          }`}
          onClick={() => openMobile(!mobile)}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner" />
          </div>
        </div>
      </div>
      <div
        className={S.mobileMenu}
        style={
          mobile
            ? {
                height: "calc(100vh - 100px)"
              }
            : null
        }
      >
        {mobile && (
          <div className={S.mobileNavLinks}>
            {navBarItems.map((headerLink, index) =>
              headerLink.href ? (
                <Link
                  className={S.mobileNavLink}
                  key={index}
                  to={headerLink.href}
                  onClick={() => openMobile(!mobile)}
                >
                  {headerLink.text}
                </Link>
              ) : (
                <MobileDropdown
                  links={headerLink.links}
                  key={index}
                  navLinkClass={S.mobileNavLink}
                >
                  {headerLink.text}
                </MobileDropdown>
              )
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default NavBar
