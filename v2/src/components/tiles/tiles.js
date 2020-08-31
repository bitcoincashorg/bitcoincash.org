import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import tilesStyles from "./tiles.module.css"

const TilesComponent = ({ tiles, md }) => {
  return (
    <Container>
      <Row>
        {tiles.map(item => {
          return (
            <Col md={md} className={tilesStyles.tile}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                alt={item.alt}
              >
                <img src={item.img} />
              </a>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default TilesComponent
