import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import tilesStyles from "./featured-tiles.module.css"
import Link from "global/link.js"

const FeaturedTiles = ({ tiles, md }) => {
  return (
    <Container>
      <Row>
        {tiles.map(item => (
          <Col md={md} className={tilesStyles.tile}>
            <Link to={item.link} target="_blank" rel="noreferrer">
              <img src={item.img} alt={item.alt} />
              <p>{item.text}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FeaturedTiles
