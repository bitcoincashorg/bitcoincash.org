import React from "react"
import fbt from "fbt"
import Feature from "components/feature/feature"
import friends from "assets/images/home/features/payFriends.png"
import Spend from "assets/icons/pay_friends.svg"

const PayFriendsFeature = () => {
  return (
    <Feature
      featureTitle={fbt(
        "Pay your friends directly",
        "'pay friend directly' feature's title"
      )}
      featureButtonText={fbt(
        "Pay with Bitcoin Cash",
        "Call to action for the 'pay friend directly' feature"
      )}
      featureIcon={
        <div style={{ position: "relative", left: "-50px" }}>
          <Spend />
        </div>
      }
      featureImage={<img src={friends} alt="bch-cafe" />}
      btnHref={"/wallets.html"}
    >
      <fbt desc="'pay friend directly' feature's body">
        Splitting the bill? Send money to your friend's wallet or have them send
        it to yours instead. Payments are fast and go directly between the two
        of you—no banks needed.
      </fbt>
    </Feature>
  )
}

export default PayFriendsFeature
