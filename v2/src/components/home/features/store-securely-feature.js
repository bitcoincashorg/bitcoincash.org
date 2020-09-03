import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import storeSecurely from "assets/images/home/features/storeSecurely.png"
import Store from "assets/icons/store.svg"

const StoreSecurelyFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Store savings in a safer place",
        "'store securely' feature's title"
      )}
      featureButtonText={fbt(
        "Choose a wallet",
        "Call to action for the 'store securely' feature"
      )}
      featureIcon={<Store></Store>}
      featureImage={<img src={storeSecurely} alt="bch-store-secure" />}
      noPaddingTop={true}
      btnHref={"/wallets/"}
    >
      <fbt desc="'store securely' feature's body">
        Scammers can pretend to be your bank, using scare tactics to trick you
        into sending them money. Bitcoin Cash fixes this trust issue by removing
        third parties altogether.
      </fbt>
    </Feature>
  )
}

export default StoreSecurelyFeature
