import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import cafe from "assets/images/home/features/cafe.png"
import Spend from "assets/icons/spend.svg"

const FromPhoneFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Spend straight from your phone",
        "'spend from your phone' feature's title"
      )}
      featureButtonText={fbt(
        "Spend Bitcoin Cash",
        "Call to action for the 'spend from your phone' feature"
      )}
      featureIcon={<Spend />}
      extraPaddingTop={true}
      isReversed={true}
      isDarkBg={true}
      featureImage={<img src={cafe} alt="bch-cafe" />}
      btnHref={"/spend-bitcoin-cash.html"}
    >
      <fbt desc="'spend from your phone' feature's body">
        Coffee to go? Time for a new laptop? Get it with Bitcoin Cash at an
        increasing number of participating websites and stores. Simply scan to
        check out, just like Google Pay.
      </fbt>
    </Feature>
  )
}

export default FromPhoneFeature
