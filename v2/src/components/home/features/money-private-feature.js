import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import moneyPrivate from "assets/images/home/features/moneyPrivate.png"
import Privacy from "assets/icons/privacy.svg"

const MoneyPrivateFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Pay with the privacy of cash",
        "'pay privately' feature's title"
      )}
      featureButtonText={fbt(
        "Pay privately",
        "Call to action for the 'pay privately' feature"
      )}
      featureIcon={<Privacy></Privacy>}
      isReversed={true}
      isDarkBg={true}
      featureImage={<img src={moneyPrivate} alt="bch-money-private" />}
      btnHref={"https://cashshuffle.com/"}
    >
      <fbt desc="'pay privately' feature's body">
        Since a bank account is tied to your identity, your transaction history
        is, too. Bitcoin Cash is the opposite: nobody knows who you are and
        payments can be sent privately.
      </fbt>
    </Feature>
  )
}

export default MoneyPrivateFeature
