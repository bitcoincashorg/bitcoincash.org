import React from "react"
import Feature from "../../../components/feature/feature"
import moneyAbroad from "../../../assets/images/home/features/moneyAbroad.png"
import {
  EN_MONEY_ABROAD_FEATURE_TITLE,
  EN_MONEY_ABROAD_FEATURE_BODY,
  EN_MONEY_ABROAD_FEATURE_BTN,
} from "../../../global/strings"
import Send from "../../../assets/icons/send.svg"

const MoneyAbroadFeature = () => {
  return (
    <Feature
      featureTitle={EN_MONEY_ABROAD_FEATURE_TITLE}
      featureBodyText={EN_MONEY_ABROAD_FEATURE_BODY}
      featureButtonText={EN_MONEY_ABROAD_FEATURE_BTN}
      featureIcon={<Send></Send>}
      featureImage={<img src={moneyAbroad} alt="bch-abroad"></img>}
      noPaddingTop={true}
      btnHref={"/wallets.html"}
    ></Feature>
  )
}

export default MoneyAbroadFeature
