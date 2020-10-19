import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import S from "./whitepaper.module.scss"
import { Container, Row, Col } from "react-bootstrap"
import { useLocaleContext } from "i18n/provider"
import locales from "i18n/locales"
import Icon from "assets/icons/wallets/paper-wallet.svg"

const whitepapers = Object.entries(locales).map(([_, locale]) => {
  let link = "/bitcoin-" + locale.slug + ".pdf"
  return { label: locale.displayName, href: link }
})

const OriginalPDF = ({ md }) => {
  return (
    <Col md={md} className={`${S.pdflink} ${S.featuredpdflink}`}>
      <a href={"/bitcoin.pdf"} target="_blank" rel="noreferrer">
        <Icon />
        English (
        <fbt desc="Label for english whitepaper saying its the original">
          Original
        </fbt>
        )
      </a>
    </Col>
  )
}

const Whitepaper = () => {
  const { slug, displayName } = useLocaleContext()
  return (
    <>
      <SEO title={fbt("Bitcoin Whitepaper", "Whitepaper page SEO title")} />
      <Container>
        <Row>
          {slug === "" ? (
            <OriginalPDF md={12} />
          ) : (
            <>
              <Col md={6} className={`${S.pdflink} ${S.featuredpdflink}`}>
                <a
                  href={"/bitcoin-" + slug + ".pdf"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                  {displayName}
                </a>
              </Col>
              <OriginalPDF md={6} />
            </>
          )}

          {whitepapers.map(whitepapers =>
            whitepapers.label !== "English (US)" &&
            whitepapers.label !== displayName ? (
              <Col md={4} className={S.pdflink}>
                <a href={whitepapers.href} target="_blank" rel="noreferrer">
                  <Icon />
                  {whitepapers.label}
                </a>
              </Col>
            ) : null
          )}
        </Row>
      </Container>
    </>
  )
}

export default Whitepaper
