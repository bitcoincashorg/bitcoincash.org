import React from "react"
import fbt from "fbt"
import S from "./announcement-bar.module.scss"
import PrimaryButton from "components/buttons/primary-button"
import Link from "global/link"
import { Accordion } from "react-bootstrap"

const AccordionComponent = () => {
  return (
    <Accordion className={S.accordionSection}>
      <Accordion.Toggle as={S.accordionSection} eventKey="0">
        <div className={S.accordionTitle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path>
          </svg>
          <fbt desc="Annoucement bar reminder headline">
            Reminder: November 15th, 2020 Planned Network Upgrade
          </fbt>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <div className={S.accordionContent}>
          <div className={S.annoucementPanel}>
            <div className={S.annoucementPanelInner}>
              <h4>
                <fbt desc="Annoucement bar inner headline">
                  November 15th, 2020 Planned Network Upgrade
                </fbt>
              </h4>
              <p>
                <fbt desc="Annoucement bar paragraph">
                  The Bitcoin Cash network will undergo a protocol upgrade as
                  per the roadmap. Businesses and individuals who use the
                  Bitcoin Cash network should check to ensure that their
                  software is compatible with the upgrade.
                </fbt>
              </p>
              <Accordion.Toggle as={S.primaryButton}>
                <PrimaryButton
                  noMarginLeft={true}
                  className={S.primaryButton}
                  buttonText={fbt(
                    "See Roadmap",
                    "'See Roadmap' button of the annoucement bar"
                  )}
                  href={"/roadmap"}
                />
              </Accordion.Toggle>
              <Accordion.Toggle as={S.panelButton}>
                <button className={S.panelButton}>
                  <fbt desc="close button">Close</fbt>
                </button>
              </Accordion.Toggle>
            </div>
            <div className={`${S.annoucementPanelInner} ${S.centerPanel}`}>
              <h4>
                <fbt desc="Annoucement bar 'Compatible Implementations'">
                  Compatible Implementations:
                </fbt>
              </h4>
              <Link
                className={S.panelLink}
                href="https://www.bitcoinabc.org/2020-08-18-bitcoin-abc-0-22-0/"
              >
                Bitcoin ABC 0.22.x
              </Link>
              <h4>
                <fbt desc="Annoucement bar 'Additional Information:'">
                  Additional Information:
                </fbt>
              </h4>
              <Link
                className={S.panelLink}
                href="/spec/2020-11-15-upgrade.html"
              >
                <fbt desc="Annoucement bar 'Upgrade Specification'">
                  Upgrade Specification
                </fbt>
              </Link>
              <Link
                className={S.panelLink}
                href="https://github.com/bitcoincashorg/bitcoincash.org/blob/master/workgroups/wg-testing/2020-11-15_upgrade_testnet.md"
              >
                <fbt desc="Annoucement bar 'Testnet Information'">
                  Testnet Information
                </fbt>
              </Link>
            </div>
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default AccordionComponent
