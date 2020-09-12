import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import Tiles from "components/tiles/tiles.js"
import * as AllProjects from "../partners/projects/*.js"

const ProjectsPage = () => {
  const projects = Object.values(AllProjects).map(getProjects => getProjects())

  return (
    <>
      <SEO
        title="Bitcoin Cash Projects"
        description={fbt(
          "Bitcoin Cash brings sound money to the world. Merchants and users are empowered with low fees and reliable confirmations. The future shines brightly with unrestricted growth, global adoption, permissionless innovation, and decentralized development.",
          "Default SEO page description"
        )}
      />
      <Container>
        <h2 className="centerh2">
          <fbt desc="'Projects' heading on projects page">Projects</fbt>
        </h2>
        <Tiles tiles={projects} md={3} />
      </Container>
    </>
  )
}

export default ProjectsPage
