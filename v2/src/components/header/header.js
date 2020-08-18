import React, { useState, useEffect } from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"
import Dropdown, { MobileDropdown } from "components/dropdownButtons/dropdown"
import axios from "axios"
import fbt from "fbt"
import World from "assets/icons/world.svg"
import "assets/lib/hamburgers.min.css"
import LivePriceWidget from "../liveprice/live-price-widget"
import Link from "global/link"
import locales from "i18n/locales"

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

const languageDropdownLinks = Object.entries(locales).map(([_, locale]) => {
  let link = "/"
  if (locale.slug) {
    link += locale.slug + "/"
  }

  return { text: locale.displayName, href: link }
})

const Header = () => {
  const communityDropdownLinks = [
    {
      text: <fbt desc="Communty menu 'services' link">Services</fbt>,
      href: "/services.html",
    },
    {
      text: <fbt desc="Communty menu 'projects' link">Projects</fbt>,
      href: "/projects.html",
    },
    {
      text: <fbt desc="Communty menu 'exchanges' link">Exchanges</fbt>,
      href: "/exchanges.html",
    },
    {
      text: <fbt desc="Communty menu 'nodes' link">Nodes</fbt>,
      href: "/nodes.html",
    },
    {
      text: <fbt desc="Communty menu 'logos' link">Logos</fbt>,
      href: "/graphics.html",
    },
    {
      text: (
        <fbt desc="Communty menu 'developper portal' link">
          Developer Portal
        </fbt>
      ),
      href: "/developers.html",
    },
    {
      text: <fbt desc="Communty menu 'whitepaper' link">Whitepaper</fbt>,
      href: "/bitcoin.pdf",
    },
  ]

  const navBarItems = [
    {
      text: <fbt desc="Top 'get started' link">Get started</fbt>,
      href: "/start-here.html",
    },
    {
      text: <fbt desc="Top 'wallets' link">Wallets</fbt>,
      href: "/wallets.html",
    },
    {
      text: <fbt desc="Link to the block explorer">Explorer</fbt>,
      href: "https://explorer.bitcoincash.org/",
    },
    {
      text: <fbt desc="Commnity menu">Community</fbt>,
      links: communityDropdownLinks,
    },
    { text: <fbt desc="Top 'about' link">About</fbt>, href: "/faq.html" },
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
                <Link
                  data-sal="slide-down"
                  data-sal-delay={100 + index * 100}
                  data-sal-duration="1000"
                  data-sal-easing="ease"
                  className={headerStyles.link}
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
                    <Link
                      className={headerStyles.mobileNavLink}
                      key={headerLink.index}
                      to={headerLink.href}
                    >
                      {headerLink.text}
                    </Link>
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
