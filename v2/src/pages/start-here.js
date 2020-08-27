import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import S from './start-here.module.scss';






const StartHerePage = () => {
  return (
    <>
      <SEO title="Start Here" />
      <Container>
        <Row>
          <Col sm={6} className={S.styles}>
            content
          </Col>
          <Col sm={6} className={S.styles}>
            content
          </Col>
        </Row>
      </Container>
      
    </>
  )
}

export default StartHerePage
