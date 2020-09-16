import React from "react"
import S from "./navitems.module.scss"
import Dropdown from "./dropdown"
import Link from "global/link"

const NavItems = ({ navBarItems }) => {
  return (
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
  )
}

export default NavItems
