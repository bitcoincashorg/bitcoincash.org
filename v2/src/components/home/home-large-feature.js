import React from "react"
import LargeFeature from "../feature/large-feature"
import fbt from "fbt"
import PhoneIcon from "../../assets/icons/directpayment.svg"
import TinyFees from "../../assets/icons/tinyfees.svg"
import SentFast from "../../assets/icons/sentfast.svg"
import Anywhere from "../../assets/icons/anywhere.svg"

const HomeLargeFeature = () => {
  return (
    <LargeFeature
      featureTitle={fbt(
        "Bitcoin Cash does what banks can't do",
        "Large feature's title"
      )}
      featuredPoints={[
        {
          icon: <PhoneIcon />,
          text: fbt(
            "Payments go directly from one person to another.",
            "Large feature's point one"
          ),
        },
        {
          icon: <TinyFees />,
          text: fbt(
            "No matter how much you send, fees are always tiny.",
            "Large feature's point two"
          ),
        },
        {
          icon: <SentFast />,
          text: fbt(
            "Money is sent and received fast—no delays, no limits.",
            "Large feature's point three"
          ),
        },
      ]}
      CTA={{
        icon: <Anywhere />,
        title: fbt(
          "And everyone, everywhere can use it",
          "Large feature's CTA title"
        ),
        body: fbt(
          "Bitcoin Cash is sound money for the world. To meet growing demand, developers are always scaling the Bitcoin Cash network.",
          "Large feature's CTA text"
        ),
        buttonText: fbt("See the roadmap", "Large feature's CTA button text"),
        btnHref: "/roadmap.html",
      }}
    ></LargeFeature>
  )
}

export default HomeLargeFeature
