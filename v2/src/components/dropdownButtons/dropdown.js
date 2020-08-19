import React, { useState } from "react"
import { useHover, useToggleLayer, Arrow } from "react-laag"
import dropdownStyles from "./dropdown.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import Link from "global/link"
import ResizeObserver from "resize-observer-polyfill"

const DropdownContent = ({ layerSide, arrowStyle, links }) => {
  const data = useStaticQuery(graphql`
    query DropdownThemeQuery {
      site {
        siteMetadata {
          themeColours {
            background_dark
            primary_dark
          }
        }
      }
    }
  `)
  const theme = data.site.siteMetadata.themeColours

  return (
    <div className={dropdownStyles.dropdownContainer}>
      {layerSide && arrowStyle && (
        <Arrow
          style={arrowStyle}
          layerSide={layerSide}
          size={8}
          angle={45}
          roundness={1}
          backgroundColor={theme.primary_dark}
        />
      )}
      {links.map(dropdownLink => (
        <Link
          className={dropdownStyles.link}
          key={dropdownLink.text}
          style={{ backgroundColor: theme.primary_dark }}
          to={dropdownLink.href}
          localize={dropdownLink.localize}
        >
          {dropdownLink.text}
        </Link>
      ))}
    </div>
  )
}

function MobileDropdown({ children, links, navLinkClass }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div onClick={() => setExpanded(!expanded)}>
      <div className={navLinkClass}>{children}</div>
      {expanded && (
        <div>
          <DropdownContent links={links} />
        </div>
      )}
    </div>
  )
}

function Dropdown({ children, links, index }) {
  const triggerRef = React.useRef()
  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps, layerSide, arrowStyle }) => {
      if (!isOpen) {
        return
      }

      return (
        <div {...layerProps} className={dropdownStyles.dropdownContent}>
          <DropdownContent
            layerSide={layerSide}
            arrowStyle={arrowStyle}
            links={links}
          />
        </div>
      )
    },
    {
      ResizeObserver,
      closeOnOutsideClick: true,
      placement: {
        anchor: "BOTTOM_CENTER",
        autoAdjust: true,
        snapToAnchor: true,
        triggerOffset: 12,
        scrollOffset: 16,
        possibleAnchors: ["BOTTOM_CENTER", "LEFT_CENTER", "RIGHT_CENTER"],
      },
    }
  )

  const hoverProps = useHover({
    delayEnter: 300,
    delayLeave: 200,
    onShow: () => toggleLayerProps.openFromRef(triggerRef),
    onHide: () => toggleLayerProps.close(),
  })

  return (
    <div
      data-sal="slide-down"
      data-sal-delay={100 + index * 100}
      data-sal-duration="1000"
      data-sal-easing="ease"
      ref={triggerRef}
      {...hoverProps}
      className={dropdownStyles.mainNavLink}
    >
      {children}
      <div>{element}</div>
    </div>
  )
}

export default Dropdown
export { MobileDropdown }
