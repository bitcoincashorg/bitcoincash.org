import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container } from "react-bootstrap"
import Link from "global/link"
import S from "./upgrade.module.scss"
import UpgradeDate from "global/upgrade-date.js"
import LinkIcon from "assets/icons/link.svg"

const ImplementationLink = ({ text, href }) => {
  return (
    <Link className={S.panelLink} href={href} target="_blank" rel="noreferrer">
      <LinkIcon />
      {text}
    </Link>
  )
}

const UpgradePage = () => {
  return (
    <>
      <SEO title={fbt("How to Upgrade", "Upgrade page SEO title")} />
      <Container className={S.linkcontainer}>
        <h3>
          <UpgradeDate /> |{" "}
          <fbt desc="Upgrade page subheadline">Planned Network Upgrade</fbt>
        </h3>
        <p>
          <fbt desc="upgrade page paragraph">
            The Bitcoin Cash network will undergo a protocol upgrade as per{" "}
            <Link to="/roadmap/">the roadmap</Link>. Businesses and other node
            operators who use the Bitcoin Cash network should check to ensure
            that their software is compatible with the upgrade.
          </fbt>
        </p>
        <p>
          <fbt desc="upgrade page second paragraph">
            During the network upgrade, a chain split is likely to occur which
            could result in two chains: BCHA and BCHN.
          </fbt>
        </p>
        <h4>
          BCHA-
          <fbt desc="Annoucement bar 'Compatible Implementations'">
            Compatible Implementations:
          </fbt>
        </h4>
        <ImplementationLink
          text="Bitcoin ABC 0.22.x"
          href="https://www.bitcoinabc.org/2020-08-18-bitcoin-abc-0-22-0/"
        />
        <ImplementationLink
          text="BCHD 0.17.0 (non-mining)"
          href="https://github.com/gcash/bchd/releases"
        />
        <h4>
          BCHN-
          <fbt desc="Annoucement bar 'Compatible Implementations'">
            Compatible Implementations:
          </fbt>
        </h4>
        <ImplementationLink
          text="Bitcoin ABC 0.22.6+ (BCHN network)"
          href="https://www.bitcoinabc.org/releases/#0.22.6"
        />
        <ImplementationLink
          text="BCHN 22.x.x"
          href="https://bitcoincashnode.org/en/download.html"
        />
        <ImplementationLink
          text="BCHD 0.17.0"
          href="https://github.com/gcash/bchd/releases"
        />
      </Container>
    </>
  )
}

export default UpgradePage
