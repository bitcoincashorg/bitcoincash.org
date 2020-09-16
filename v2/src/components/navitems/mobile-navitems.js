import React, { useState } from "react"
import S from "./mobile-navitems.module.scss"
import "assets/lib/hamburgers.min.css"
import Link from "global/link"

const NavItems = ({ navBarItems }) => {
  const [isActive, setIsActive] = useState(false)

  function MobileDropdown({ children, links, navLinkClass }) {
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
                onClick={() => setIsActive(!isActive)}
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
      <div className={S.mobileHeaderLinks}>
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
        className={S.mobileMenu}
        style={
          isActive
            ? {
                height: "auto",
                backgroundColor: "#040c3c",
              }
            : null
        }
      >
        {isActive && (
          <div className={S.mobileNavLinks}>
            {navBarItems.map((headerLink, index) =>
              headerLink.href ? (
                <Link
                  className={S.mobileNavLink}
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

export default NavItems
