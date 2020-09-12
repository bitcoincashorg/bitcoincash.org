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
      <SEO title={fbt("Bitcoin Cash Projects", "Projects page SEO title")} />
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
