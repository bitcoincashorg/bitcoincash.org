import React, { useState, useEffect } from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import headerStyles from "./header.module.scss"
import AnnouncementBar from "./announcement-bar.js"
import NavItems from "components/navitems/navitems"
import MobileNavItems from "components/navitems/mobile-navitems"
import LivePriceWidget from "components/liveprice/live-price-widget"
import axios from "axios"
import fbt from "fbt"
import World from "assets/icons/world.svg"
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
    "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD"
  const [currentUSDPrice, setCurrentUSDPrice] = useState("-")
  const updateBchPrice = () => {
    axios.get(bchPriceApi).then(response => {
      if (response.data && response.data.USD) {
        setCurrentUSDPrice(response.data.USD.toFixed(2))
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

  return (
    <>
      <AnnouncementBar />
      <header>
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
              currentPrice={"$" + currentUSDPrice}
              ticker={"USD"}
              url={"/buy-bitcoin-cash/"}
            />
          </div>

          <NavItems navBarItems={navBarItems} />
          <MobileNavItems navBarItems={navBarItems} />
        </div>
      </header>
    </>
  )
}

export default Header
