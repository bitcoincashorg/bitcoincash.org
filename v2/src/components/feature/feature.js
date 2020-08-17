import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import featureStyles from "./feature.module.css"
import PrimaryButton from "../buttons/primary-button"

const Feature = ({
  featureTitle,
  featureBodyText,
  featureButtonText,
  featureIcon,
  featureImage,
  isReversed,
  btnHref,
  isDarkBg,
}) => {
  const data = useStaticQuery(graphql`
    query FeatureThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
            primary_light
            secondary_dark
            secondary_light
            background_dark
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours
  return (
    <div
      className={`${featureStyles.featureBackgroundContainer}`}
      style={{
        backgroundColor: isDarkBg ? theme.background_dark : "#fff",
      }}
    >
      <div
        data-sal={"slide-up"}
        data-sal-delay="10"
        data-sal-duration="400"
        data-sal-easing="ease"
        className={`${featureStyles.featureContainer} ${
          isReversed ? featureStyles.reverse : ""
        }`}
      >
        <div className={featureStyles.featureImageContainer}>
          {featureImage}
        </div>
        <div className={featureStyles.featureBodyContainer}>
          <div className={featureStyles.featureIconContainer}>
            {featureIcon}
          </div>
          <h2 className={featureStyles.featureTitle}>{featureTitle}</h2>
          <div className={featureStyles.featureBodyText}>{featureBodyText}</div>
          <div className={featureStyles.featureButton}>
            <PrimaryButton
              buttonText={featureButtonText}
              href={btnHref}
              noMarginLeft={true}
            ></PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature
