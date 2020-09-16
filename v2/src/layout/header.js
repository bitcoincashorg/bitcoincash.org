import React, { useState, useEffect } from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"
import AnnouncementBar from "./announcement-bar.js"
import Dropdown, { MobileDropdown } from "components/dropdownButtons/dropdown"
import LivePriceWidget from "components/liveprice/live-price-widget.js"
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
    if (currentScrollPos <= 200) {
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
      text: fbt("Home", "Top 'home' link"),
      href: "/",
    },
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

  const bchPriceApi =
    "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD,JPY,EUR,CNY"
  const [isActive, setIsActive] = useState(false)
  const [currentUSDPrice, setCurrentUSDPrice] = useState("-")
  const [currentEURPrice, setCurrentEURPrice] = useState("-")
  const [currentJPYPrice, setCurrentJPYPrice] = useState("-")
  const [currentCNYPrice, setCurrentCNYPrice] = useState("-")
  const updateBchPrice = () => {
    axios.get(bchPriceApi).then(response => {
      if (response.data) {
        setCurrentUSDPrice(response.data.USD.toFixed(2))
        setCurrentEURPrice(response.data.EUR.toFixed(2))
        setCurrentJPYPrice(Math.floor(response.data.JPY).toLocaleString())
        setCurrentCNYPrice(Math.floor(response.data.CNY).toLocaleString())
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
      <AnnouncementBar />
      <header
        id={isActive ? "navbar-mobile" : "navbar"}
        style={{
          background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`,
        }}
      >
        <div className={headerStyles.headerBar}>
          <div
            className={headerStyles.headerStart}
            data-sal="slide-down"
            data-sal-delay={200}
            data-sal-duration="1000"
            data-sal-easing="ease"
          >
            <Link className={headerStyles.logo} to="/">
              <img src={logo} alt="bitcoincashlogo" />
            </Link>
            <div className={headerStyles.divider} />
            <LivePriceWidget
              currentUSDPrice={[
                "$",
                currentUSDPrice,
                <span className={headerStyles.ticker}>USD</span>,
              ]}
              currentEURPrice={[
                "€",
                currentEURPrice,
                <span className={headerStyles.ticker}>EUR</span>,
              ]}
              currentJPYPrice={[
                "¥",
                currentJPYPrice,
                <span className={headerStyles.ticker}>JPY</span>,
              ]}
              currentCNYPrice={[
                "¥",
                currentCNYPrice,
                <span className={headerStyles.ticker}>CNY</span>,
              ]}
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
                      onClick={() => setIsActive(!isActive)}
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
