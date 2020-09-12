import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import Hero from "components/hero/hero"
import FromPhoneFeature from "components/home/features/from-phone-feature"
import MoneyAbroadFeature from "components/home/features/money-abroad-feature"
import ExploreBanner from "components/explore-banner"
import NoBankAccFeature from "components/home/features/no-bank-acc-feature"
import StoreSecurelyFeature from "components/home/features/store-securely-feature"
import MoneyPrivateFeature from "components/home/features/money-private-feature"
import PayFriendsFeature from "components/home/features/pay-friends"
import HomeLargeFeature from "components/home/home-large-feature"
import Arrow from "assets/icons/arrow.svg"
import SingleButtonCTA from "components/CTAS/single-button-cta"

const IndexPage = () => {
  return (
    <>
      <Hero />
      <div>
        <PayFriendsFeature />
        <FromPhoneFeature />
      </div>
      <ExploreBanner
        bannerText={fbt(
          "Easy ways to buy Bitcoin Cash",
          "first banner on the homepage"
        )}
        bannerIcon={<Arrow />}
        href={"/buy-bitcoin-cash/"}
      />
      <div>
        <MoneyAbroadFeature />
        <NoBankAccFeature />
      </div>
      <ExploreBanner
        bannerText={fbt(
          "Where to spend Bitcoin Cash",
          "second banner on the homepage"
        )}
        bannerIcon={<Arrow />}
        href={"/spend-bitcoin-cash/"}
      />
      <div>
        <StoreSecurelyFeature />
        <MoneyPrivateFeature />
      </div>
      <HomeLargeFeature />
      <SingleButtonCTA
        text={fbt(
          "Subscribe for Bitcoin Cash news, guides, and more.",
          "Subscribe call to action"
        )}
        btnText={fbt("Coming soon.", "Subscribe call to action button")}
      />
      <SEO title={fbt("Home", "Home page SEO title")} />
    </>
  )
}

export default IndexPage
