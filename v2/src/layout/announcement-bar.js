import React from "react"
import fbt from "fbt"
import S from "./announcement-bar.module.scss"
import Link from "global/link"
import { Accordion } from "react-bootstrap"
import Checkmark from "assets/icons/checkmark.svg"
import UpgradeDate from "global/upgrade-date.js"
import LinkIcon from "assets/icons/link.svg"
import ShareIcon from "assets/icons/share.svg"
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

const ImplementationLink = ({ text, href }) => {
  return (
    <Link className={S.panelLink} href={href} target="_blank" rel="noreferrer">
      <LinkIcon />
      {text}
    </Link>
  )
}

const CopyLink = () => {
  const el = document.createElement("textarea")
  const notice = document.getElementById("copiedNotice")
  el.value = "https://www.bitcoincash.org/upgrade/"
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
  notice.style.display = "inline-block"
  setTimeout(function () {
    notice.style.display = "none"
  }, 1200)
}

const AnnouncementBar = () => {
  return (
    <Accordion
      className={S.accordionSection}
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
              <p>
                <fbt desc="Annoucement bar second paragraph">
                  During the network upgrade, a chain split is likely to occur
                  which could result in two chains: BCHA and BCHN.
                </fbt>
              </p>
              <div className={S.buttonContainer}>
                <div id="copiedNotice" className={S.copiedNotice}>
                  <fbt desc="notice that link has been copied to clipboard">
                    Link Copied
                  </fbt>
                </div>
                <button className={S.panelButton} onClick={() => CopyLink()}>
                  <ShareIcon />
                  <fbt desc="'share' button on announcement bar at top of page">
                    Share
                  </fbt>
                </button>
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
            </div>
          </div>
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default AnnouncementBar
