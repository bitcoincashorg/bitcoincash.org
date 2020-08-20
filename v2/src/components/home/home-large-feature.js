import React from "react"
import LargeFeature from "../feature/large-feature"
import {
  EN_LARGE_FEATURE_CTA_TITLE,
  EN_LARGE_FEATURE_POINTONE,
  EN_LARGE_FEATURE_POINTTWO,
  EN_LARGE_FEATURE_POINTTHREE,
  EN_LARGE_FEATURE_CTA_BODY,
  EN_LARGE_FEATURE_CTA_BTN,
  EN_LARGE_FEATURE_SUBTITLE,
  EN_LARGE_FEATURE_TITLE,
} from "../../global/strings"
import PhoneIcon from "../../assets/icons/directpayment.svg"
import TinyFees from "../../assets/icons/tinyfees.svg"
import SentFast from "../../assets/icons/sentfast.svg"
import Anywhere from "../../assets/icons/anywhere.svg"

const HomeLargeFeature = () => {
  return (
    <LargeFeature
      featureTitle={EN_LARGE_FEATURE_TITLE}
      featureSubtitle={EN_LARGE_FEATURE_SUBTITLE}
      featuredPoints={[
        { icon: <PhoneIcon></PhoneIcon>, text: EN_LARGE_FEATURE_POINTONE },
        { icon: <TinyFees></TinyFees>, text: EN_LARGE_FEATURE_POINTTWO },
        { icon: <SentFast></SentFast>, text: EN_LARGE_FEATURE_POINTTHREE },
      ]}
      CTA={{
        icon: <Anywhere></Anywhere>,
        title: EN_LARGE_FEATURE_CTA_TITLE,
        body: EN_LARGE_FEATURE_CTA_BODY,
        buttonText: EN_LARGE_FEATURE_CTA_BTN,
        btnHref: "/roadmap/",
      }}
    ></LargeFeature>
  )
}

export default HomeLargeFeature
