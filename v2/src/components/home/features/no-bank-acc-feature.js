import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import cafe from "assets/images/home/features/noBankAcc.png"
import Globe from "assets/icons/globe.svg"

const NoBankAccFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Pay online without a bank account",
        "'no bank needed' feature's title"
      )}
      featureButtonText={fbt(
        "Get set up",
        "Call to action for the 'no bank needed' feature"
      )}
      featureIcon={<Globe></Globe>}
      isReversed={true}
      isDarkBg={true}
      featureImage={<img src={cafe} alt="bch-no-bank" />}
      btnHref={"/start-here.html"}
    >
      <fbt desc="'no bank needed' feature's body">
        Too far away? Too many fees? Whatever your reason for not owning a bank
        account, Bitcoin Cash can help. Use it to pay and get paid online
        without the need for banks.
      </fbt>
    </Feature>
  )
}

export default NoBankAccFeature
