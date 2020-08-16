import React, {useState, useEffect} from "react"
import logo from '../../assets/images/bitcoin-cash-logo-white-small.png';
import { useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"
import navBarItems from './navBarItems';
import axios from 'axios';
import 'assets/lib/hamburgers.min.css';
import LivePriceWidget from "../liveprice/live-price-widget";
import Link from 'global/link';

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
if (typeof window !== 'undefined') {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 1000) {
      return;
    }
    if (prevScrollpos > currentScrollPos) {
      let navBar = document.getElementById("navbar")
      if (navBar) {
        navBar.style.top = "0";
      }
    } else {
      let navBar = document.getElementById("navbar")
      if (navBar) {
        navBar.style.top = "-100px";
      }
    }
    prevScrollpos = currentScrollPos;
  }
}

const externalLink = (i, linkText, href) => {
  return (
    <Link data-sal="slide-down"
      data-sal-delay={100 + (i * 100)}
      data-sal-duration="1000"
      data-sal-easing="ease"
      className={headerStyles.link}
      key={i}
      to={href}>
      {linkText}
    </Link>
  )
}


const MobileHeaderLink = ({text, href, id}) => {
  return <Link className={headerStyles.mobileNavLink} key={id} to={href}>{text}</Link>
}

const Header = () => {
  const bchPriceApi = "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=USD";
  const [isActive, setIsActive] = useState(false);
  const [currentUSDPrice, setCurrentUSDPrice] = useState("-")
  const updateBchPrice = () => {
    axios.get(bchPriceApi).then((response) => {
      if (response.data && response.data.USD) {
        setCurrentUSDPrice(response.data.USD);
      }
    });
  }

  useEffect(() => {
    updateBchPrice();
    const interval = setInterval(() => {
      updateBchPrice();
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  const data = useStaticQuery(graphql`
    query SiteThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark,
            primary_light
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours;

  return <>
    <header
      id={isActive ? "navbar-mobile" : "navbar"}
      style={{
        background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`
      }}
    >
      <div className={headerStyles.headerBar}>
        <div className={headerStyles.headerStart}>
          <img src={logo} className={headerStyles.logo} alt="bitcoincashlogo" />
          <LivePriceWidget currentPrice={"$" + currentUSDPrice} ticker={"USD"} url={"/buy-bitcoin-cash.html"} />
        </div>

        <div className={`${headerStyles.headerLinks} topBotomBordersOut`}>
          {navBarItems.map((headerLink, index) =>
            headerLink.href
              ? externalLink(index, headerLink.text, headerLink.href)
              : headerLink.dropdown
          )}
        </div>

        <div className={headerStyles.mobileHeaderLinks}>
          <div className={`hamburger hamburger--squeeze ${isActive ? 'is-active' : ''}`} onClick={() => setIsActive(!isActive)}>
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
        </div>
        <div className={headerStyles.mobileMenu} style={isActive ? {height:'calc(100vh - 100px)', backgroundColor: theme.primary_dark} : null}>
          {isActive &&
            <div className={headerStyles.mobileNavLinks}>
              {navBarItems.map(headerLink =>
                headerLink.href
                  ? <MobileHeaderLink text={headerLink.text} href={headerLink.href} key={headerLink.text} id={headerLink.index} />
                  : headerLink.mobileDropdown
              )}
            </div>
          }
        </div>

      </div>
    </header>
  </>
}

export default Header
