import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import S from "./whitepaper.module.scss"
import { Container, Row, Col } from "react-bootstrap"
import Icon from "assets/icons/wallets/paper-wallet.svg"

const PDF = ({ href, label }) => {
  return (
    <Col md={4} className={S.pdflink}>
      <a href={href} target="_blank"><Icon />{label}</a>
    </Col>
  )
}

const Whitepaper = () => {
  return (
    <>
      <SEO title={fbt("Bitcoin Whitepaper", "Whitepaper page SEO title")} />
      <Container>
        <Row>  
          <PDF href="/bitcoin.pdf" label="English" />
          <PDF href="/bitcoin-de.pdf" label="Deutsch" />
          <PDF href="/bitcoin-es.pdf" label="Español" />
          <PDF href="/bitcoin-es_419.pdf" label="Español Latin América" />
          <PDF href="/bitcoin-fr.pdf" label="Français" />
          <PDF href="/bitcoin-id.pdf" label="Bahasa Indonesia" />
          <PDF href="/bitcoin-ja.pdf" label="日本語" />
          <PDF href="/bitcoin-ko.pdf" label="한국어" />
          <PDF href="/bitcoin-nl.pdf" label="Nederlands" />  
          <PDF href="/bitcoin-pt-BR.pdf" label="Português Brasil" />  
          <PDF href="/bitcoin-pt-PT.pdf" label="Português Portugal" />  
          <PDF href="/bitcoin-ru.pdf" label="Русский" />  
          <PDF href="/bitcoin-tr.pdf" label="Türkçe" />  
          <PDF href="/bitcoin-zh-CN.pdf" label="简体中文" />   
        </Row>
      </Container>
      
    </>
  )
}

export default Whitepaper
