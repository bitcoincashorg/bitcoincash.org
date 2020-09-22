import React, { useState } from "react"
import S from "./navbar.module.scss"
import Link from "global/link"
import fbt from "fbt"
import World from "assets/icons/world.svg"
import Dropdown from "components/dropdownButtons/dropdown"
import "assets/lib/hamburgers.min.css"
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

  const [open, openMobileMenu] = useState(false)

  const MobileDropdown = ({ children, links, navLinkClass }) => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div onClick={() => setExpanded(!expanded)}>
        <div className={navLinkClass}>{children}</div>
        {expanded && (
          <div>
            {links.map(dropdownLink => (
              <Link
                className={S.mobileNavLinkLanguage}
                key={dropdownLink.text}
                to={dropdownLink.href}
                localize={dropdownLink.localize}
                onClick={() => openMobileMenu(!open)}
              >
                {dropdownLink.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

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
            open ? "is-active" : ""
          }`}
          onClick={() => openMobileMenu(!open)}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner" />
          </div>
        </div>
      </div>
      <div
        data-sal="slide-down"
        data-sal-duration="1000"
        data-sal-easing="ease"
        className={S.mobileMenu}
        style={
          open
            ? {
                height: "auto",
              }
            : null
        }
      >
        {open && (
          <div className={S.mobileNavLinks}>
            {navBarItems.map((headerLink, index) =>
              headerLink.href ? (
                <Link
                  className={S.mobileNavLink}
                  key={index}
                  to={headerLink.href}
                  onClick={() => openMobileMenu(!open)}
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
