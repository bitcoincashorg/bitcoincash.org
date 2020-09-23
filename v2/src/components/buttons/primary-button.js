import primBtnStyles from "./primary-button.module.css"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "../../global/link"

export const PurePrimaryButton = ({ data, buttonText, href, noMarginLeft }) => {
  const theme = data.site.siteMetadata.themeColours
  return (
    <Link to={href}>
      <button
        className={`${noMarginLeft ? primBtnStyles.noMarginLeft : ""} ${
          primBtnStyles.primBtn
        }`}
        style={{
          backgroundImage: `linear-gradient(270deg, ${theme.secondary_light} 0%, ${theme.secondary_dark} 100%)`,
        }}
      >
        {buttonText}
      </button>
    </Link>
  )
}

const PrimaryButton = props => {
  const data = useStaticQuery(graphql`
    query PrimaryButtonThemeQuery {
      site {
        siteMetadata {
          themeColours {
            primary_dark
            primary_light
            secondary_dark
            secondary_light
          }
        }
      }
    }
  `)
  return <PurePrimaryButton {...props} data={data} />
}

export default PrimaryButton
