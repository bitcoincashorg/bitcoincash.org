import React, { useState } from "react"
import S from "./navbar.module.scss"
import Link from "global/link"
import Dropdown from "components/dropdownButtons/dropdown"
import "assets/lib/hamburgers.min.css"
import NavItems from "./nav-items.js"

const NavBar = () => {
  const [open, openMobileMenu] = useState(false)
  const navItems = NavItems()

  const MobileDropdown = ({ children, links, navLinkClass }) => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div
        onClick={() => setExpanded(!expanded)}
        onKeyDown={() => setExpanded(!expanded)}
        role="button"
        tabIndex="0"
        style={{ outline: "none" }}
      >
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
        {navItems.map((headerLink, index) =>
          headerLink.href && headerLink.header ? (
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
          ) : !headerLink.header ? null : (
            <Dropdown links={headerLink.links} index={index} key={index}>
              {headerLink.text}
            </Dropdown>
          )
        )}
      </div>

      <div className={S.mobileHeaderLinks}>
        <div
          className={`hamburger hamburger--squeeze ${open ? "is-active" : ""} ${
            S.nopadding
          }`}
          onClick={() => openMobileMenu(!open)}
          onKeyDown={() => openMobileMenu(!open)}
          role="button"
          tabIndex="0"
          style={{ outline: "none" }}
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
            {navItems.map((headerLink, index) =>
              headerLink.href && headerLink.header ? (
                <Link
                  className={S.mobileNavLink}
                  key={index}
                  to={headerLink.href}
                  onClick={() => openMobileMenu(!open)}
                >
                  {headerLink.text}
                </Link>
              ) : !headerLink.header ? null : (
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
