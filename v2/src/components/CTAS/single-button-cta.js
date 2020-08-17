import React from "react"
import ctaStyles from "./single-button-cta.module.css"
import PrimaryButton from "../buttons/primary-button"

const SingleButtonCTA = ({ text, btnText }) => {
  return (
    <div className={ctaStyles.ctaContainer}>
      <h2 className={ctaStyles.ctaText}>{text}</h2>
      <PrimaryButton buttonText={btnText}></PrimaryButton>
    </div>
  )
}

export default SingleButtonCTA
