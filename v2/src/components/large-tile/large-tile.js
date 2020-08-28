import React from "react"
import { Col } from "react-bootstrap"
import PrimaryButton from "../buttons/primary-button"
import LargeTilestyle from "./large-tile.module.css"

const LargeTile = ({ content, image, video, buttontext, imgalt }) => {
  if (video) {
    return (
      <>
        <Col md={8}>
          <div className={LargeTilestyle.card}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/OE3QTbgh-p8?rel=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="What is Bitcoin Cash"
            ></iframe>
            <div className={LargeTilestyle.cardcontentcontainer}>
              {content.map(item => {
                return (
                  <>
                    <h4>{item.subtitle}</h4>
                    <h3>{item.title}</h3>
                    <p>{item.paragraph}</p>
                  </>
                )
              })}
              <PrimaryButton
                noMarginLeft={true}
                buttonText={buttontext}
                href={"/faq.html"}
              />
            </div>
          </div>
        </Col>
      </>
    )
  }
  return (
    <>
      <Col md={8}>
        <div className={LargeTilestyle.card}>
          <div className={LargeTilestyle.cardimgcontainer}>
            <img src={image} alt={imgalt} />
          </div>
          {content.map(item => {
            return (
              <>
                <h3>{item.subtitle}</h3>
                <h4>{item.title}</h4>
                <p>{item.paragraph}</p>
              </>
            )
          })}
        </div>
      </Col>
    </>
  )
}

export default LargeTile
