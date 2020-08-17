import React from "react"
import Feature from "../../../components/feature/feature"
import storeSecurely from "../../../assets/images/home/features/storeSecurely.png"
import {
  EN_STORE_SECURELY_FEATURE_BODY,
  EN_STORE_SECURELY_FEATURE_TITLE,
  EN_STORE_SECURELY_FEATURE_BTN,
} from "../../../global/strings"
import Store from "../../../assets/icons/store.svg"

const StoreSecurelyFeature = () => {
  return (
    <Feature
      featureTitle={EN_STORE_SECURELY_FEATURE_TITLE}
      featureBodyText={EN_STORE_SECURELY_FEATURE_BODY}
      featureButtonText={EN_STORE_SECURELY_FEATURE_BTN}
      featureIcon={<Store></Store>}
      featureImage={<img src={storeSecurely} alt="bch-store-secure"></img>}
      noPaddingTop={true}
      btnHref={"/wallets.html"}
    ></Feature>
  )
}

export default StoreSecurelyFeature
