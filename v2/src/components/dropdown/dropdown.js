import React from "react"
import { useHover, useToggleLayer } from "react-laag"
import S from "./dropdown.module.scss"
import Link from "global/link"
import ResizeObserver from "resize-observer-polyfill"

const Dropdown = ({ children, links, index }) => {
  const triggerRef = React.useRef()
  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps }) => {
      if (!isOpen) {
        return
      }
      return (
        <div {...layerProps} className={S.dropdownContent}>
          <div className={S.dropdownContainer}>
            {links.map(dropdownLink => (
              <Link
                className={S.link}
                to={dropdownLink.href}
                localize={dropdownLink.localize}
              >
                {dropdownLink.text}
              </Link>
            ))}
          </div>
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
      className={S.mainNavLink}
    >
      {children}
      <div>{element}</div>
    </div>
  )
}

export default Dropdown
