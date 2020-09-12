/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import fbt from "fbt"
import TwitterImage from "assets/images/bitcoincash-org.jpg"

function SEO({ description, lang, meta, title, twitter_image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
  )
  const metadescription = description || <fbt desc="Default SEO page description">Bitcoin Cash brings sound money to the world. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.</fbt>
  const metatwitterImage = twitter_image || TwitterImage

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metadescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metadescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: "summary_large_image",
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:image`,
          content: metatwitterImage,
        },
        {
          name: `twitter:description`,
          content: metadescription,
        },
      ].concat(meta)}
    >
      <noscript>{`
        <style type="text/css">
          [data-sal|='fade'] {
            opacity: 1;
          }
      
          [data-sal|='slide-up'],
          [data-sal|='slide-down'],
          [data-sal|='zoom'] {
            opacity: 1;
            transform: none;
          }
      
          [data-sal|='flip'] {
            transform: none;
          }
        </style>
      `}</noscript>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
