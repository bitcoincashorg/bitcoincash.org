import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import PrimaryButton from "components/buttons/primary-button"

const NotFoundPage = () => (
  <>
    <SEO title="404 Page Not Found" />
    <Container style={{ paddingTop: "200px", paddingBottom: "200px" }}>
      <h2>
        <fbt desc="404 page header">
          The page you are looking for does not exist.
        </fbt>
      </h2>
      <PrimaryButton
        noMarginLeft={true}
        buttonText={fbt("Go to the homepage", "404 page button")}
        href={"/"}
      />
    </Container>
  </>
)

export default NotFoundPage
