import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import moneyAbroad from "assets/images/home/features/moneyAbroad.png"
import Send from "assets/icons/send.svg"

const MoneyAbroadFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Send money abroad basically for free",
        "'send money abroad' feature's title"
      )}
      featureButtonText={fbt(
        "Send Bitcoin Cash",
        "Call to action for the 'send money abroad' feature"
      )}
      featureIcon={<Send></Send>}
      featureImage={<img src={moneyAbroad} alt="bch-abroad" />}
      noPaddingTop={true}
      btnHref={"/wallets.html"}
    >
      <fbt desc="'send money abroad' feature's body">
        On average, banks take a 6.8% cut out of the money you send home.
        Bitcoin Cash is much cheaper—and faster, too. Use it to send remittances
        for less than a cent.
      </fbt>
    </Feature>
  )
}

export default MoneyAbroadFeature
