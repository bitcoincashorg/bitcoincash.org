import React, { useState, useEffect } from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"
import Dropdown, { MobileDropdown } from "components/dropdownButtons/dropdown"
import axios from "axios"
import World from "assets/icons/world.svg"
import "assets/lib/hamburgers.min.css"
import LivePriceWidget from "../liveprice/live-price-widget"
import Link from "global/link"

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
if (typeof window !== "undefined") {
  var prevScrollpos = window.pageYOffset
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    if (currentScrollPos <= 1000) {
      return
    }
    if (prevScrollpos > currentScrollPos) {
      let navBar = document.getElementById("navbar")
      if (navBar) {
        navBar.style.top = "0"
      }
    } else {
      let navBar = document.getElementById("navbar")
      if (navBar) {
        navBar.style.top = "-100px"
      }
    }
    prevScrollpos = currentScrollPos
  }
}

const externalLink = (i, linkText, href) => {
  return (
    <Link
      data-sal="slide-down"
      data-sal-delay={100 + i * 100}
      data-sal-duration="1000"
      data-sal-easing="ease"
      className={headerStyles.link}
      key={i}
      to={href}
    >
      {linkText}
    </Link>
  )
}

const MobileHeaderLink = ({ children, href, id }) => {
  return (
    <Link className={headerStyles.mobileNavLink} key={id} to={href}>
      {children}
    </Link>
  )
}

const communityDropdownLinks = [
  { text: "Services", href: "/services.html" },
  { text: "Projects", href: "/projects.html" },
  { text: "Exchanges", href: "/exchanges.html" },
  { text: "Nodes", href: "/nodes.html" },
  { text: "Logos", href: "/graphics.html" },
  { text: "Developer Portal", href: "/developers.html" },
  { text: "Whitepaper", href: "/bitcoin.pdf" },
]

const languageDropdownLinks = [
  { text: "English", href: "/" },
  { text: "Deutsch Deutschland", href: "/de/" },
  { text: "Español", href: "/es/" },
  { text: "Français", href: "/fr/" },
  { text: "日本語", href: "/ja/" },
  { text: "Nederlands", href: "/nl/" },
  { text: "Русский", href: "/ru/" },
  { text: "简体中文", href: "/zh-CN/" },
  { text: "Español Latin América", href: "/es_419/" },
  { text: "Bahasa Indonesia", href: "/id/" },
  { text: "한국어", href: "/ko/" },
  { text: "Português Brasil", href: "/pt-BR/" },
  { text: "Türkçe", href: "/tr/" },
  { text: "繁體中文", href: "/zh-TW/" },
]

const languageDropdown = (
  <>
    <World />
    <span style={{ paddingLeft: "5px" }}>Language</span>
  </>
)

const navBarItems = [
  { text: "Get started", href: "/start-here.html" },
  { text: "Wallets", href: "/wallets.html" },
  { text: "Explorer", href: "https://explorer.bitcoincash.org/" },
  { text: "Community", links: communityDropdownLinks },
  { text: "About", href: "/faq.html" },
  { text: languageDropdown, links: languageDropdownLinks },
]

const Header = () => {
  const bchPriceApi =
    "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD"
  const [isActive, setIsActive] = useState(false)
  const [currentUSDPrice, setCurrentUSDPrice] = useState("-")
  const updateBchPrice = () => {
    axios.get(bchPriceApi).then(response => {
      if (response.data && response.data.USD) {
        setCurrentUSDPrice(response.data.USD)
      }
    })
  }

  useEffect(() => {
    updateBchPrice()
    const interval = setInterval(() => {
      updateBchPrice()
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const data = useStaticQuery(graphql`
    query SiteThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
            primary_light
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours

  return (
    <>
      <header
        id={isActive ? "navbar-mobile" : "navbar"}
        style={{
          background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`,
        }}
      >
        <div className={headerStyles.headerBar}>
          <div className={headerStyles.headerStart}>
            <img
              src={logo}
              className={headerStyles.logo}
              alt="bitcoincashlogo"
            />
            <LivePriceWidget
              currentPrice={"$" + currentUSDPrice}
              ticker={"USD"}
              url={"/buy-bitcoin-cash.html"}
            />
          </div>

          <div className={`${headerStyles.headerLinks} topBotomBordersOut`}>
            {navBarItems.map((headerLink, index) =>
              headerLink.href ? (
                externalLink(index, headerLink.text, headerLink.href)
              ) : (
                <Dropdown links={headerLink.links} index={index} key={index}>
                  {headerLink.text}
                </Dropdown>
              )
            )}
          </div>

          <div className={headerStyles.mobileHeaderLinks}>
            <div
              className={`hamburger hamburger--squeeze ${
                isActive ? "is-active" : ""
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </div>
          <div
            className={headerStyles.mobileMenu}
            style={
              isActive
                ? {
                    height: "calc(100vh - 100px)",
                    backgroundColor: theme.primary_dark,
                  }
                : null
            }
          >
            {isActive && (
              <div className={headerStyles.mobileNavLinks}>
                {navBarItems.map((headerLink, index) =>
                  headerLink.href ? (
                    <MobileHeaderLink
                      href={headerLink.href}
                      key={headerLink.text}
                      id={headerLink.index}
                    >
                      {headerLink.text}
                    </MobileHeaderLink>
                  ) : (
                    <MobileDropdown
                      links={headerLink.links}
                      key={index}
                      navLinkClass={headerStyles.mobileNavLink}
                    >
                      {headerLink.text}
                    </MobileDropdown>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
