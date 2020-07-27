import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import largeFeatureStyles from "./large-feature.module.css"
import SecondaryButton from "../buttons/secondary-button";
import IconTextTile from "./icon-text-tile";

const LargeFeature = ({
    featureTitle, 
    featureSubtitle,
    featuredPoints, 
    CTA}) => {
  const data = useStaticQuery(graphql`
  query LargeFeatureThemeQuery {
    site {
      siteMetadata {
        themeColours {
          primary_dark,
          primary_light,
        }
      }
    }
  }
`)

const theme = data.site.siteMetadata.themeColours;

return (
<div className={largeFeatureStyles.largeFeatureContainer} style={{
      background: `linear-gradient(200deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`
    }}
  >
    <div className={largeFeatureStyles.titles}>
        <h3>{featureTitle}</h3>
        {featureSubtitle}
    </div>

    <div className={largeFeatureStyles.featuredPoints}>
        {featuredPoints && featuredPoints.map(point => {
            return (<IconTextTile icon={point.icon} text={point.text}></IconTextTile>)
        })}
    </div>

    <div className={largeFeatureStyles.ctaContainer}>
        {CTA.icon}
        <h3>{CTA.title}</h3>
        <div>{CTA.body}</div>
        <div className={largeFeatureStyles.ctaButtons}>
          <SecondaryButton buttonText={CTA.buttonText} href={CTA.btnHref}></SecondaryButton>
        </div>
    </div>

</div>)
}

export default LargeFeature
