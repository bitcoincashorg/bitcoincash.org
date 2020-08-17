import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import exploreBannerStyles from "./explore-banner.module.css"
import Link from "../global/link"

const ExploreBanner = ({ bannerText, bannerIcon, href }) => {
  const data = useStaticQuery(graphql`
    query ExploreBannerThemeQuery {
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
    <Link to={href}>
      <div
        className={exploreBannerStyles.bannerContainer}
        style={{
          background: `linear-gradient(270deg, ${theme.primary_dark} 0%, ${theme.primary_light} 100%)`,
        }}
      >
        <div className={exploreBannerStyles.bannerText}>
          <h3>{bannerText}</h3>
        </div>
        <div className={exploreBannerStyles.icon}>{bannerIcon}</div>
      </div>
    </Link>
  )
}

export default ExploreBanner
