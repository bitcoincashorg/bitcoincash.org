import React from "react"
import { Row, Col } from "react-bootstrap"
import Sidebarstyle from "./sidebar.module.css"

const Sidebar = ({ content, title }) => {
  return (
    <Col md={4}>
      <div className={Sidebarstyle.card}>
        <h3>{title}</h3>
        {content.map(item => {
          let tile = (
            <>
              <Col xs={3} className={Sidebarstyle.cardIcon}>
                {item.icon}
              </Col>
              <Col xs={9} className={Sidebarstyle.cardIconText}>
                <h4>{item.title}</h4>
                <p>{item.paragraph}</p>
              </Col>
            </>
          )
          if (item.link) {
            tile = <a href={item.link}>{tile}</a>
          }
          return <Row className={Sidebarstyle.cardIconRow}>{tile}</Row>
        })}
      </div>
    </Col>
  )
}

export default Sidebar
