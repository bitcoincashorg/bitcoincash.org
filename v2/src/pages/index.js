import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero/hero"
import FromPhoneFeature from "../components/home/features/from-phone-feature"
import MoneyAbroadFeature from "../components/home/features/money-abroad-feature"
import ExploreBanner from "../components/explore-banner"
import {
  EN_BANNER_ONE_TEXT,
  EN_BANNER_TWO_TEXT,
  EN_SUBSCRIBE_CTA_TEXT,
  EN_SUBSCRIBE_BTN_TEXT,
} from "../global/strings"
import NoBankAccFeature from "../components/home/features/no-bank-acc-feature"
import StoreSecurelyFeature from "../components/home/features/store-securely-feature"
import MoneyPrivateFeature from "../components/home/features/money-private-feature"
import PayFriendsFeature from "../components/home/features/pay-friends"
import HomeLargeFeature from "../components/home/home-large-feature"
import Arrow from "../assets/icons/arrow.svg"
import SingleButtonCTA from "../components/CTAS/single-button-cta"

const IndexPage = () => {
  return (
    <Layout>
      <Hero></Hero>
      <div>
        <PayFriendsFeature></PayFriendsFeature>
        <FromPhoneFeature></FromPhoneFeature>
      </div>
      <ExploreBanner
        bannerText={EN_BANNER_ONE_TEXT}
        bannerIcon={<Arrow></Arrow>}
        href={"/buy-bitcoin-cash.html"}
      ></ExploreBanner>
      <div>
        <MoneyAbroadFeature></MoneyAbroadFeature>
        <NoBankAccFeature></NoBankAccFeature>
      </div>
      <ExploreBanner
        bannerText={EN_BANNER_TWO_TEXT}
        bannerIcon={<Arrow></Arrow>}
        href={"/spend-bitcoin-cash.html"}
      ></ExploreBanner>
      <div>
        <StoreSecurelyFeature></StoreSecurelyFeature>
        <MoneyPrivateFeature></MoneyPrivateFeature>
      </div>
      <HomeLargeFeature></HomeLargeFeature>
      <SingleButtonCTA
        text={EN_SUBSCRIBE_CTA_TEXT}
        btnText={EN_SUBSCRIBE_BTN_TEXT}
      ></SingleButtonCTA>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
