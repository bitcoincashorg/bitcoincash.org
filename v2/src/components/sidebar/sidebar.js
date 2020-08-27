import React from "react"
import { Row, Col } from "react-bootstrap"
import Sidebarstyle from "./sidebar.module.css"

const Sidebar = ({ content, title }) => {
  return (
    <>
      <Col md={4} className={Sidebarstyle.card}>
        <h3>{title}</h3>
        {content.map((item, i) => {
          return (
            <Row key={i} className={Sidebarstyle.cardIconRow}>
              <Col xs={3} className={Sidebarstyle.cardIcon}>
                {item.icon}
              </Col>
              <Col xs={9} className={Sidebarstyle.cardIconText}>
                <h4>{item.title}</h4>
                <p>{item.paragraph}</p>
              </Col>
            </Row>
          )
        })}
      </Col>
    </>
  )
}

export default Sidebar
