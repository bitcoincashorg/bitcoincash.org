import React from "react"
import fbt from "fbt"
import { Col } from "react-bootstrap"
import Link from "global/link.js"
import S from "./graphics-tile.module.css"

const GraphicsTile = ({
  lg,
  title,
  img,
  smallImg,
  mediumImg,
  largeImg,
  fullImg,
  vectorImg,
}) => {
  return (
    <Col lg={lg} md={6}>
      <div className={S.logoCard}>
        <h4>{title}</h4>
        <img src={img} alt="Bitcoin Cash Logo" />
        <Link href={smallImg} target="_blank">
          <fbt desc="Logos page button text for small version of image">
            Small (PNG)
          </fbt>
        </Link>
        <Link href={mediumImg} target="_blank">
          <fbt desc="Logos page button text for medium version of image">
            Medium (PNG)
          </fbt>
        </Link>
        <Link href={largeImg} target="_blank">
          <fbt desc="Logos page button text for large version of image">
            Large (PNG)
          </fbt>
        </Link>
        <Link href={fullImg} target="_blank">
          <fbt desc="Logos page button text for full version of image">
            Full (PNG)
          </fbt>
        </Link>
        <Link href={vectorImg} target="_blank">
          <fbt desc="Logos page button text for vector version of image">
            Vector (SVG)
          </fbt>
        </Link>
      </div>
    </Col>
  )
}

export default GraphicsTile
