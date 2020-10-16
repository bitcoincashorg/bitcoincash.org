import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { useLocaleContext } from "i18n/provider"

const Whitepaper = () => {
  const { slug } = useLocaleContext()
  let suffix = ""
  if (slug !== "") {
    suffix += "-" + slug 
  }
  return (
    <>
      <SEO title={fbt("Bitcoin Whitepaper", "Whitepaper page SEO title")} />
      <iframe
        title="Bitcoin Whitepaper"
        src={"/bitcoin" + suffix + ".pdf#view=FitH"}
        width="100%"
        height="1000px"
        style={{ marginBottom: "0px" }}
      />
    </>
  )
}

export default Whitepaper
