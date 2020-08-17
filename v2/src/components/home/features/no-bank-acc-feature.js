import React from "react"
import Feature from "../../../components/feature/feature"
import cafe from "../../../assets/images/home/features/noBankAcc.png"
import {
  EN_NO_BANK_ACC_FEATURE_BODY,
  EN_NO_BANK_ACC_FEATURE_TITLE,
  EN_NO_BANK_ACC_FEATURE_BTN,
} from "../../../global/strings"
import Globe from "../../../assets/icons/globe.svg"

const NoBankAccFeature = () => {
  return (
    <Feature
      featureTitle={EN_NO_BANK_ACC_FEATURE_TITLE}
      featureBodyText={EN_NO_BANK_ACC_FEATURE_BODY}
      featureButtonText={EN_NO_BANK_ACC_FEATURE_BTN}
      featureIcon={<Globe></Globe>}
      isReversed={true}
      isDarkBg={true}
      featureImage={<img src={cafe} alt="bch-no-bank"></img>}
      btnHref={"/start-here.html"}
    ></Feature>
  )
}

export default NoBankAccFeature
