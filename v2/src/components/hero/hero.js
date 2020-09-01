import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import fbt from "fbt"
import heroStyles from "./hero.module.css"
import PrimaryButton from "../buttons/primary-button"
import SecondaryButton from "../buttons/secondary-button"
import heroImage from "assets/images/hero.png"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
            primary_light
          }
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.themeColours

  return (
    <div
      className={heroStyles.heroContainer}
      style={{
        background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`,
      }}
    >
      <div
        data-sal="fade"
        data-sal-delay="150"
        data-sal-duration="1000"
        data-sal-easing="ease"
        className={heroStyles.heroText}
      >
        <div className={heroStyles.heroTitle}>
          <h1>
            <fbt desc="Title of the hero section">
              Money built for you, not banks
            </fbt>
          </h1>
        </div>
        <div className={heroStyles.heroBody}>
          <fbt desc="Body of the hero section">
            Bitcoin Cash makes money work for you. Pay people fast, send money
            abroad basically for free, and store savings securely—all without
            middlemen controlling your funds.
          </fbt>
        </div>
        <div className={heroStyles.heroBtnBar}>
          <PrimaryButton
            noMarginLeft={true}
            buttonText={fbt(
              "Get started",
              "Primary button of the hero section"
            )}
            href={"/start-here/"}
          />
          <SecondaryButton
            noMarginLeft={true}
            buttonText={fbt(
              "See roadmap",
              "Secondary button of the hero section"
            )}
            href={"/roadmap/"}
          />
        </div>
      </div>
      <div
        data-sal="slide-up"
        data-sal-delay="100"
        data-sal-duration="1000"
        data-sal-easing="ease"
        className={heroStyles.heroImageContainer}
      >
        <img src={heroImage} className={heroStyles.heroImg} alt="hero" />
      </div>
    </div>
  )
}

export default Hero
