import React from "react"
import fbt from "fbt"
import S from "./announcement-bar.module.scss"
import PrimaryButton from "components/buttons/primary-button"
import Link from "global/link"
import { Accordion } from "react-bootstrap"
import Checkmark from "assets/icons/checkmark.svg"
import UpgradeDate from "global/upgrade-date.js"

const AnnouncementBar = () => {
  return (
    <Accordion className={S.accordionSection}>
      <Accordion.Toggle as={S.accordionSection} eventKey="0">
        <div className={S.accordionTitle}>
          <Checkmark />
          <fbt desc="Annoucement bar reminder headline">
            Reminder:
            <fbt:param name="upgrade activation time">
              <UpgradeDate />
            </fbt:param>
            Planned Network Upgrade
          </fbt>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <div className={S.accordionContent}>
          <div className={S.annoucementPanel}>
            <div className={S.annoucementPanelInner}>
              <h4>
                <fbt desc="Annoucement bar inner headline">
                  <fbt:param name="upgrade activation time">
                    <UpgradeDate />
                  </fbt:param>
                  Planned Network Upgrade
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
                  href={"/roadmap/"}
                />
              </Accordion.Toggle>
              <Accordion.Toggle as={S.panelButton}>
                <button className={S.panelButton}>
                  <fbt desc="'close' button on announcement bar at top of page to close the bar">
                    Close
                  </fbt>
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
                href="https://blog.bitcoinabc.org/2020/09/14/preparing-businesses-for-a-successful-network-upgrade/"
              >
                <fbt desc="Annoucement bar 'Prepare for the Upgrade'">
                  Prepare for the Upgrade
                </fbt>
              </Link>
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

export default AnnouncementBar
