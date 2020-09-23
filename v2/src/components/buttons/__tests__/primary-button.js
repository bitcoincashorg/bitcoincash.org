import React from "react"
import renderer from "react-test-renderer"
import { PurePrimaryButton } from "../primary-button"

describe("PrimaryButton", () => {
  it("renders correctly", () => {
    const data = {
      site: {
        siteMetadata: {
          themeColours: {
            primary_dark: "#040c3c",
            primary_light: "#212c6e",
            secondary_dark: "#bb5a00",
            secondary_light: "#ff8d00",
          },
        },
      },
    }

    const tree = renderer
      .create(<PurePrimaryButton data={data} href="http://localhost" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
