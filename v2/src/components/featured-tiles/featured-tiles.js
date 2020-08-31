import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import tilesStyles from "./tiles.module.css"
import Link from "global/link.js"

const TilesComponent = ({ tiles, md }) => {
  return (
    <Container>
      <Row>
        {tiles.map(item => (
          <Col md={md} className={tilesStyles.tile}>
            <Link to={item.link} target="_blank" rel="noreferrer">
              <img src={item.img} alt={item.alt} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TilesComponent
