import React, { useState, useEffect } from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"
import Dropdown, { MobileDropdown } from "components/dropdownButtons/dropdown"
import LivePriceWidget from "components/liveprice/live-price-widget"
import axios from "axios"
import fbt from "fbt"
import World from "assets/icons/world.svg"
import "assets/lib/hamburgers.min.css"
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

  return { text: locale.displayName, href: link, localize: false }
})

const Header = () => {
  const resourcesDropdownLinks = [
    {
      text: fbt("Services", "Resources menu 'services' link"),
      href: "/services.html",
    },
    {
      text: fbt("Exchanges", "Resources menu 'exchanges' link"),
      href: "/exchanges.html",
    },
    {
      text: fbt("Explorer", "Resources menu 'block explorer' link"),
      href: "https://explorer.bitcoincash.org/",
    },
    {
      text: fbt("Logos", "Resources menu 'logos' link"),
      href: "/graphics.html",
    },
    {
      text: fbt("Whitepaper", "Resources menu 'whitepaper' link"),
      href: "/bitcoin.pdf",
      localize: false,
    },
  ]
  
  const developersDropdownLinks = [
    {
      text: fbt("Developer Portal", "Developer menu 'developper portal' link"),
      href: "/developers.html",
    },
    {
      text: fbt("Nodes", "Developer menu 'nodes' link"),
      href: "/nodes.html",
    },
    {
      text: fbt("Projects", "Developer menu 'projects' link"),
      href: "/projects.html",
    },
    {
      text: fbt("Github", "Developer menu 'github' link"),
      href: "https://github.com/bitcoincashorg/bitcoincash.org",
    },
  ]

  const navBarItems = [
    {
      text: fbt("Get Started", "Top 'Get started' link"),
      href: "/start-here.html",
    },
    {
      text: fbt("Resources", "Top 'resources' link"),
      links: resourcesDropdownLinks,
    },
    {
      text: fbt("Wallets", "Top 'wallets' link"),
      href: "/wallets.html",
    },
    {
      text: fbt("Buy", "Top 'buy' link"),
      href: "/buy-bitcoin-cash.html",
    },
    {
      text: fbt("Developers", "Developers menu"),
      links: developersDropdownLinks,
    },
    {
      text: fbt("Roadmap", "Top 'roadmap' link"),
      href: "/roadmap.html",
    },
    {
      text: <World />,
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
