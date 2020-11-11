import React from "react"
import logo from "assets/images/bitcoin-cash-logo-white-small.png"
import headerStyles from "./header.module.scss"
import AnnouncementBar from "./announcement-bar.js"
import LivePriceWidget from "components/liveprice/live-price-widget"
import NavBar from "./navbar"
import Link from "global/link"

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

const Header = () => {
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
            <LivePriceWidget />
          </div>
          <NavBar />
        </div>
      </header>
    </>
  )
}

export default Header
