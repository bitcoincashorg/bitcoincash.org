import scndBtnStyles from './secondary-button.module.css';
import React from 'react';
import { useStaticQuery, graphql } from "gatsby"

const SecondaryButton = ({buttonText, href, noMarginLeft}) => {
    const data = useStaticQuery(graphql`
    query SecondaryButtonThemeQuery {
        site {
        siteMetadata {
            themeColours {
            secondary_dark,
            secondary_light
            }
        }
        }
    }
    `)
    const theme = data.site.siteMetadata.themeColours;
    return (
        <a href={href}>
        <button className={`${noMarginLeft ? scndBtnStyles.noMarginLeft : '' } ${scndBtnStyles.scndBtn}`} style={{background: 'transparent', border: `2px solid ${theme.secondary_light}`}}>
            {buttonText}
        </button>
        </a>
    )
}
export default SecondaryButton;