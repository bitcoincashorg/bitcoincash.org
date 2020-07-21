import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import heroStyles from "./hero.module.css"
import { EN_HERO_TITLE, EN_HERO_BODY, EN_HERO_BTN_PRIMARY, EN_HERO_BTN_SECONDARY } from "../../global/strings"
import PrimaryButton from '../buttons/primary-button';
import SecondaryButton from "../buttons/secondary-button";
import heroImage from '../../assets/images/hero.png';

const Hero = () => {
  const data = useStaticQuery(graphql`
  query HeroThemeQuery {
    site {
      siteMetadata {
        themeColours {
          primary_dark,
          primary_light
        }
      }
    }
  }
`)

const theme = data.site.siteMetadata.themeColours;

return (
<div className={heroStyles.heroContainer} style={{
      background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`
    }}
  >
    <div
    data-sal="fade"
    data-sal-delay="150"
    data-sal-duration="1000"
    data-sal-easing="ease"
     className={heroStyles.heroText}>
        <div className={heroStyles.heroTitle}>
            <h1>{EN_HERO_TITLE}</h1>
        </div>
        <div className={heroStyles.heroBody}>
            {EN_HERO_BODY}
        </div>
        <div className={heroStyles.heroBtnBar}>
          <PrimaryButton noMarginLeft={true} buttonText={EN_HERO_BTN_PRIMARY} href={"https://www.bitcoincash.org/start-here.html"}></PrimaryButton>
          <SecondaryButton noMarginLeft={true} buttonText={EN_HERO_BTN_SECONDARY} href={"https://www.bitcoincash.org/roadmap.html"}></SecondaryButton>
        </div>
    </div>
    <div 
    data-sal="slide-up"
    data-sal-delay="100"
    data-sal-duration="1000"
    data-sal-easing="ease"
    className={heroStyles.heroImageContainer}>
      <img src={heroImage} className={heroStyles.heroImg} alt="hero"></img>
    </div>
</div>)
}

export default Hero
