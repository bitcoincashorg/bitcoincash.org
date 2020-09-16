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
  const prices = [
    currentUSDPrice,
    currentEURPrice,
    currentJPYPrice,
    currentCNYPrice,
  ]
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
          {prices.map(prices => (
            <li
              onClick={() => {
                setOpen(!open)
                setCurrency(prices)
                setHide(true)
              }}
            >
              {prices}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LivePriceWidget
