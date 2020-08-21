import React from "react"
import LargeFeature from "../feature/large-feature"
import fbt from "fbt"
import PhoneIcon from "assets/icons/directpayment.svg"
import TinyFees from "assets/icons/tinyfees.svg"
import SentFast from "assets/icons/sentfast.svg"
import Anywhere from "assets/icons/anywhere.svg"

const HomeLargeFeature = () => {
  return (
    <LargeFeature
      featureTitle={fbt(
        "Bitcoin Cash does what banks can't do",
        "'does what banks can't do' homepage feature's title"
      )}
      featuredPoints={[
        {
          icon: <PhoneIcon />,
          text: fbt(
            "Payments go directly from one person to another.",
            "'does what banks can't do' homepage feature's first point"
          ),
        },
        {
          icon: <TinyFees />,
          text: fbt(
            "No matter how much you send, fees are always tiny.",
            "'does what banks can't do' homepage feature's second point"
          ),
        },
        {
          icon: <SentFast />,
          text: fbt(
            "Money is sent and received fast—no delays, no limits.",
            "'does what banks can't do' homepage feature's third point"
          ),
        },
      ]}
      CTA={{
        icon: <Anywhere />,
        title: fbt(
          "And everyone, everywhere can use it",
          "'does what banks can't do' homepage feature's CTA title"
        ),
        body: fbt(
          "Bitcoin Cash is sound money for the world. To meet growing demand, developers are always scaling the Bitcoin Cash network.",
          "'does what banks can't do' homepage feature's CTA text"
        ),
        buttonText: fbt("See the roadmap", "'does what banks can't do' homepage feature's CTA button text"),
        btnHref: "/roadmap/",
      }}
    ></LargeFeature>
  )
}

export default HomeLargeFeature
