import React, { useState, useRef } from "react"
import fbt from "fbt"
import S from "./announcement-bar.module.scss"
import DismissBtn from "assets/images/close.png"
import PrimaryButton from "../buttons/primary-button"

function Accordion() {
  const [setActive, setActiveState] = useState("")
  const [setHeight, setHeightState] = useState("0px")
  const [setRotate, setRotateState] = useState(`${S.accordionIcon}`)
  const [setDismiss, setDismissState] = useState("")

  const content = useRef(null)

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "")
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    )
    setRotateState(
      setActive === "active" ? `${S.dismiss}` : `${S.dismiss} ${S.rotate}`
    )
  }

  function closeAccordion() {
    setActiveState(setActive === "" ? "active" : "")
    setDismissState(setDismiss === "active" ? "0px" : "none")
  }

  return (
    <div className={S.accordionSection} style={{ display: `${setDismiss}` }}>
      <div className={`${S.accordion} ${setActive}`} onClick={toggleAccordion}>
        <div className={S.accordionTitle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path>
          </svg>
          <fbt desc="Annoucement bar reminder headline">Reminder: November 15th, 2020 Planned Network Upgrade</fbt>
        </div>
        
        <img src={DismissBtn} className={`${setRotate} ${S.dismiss}`} alt="close" onClick={closeAccordion} />
       

      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className={S.accordionContent}
      >
        <div className={S.annoucementPanel}>
          <div className={S.annoucementPanelInner}>
            <h4><fbt desc="Annoucement bar inner headline">November 15th, 2020 Planned Network Upgrade</fbt></h4>
            <p>
            <fbt desc="Annoucement bar paragraph">
            The Bitcoin Cash network will undergo a protocol upgrade as per
              the roadmap. Businesses and individuals who use the Bitcoin Cash
              network should check to ensure that their software is compatible
              with the upgrade.
          </fbt>
              
            </p>
            <PrimaryButton
              noMarginLeft={true}
              buttonText={fbt(
                "See Roadmap",
                "Primary button of the annoucement bar"
              )}
              href={"/roadmap"}
            />
            <a className={S.panelButton} onClick={toggleAccordion}>
            <fbt desc="close button">Close</fbt>
            </a>
          </div>
          <div className={`${S.annoucementPanelInner} ${S.centerPanel}`}>
            <h4><fbt desc="Annoucement bar 'Compatible Implementations'">Compatible Implementations:</fbt></h4>
            <a
              className={S.panelButton2}
              href="https://www.bitcoinabc.org/2020-08-18-bitcoin-abc-0-22-0/"
            >
              Bitcoin ABC 0.22.x
            </a>
            <h4>Additional Information:</h4>
            <a className={S.panelButton2} href="/spec/2020-11-15-upgrade.html">
            <fbt desc="Annoucement bar 'Upgrade Specification'">Upgrade Specification</fbt>
            </a>
            <a
              className={S.panelButton2}
              href="https://github.com/bitcoincashorg/bitcoincash.org/blob/master/workgroups/wg-testing/2020-11-15_upgrade_testnet.md"
            >
              <fbt desc="Annoucement bar 'Testnet Information'">Testnet Information</fbt>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
