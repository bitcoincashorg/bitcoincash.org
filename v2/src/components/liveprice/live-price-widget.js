import React, { useState } from "react"
import livePricingStyles from "./live-price-widget.module.css"
import Triangle from "assets/icons/triangle.svg"

const LivePriceWidget = ({
  currentUSDPrice,
  currentEURPrice,
  currentJPYPrice,
  currentCNYPrice,
}) => {
  const [open, setOpen] = useState(false)
  const [hide, setHide] = useState(false)
  const [selectedCurrency, setCurrency] = useState("")
  return (
    <div className={livePricingStyles.widgetContainer}>
      <div onClick={() => setOpen(!open)} className={livePricingStyles.widget}>
        {selectedCurrency}
        <span className={hide ? `${livePricingStyles.hide}` : ""}>
          {currentUSDPrice}
        </span>
        <Triangle />
      </div>

      {open && (
        <ul className={livePricingStyles.priceDropdownUl}>
          <li
            onClick={() => {
              setOpen(!open)
              setCurrency(currentUSDPrice)
              setHide(true)
            }}
          >
            {currentUSDPrice}
          </li>
          <li
            onClick={() => {
              setOpen(!open)
              setCurrency(currentEURPrice)
              setHide(true)
            }}
          >
            {currentEURPrice}
          </li>
          <li
            onClick={() => {
              setOpen(!open)
              setCurrency(currentJPYPrice)
              setHide(true)
            }}
          >
            {currentJPYPrice}
          </li>
          <li
            onClick={() => {
              setOpen(!open)
              setCurrency(currentCNYPrice)
              setHide(true)
            }}
          >
            {currentCNYPrice}
          </li>
        </ul>
      )}
    </div>
  )
}

export default LivePriceWidget
