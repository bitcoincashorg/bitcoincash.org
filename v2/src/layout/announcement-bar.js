import React from "react"
import fbt from "fbt"
import S from "./announcement-bar.module.scss"
import PrimaryButton from "components/buttons/primary-button"
import Link from "global/link"
import { Accordion } from "react-bootstrap"
import Checkmark from "assets/icons/checkmark.svg"
import UpgradeDate from "global/upgrade-date.js"
import LinkIcon from "assets/icons/link.svg"
import Countdown, { zeroPad } from "react-countdown"
import { ACTIVATION_TIMESTAMP } from "global/upgrade-date.js"
import Network from "assets/images/network.png"

const CountdownClock = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div>
        <div className={S.countdownContainer}>
          <div className={S.countdownUnitContainer}>
            <div className={S.countdownUnit}>00</div>
            <div className={S.countdownLabel}>
              <fbt desc="clock label 'days'">Days</fbt>
            </div>
          </div>
          <div className={S.colon}>&#58;</div>
          <div className={S.countdownUnitContainer}>
            <div className={S.countdownUnit}>00</div>
            <div className={S.countdownLabel}>
              <fbt desc="clock label 'hours'">Hours</fbt>
            </div>
          </div>
          <div className={S.colon}>&#58;</div>
          <div className={S.countdownUnitContainer}>
            <div className={S.countdownUnit}>00</div>
            <div className={S.countdownLabel}>
              <fbt desc="clock label 'minutes'">Minutes</fbt>
            </div>
          </div>
          <div className={S.colon}>&#58;</div>
          <div className={S.countdownUnitContainer}>
            <div className={S.countdownUnit}>00</div>
            <div className={S.countdownLabel}>
              <fbt desc="clock label 'seconds'">Seconds</fbt>
            </div>
          </div>
        </div>
        <h4 className={S.completeHeader}>
          <span role="img" aria-label="party popper emoji">
            &#127881;
          </span>{" "}
          <fbt desc="Annoucement bar countdown complete header">
            Upgrade complete!
          </fbt>{" "}
          <span role="img" aria-label="party popper emoji">
            &#127881;
          </span>
        </h4>
      </div>
    )
  } else {
    return (
      <div className={S.countdownContainer}>
        <div className={S.countdownUnitContainer}>
          <div className={S.countdownUnit}>{zeroPad(days, 2)}</div>
          <div className={S.countdownLabel}>
            <fbt desc="clock label 'days'">Days</fbt>
          </div>
        </div>
        <div className={S.colon}>&#58;</div>
        <div className={S.countdownUnitContainer}>
          <div className={S.countdownUnit}>{zeroPad(hours, 2)}</div>
          <div className={S.countdownLabel}>
            <fbt desc="clock label 'hours'">Hours</fbt>
          </div>
        </div>
        <div className={S.colon}>&#58;</div>
        <div className={S.countdownUnitContainer}>
          <div className={S.countdownUnit}>{zeroPad(minutes, 2)}</div>
          <div className={S.countdownLabel}>
            <fbt desc="clock label 'minutes'">Minutes</fbt>
          </div>
        </div>
        <div className={S.colon}>&#58;</div>
        <div className={S.countdownUnitContainer}>
          <div className={S.countdownUnit}>{zeroPad(seconds, 2)}</div>
          <div className={S.countdownLabel}>
            <fbt desc="clock label 'seconds'">Seconds</fbt>
          </div>
        </div>
      </div>
    )
  }
}

const AnnouncementBar = () => {
  return (
    <Accordion
      className={S.accordionSection}
      defaultActiveKey="0"
      style={{ backgroundImage: `url(${Network})` }}
    >
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
              <h4 className={S.panelHeader}>
                <fbt desc="Annoucement bar inner headline">
                  Planned Network Upgrade
                </fbt>
              </h4>
              <Countdown
                date={ACTIVATION_TIMESTAMP * 1000}
                renderer={CountdownClock}
              />
              <p>
                <fbt desc="Annoucement bar paragraph">
                  The Bitcoin Cash network will undergo a protocol upgrade as
                  per <Link to="/roadmap/">the roadmap</Link>. Businesses and
                  other node operators who use the Bitcoin Cash network should
                  check to ensure that their software is compatible with the
                  upgrade.
                </fbt>
              </p>
              <div className={S.buttonContainer}>
                <PrimaryButton
                  noMarginLeft={true}
                  className={S.primaryButton}
                  buttonText={fbt(
                    "Prepare for the Upgrade",
                    "Annoucement bar 'Prepare for the Upgrade'"
                  )}
                  href={
                    "https://blog.bitcoinabc.org/2020/09/14/preparing-businesses-for-a-successful-network-upgrade/"
                  }
                />

                <Accordion.Toggle as={S.panelButton}>
                  <button className={S.panelButton}>
                    <fbt desc="'close' button on announcement bar at top of page to close the bar">
                      Close
                    </fbt>
                  </button>
                </Accordion.Toggle>
              </div>
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
                <LinkIcon />
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
                <LinkIcon />
                <fbt desc="Annoucement bar 'Upgrade Specification'">
                  Upgrade Specification
                </fbt>
              </Link>
              <Link
                className={S.panelLink}
                href="https://github.com/bitcoincashorg/bitcoincash.org/blob/master/workgroups/wg-testing/2020-11-15_upgrade_testnet.md"
              >
                <LinkIcon />
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
