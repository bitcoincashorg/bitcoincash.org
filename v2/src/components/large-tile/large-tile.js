import React from "react"
import { Col } from "react-bootstrap"
import PrimaryButton from "../buttons/primary-button"
import LargeTilestyle from "./large-tile.module.css"

const LargeTile = ({ content, buttontext, href, children }) => {
  return (
    <Col md={8}>
      <div className={LargeTilestyle.card}>
        <div className={LargeTilestyle.cardimgcontainer}>{children}</div>
        <div className={LargeTilestyle.cardcontentcontainer}>
          {content.map(item => (
            <>
              <h3>{item.subtitle}</h3>
              <h4>{item.title}</h4>
              <p>{item.paragraph}</p>
            </>
          ))}
          {buttontext && (
            <PrimaryButton
              noMarginLeft={true}
              buttonText={buttontext}
              href={href}
            />
          )}
        </div>
      </div>
    </Col>
  )
}

export default LargeTile
