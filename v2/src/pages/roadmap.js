import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import roadmapStyle from "./roadmap.module.scss"
import Check from "assets/icons/check.svg"
import Underway from "assets/icons/underway.svg"
import Planned from "assets/icons/planned.svg"
import Rocket from "assets/icons/rocket.svg"
import Ribbon from "assets/icons/ribbon.svg"
import Logo from "assets/images/bitcoin-cash-logo-medium.png"

const RoadmapItem = ({ state, title, children }) => {
  let icon = ""
  switch (state) {
    case "complete":
      icon = <Check />
      break
    case "underway":
      icon = <Underway />
      break
    case "planned":
      icon = <Planned />
      break
    case "rocket":
      icon = <Rocket />
      break
    case "ribbon":
      icon = <Ribbon />
      break

    default:
      throw new Error("Invalid state " + state)
  }

  return (
    <li>
      <h4>{title}</h4>
      <p>{children}</p>
      <div className={`${roadmapStyle.colicon} ${roadmapStyle[state]}`}>
        {icon}
      </div>
    </li>
  )
}

const RoadmapColumn = ({ className, title, items }) => {
  return (
    <div className={className}>
      <h3
        className={`${roadmapStyle.grayHeaders} ${roadmapStyle.grayHeadersmargin}`}
      >
        {title}
      </h3>
      <ul class={roadmapStyle.list}>
        {items.map(item => (
          <RoadmapItem title={item.title} state={item.state}>
            {item.content}
          </RoadmapItem>
        ))}
      </ul>
    </div>
  )
}

const Roadmap = () => {
  const sclaingItems = [
    {
      title: fbt(
        "Can. Transaction Ordering",
        "Roadmap scaling item: Canonical transaction ordering"
      ),
      content: fbt(
        "(scalable block processing)",
        "Roadmap scaling description: Canonical transaction ordering"
      ),
      state: "complete",
    },
    {
      title: fbt(
        "Schnorr Signatures",
        "Roadmap scaling item: Schnorr Signatures"
      ),
      content: fbt(
        "(batched signature validation)",
        "Roadmap scaling description: Schnorr Signatures"
      ),
      state: "complete",
    },
    {
      title: fbt(
        "Faster Block Propagation",
        "Roadmap scaling item: Faster block propagation"
      ),
      content: fbt(
        "(graphene or other)",
        "Roadmap scaling description: Faster block propagation"
      ),
      state: "underway",
    },
    {
      title: fbt("UTXO Commitment", "Roadmap scaling item: UTXO Commitment"),
      content: fbt(
        "(blockchain pruning)",
        "Roadmap scaling description: UTXO Commitment"
      ),
      state: "underway",
    },
    {
      title: fbt("Merklix-Metadata Tree", "Roadmap scaling item: Merklix"),
      content: fbt(
        "(scalable block processing)",
        "Roadmap scaling description: Merklix"
      ),
      state: "planned",
    },
    {
      title: fbt(
        "Adaptive Block Size",
        "Roadmap scaling item: Adaptive Block Size"
      ),
      content: fbt(
        "(market driven growth to 1TB blocks)",
        "Roadmap scaling description: Adaptive Block Size"
      ),
      state: "planned",
    },
    {
      title: fbt("Mankind Scale", "Roadmap scaling conclusion item"),
      content: fbt(
        "50 transactions / day for 10 billion humans",
        "Roadmap scaling conclusion description"
      ),
      state: "rocket",
    },
  ]

  const usabilityItems = [
    {
      title: "CashAddr",
      content: fbt(
        "(easier & safer to user)",
        "Roadmap usability description: CashAddr"
      ),
      state: "complete",
    },
    {
      title: "Sighash",
      content: fbt(
        "(hardware wallet security)",
        "Roadmap usability description: Sighash"
      ),
      state: "complete",
    },
    {
      title: fbt(
        "Fee Improvements",
        "Roadmap usability item: Fee Improvements"
      ),
      content: fbt(
        "(cheaper transactions)",
        "Roadmap usability description: Fee Improvements"
      ),
      state: "underway",
    },
    {
      title: fbt("Pre-consensus", "Roadmap usability item: Pre-consensus"),
      content: fbt(
        "(near instant security for merchants)",
        "Roadmap usability description: Pre-consensus"
      ),
      state: "underway",
    },
    {
      title: fbt(
        "Fractional Satoshis",
        "Roadmap usability item: Fractional Satoshis"
      ),
      content: fbt(
        "(fees low forever)",
        "Roadmap usability description: Fractional Satoshis"
      ),
      state: "planned",
    },
    {
      title: fbt("Best Money", "Roadmap usability conclusion item"),
      content: fbt(
        "secure within 3 seconds - transaction fees forever low",
        "Roadmap usability conclusion description"
      ),
      state: "ribbon",
    },
  ]

  const extensibilityItems = [
    {
      title: fbt("Basic Opcodes", "Roadmap extensibility item: Basic Opcodes"),
      content: null,
      state: "complete",
    },
    {
      title: fbt(
        "223 bytes OP_RETURN",
        "Roadmap extensibility item: OP_RETURN"
      ),
      content: fbt(
        "(social networks on chain)",
        "Roadmap extensibility description: OP_RETURN"
      ),
      state: "complete",
    },
    {
      title: "OP_CHECKDATASIG",
      content: fbt(
        "(oracles and advanced scripts)",
        "Roadmap extensibility description: OP_CHECKDATASIG"
      ),
      state: "complete",
    },
    {
      title: fbt(
        "More Basic Opcodes",
        "Roadmap extensibility item: More Basic Opcodes"
      ),
      content: null,
      state: "underway",
    },
    {
      title: fbt(
        "New Transaction Format",
        "Roadmap extensibility item: New Transaction Format"
      ),
      content: fbt(
        "(more capable, more compact)",
        "Roadmap extensibility description: New Transaction Format"
      ),
      state: "planned",
    },
    {
      title: fbt("Token Economy", "Roadmap usability conclusion item"),
      content: fbt(
        "all classes of assets traded on the blockchain",
        "Roadmap usability conclusion description"
      ),
      state: "ribbon",
    },
  ]

  return (
    <>
      <div className={roadmapStyle.roadmap}>
        <div className={roadmapStyle.toplegendcontainer}>
          <div className={roadmapStyle.toplegendcol}>
            <div className={roadmapStyle.completetop}>
              <Check />
              <div className={roadmapStyle.completetoptext}>
                <fbt desc="Complete icon on the roadmap legend">Complete</fbt>
              </div>
            </div>
          </div>
          <div className={roadmapStyle.toplegendcol}>
            <div className={roadmapStyle.underwaytop}>
              <Underway />
              <div>
                <fbt desc="Underway icon on the roadmap legend">Underway</fbt>
              </div>
            </div>
          </div>
          <div className={roadmapStyle.toplegendcol}>
            <div className={roadmapStyle.plannedtop}>
              <Planned />
              <div>
                <fbt desc="Planed icon on the roadmap legend">Planned</fbt>
              </div>
            </div>
          </div>
        </div>
        <div className={roadmapStyle.roadmapRow}>
          <div className={roadmapStyle.logosection}>
            <img src={Logo} alt="Bitcoin Cash roadmap" />
            <h3 className={roadmapStyle.grayHeaders}>
              <fbt desc="Top roadmap item">Roadmap</fbt>
            </h3>
          </div>
        </div>
      </div>
      <div className={roadmapStyle.roadmapRow2}>
        <div className={roadmapStyle.roadmapHorizontalBar}></div>
      </div>
      <div className={roadmapStyle.roadmapRow}>
        <RoadmapColumn
          title={fbt("Scaling", "Roadmap scaling section title")}
          className={`${roadmapStyle.roadmapCol} ${roadmapStyle.scaling}`}
          items={sclaingItems}
        />
        <RoadmapColumn
          title={fbt("Usability", "Roadmap usability section title")}
          className={`${roadmapStyle.roadmapCol} ${roadmapStyle.usability}`}
          items={usabilityItems}
        />
        <RoadmapColumn
          title={fbt("Extensibility", "Roadmap extensibility section title")}
          className={`${roadmapStyle.roadmapCol} ${roadmapStyle.extensibility}`}
          items={extensibilityItems}
        />
      </div>
      <div className={roadmapStyle.roadmapRow3}>
        <div className={roadmapStyle.roadmapHorizontalBar}></div>
        <div className={roadmapStyle.roadmapverticalBar}></div>
        <div className={roadmapStyle.roadmapverticalBar2}></div>
      </div>
      <div className={roadmapStyle.roadmapRow}>
        <div className={roadmapStyle.completeSection}>
          <h3 className={roadmapStyle.grayHeaders}>
            <fbt desc="Bottom roadmap item">Bitcoin Cash Protocol Complete</fbt>
          </h3>
        </div>
      </div>
    </>
  )
}

const RoadmapPage = () => {
  return (
    <>
      <SEO title={fbt("Roadmap", "Roadmap page SEO title")} />
      <div className={roadmapStyle.container}>
        <div className={roadmapStyle.topSection}>
          <h1>
            <fbt desc="Title of the roadmap page">The Bitcoin Cash Roadmap</fbt>
          </h1>
          <p>
            <fbt desc="Goal of the roadmap">
              The goal for Bitcoin Cash is to become sound money that is usable
              by everyone in the world. This is a civilization-changing
              technology which will dramatically increase human freedom and
              prosperity.
            </fbt>
          </p>
          <p>
            <fbt desc="Explaination of the roadmap">
              This roadmap is intended to provide high-level technical
              direction, and enable different technical teams to work together
              towards a common goal for advancing Bitcoin Cash. The role of
              developers in furthering this goal is to produce high-quality
              professional software that serves the needs of its users, miners
              and merchants. We strive for continuous technical improvement, to
              produce reliable products providing a solid foundation for Bitcoin
              Cash.
            </fbt>
          </p>
          <p>
            <fbt desc="Design of the roadmap">
              The basic design of Bitcoin Cash is sound. However, this does not
              mean it is perfect. It is prudent to make incremental improvements
              to the system with technically sound design and careful
              engineering. By implementing optimizations and protocol upgrades,
              peer-to-peer digital cash will scale many orders of magnitude
              beyond current limits.
            </fbt>
          </p>
        </div>

        <Roadmap />
        <div className={roadmapStyle.bottomSection}>
          <p>
            <b>
              <fbt desc="Technical need for the roadmap">
                The needed technical improvements can be divided into three
                categories:
              </fbt>
            </b>
            <ol>
              <li>
                <fbt desc="Roadmap 1st technical">
                  Enable Bitcoin Cash to scale from ~100 Tx/s to over 5,000,000
                  Tx/s. Protocol improvements must be made so that
                  mass-parallelization can enable this level of transaction
                  processing.
                </fbt>
              </li>
              <li>
                <fbt desc="Roadmap 2nd technical">
                  Improving the payment experience to ensure that it is instant
                  and reliable. Transactions should be secure within three
                  seconds.
                </fbt>
              </li>
              <li>
                <fbt desc="Roadmap 3rd technical">
                  Make Bitcoin Cash extensible. An extensible protocol makes
                  future improvements less disruptive, and provides a solid base
                  for businesses and developers to build on.
                </fbt>
              </li>
            </ol>
          </p>
          <p>
            <fbt desc="Roadmap's protocol upgrade explaination">
              The Bitcoin Cash network has protocol upgrades twice a year, on
              November 15th and May 15th. These upgrades are required for all
              node operators. They are sometimes referred to as "hard fork
              upgrades", but the term "scheduled protocol upgrades" is
              preferred.
            </fbt>
          </p>
          <p>
            <fbt desc="Roadmap's upgrade activation explaination">
              Rather than a specific block height, the upgrades are based on a
              timestamp. When the median timestamp of the most recent 11 blocks
              (MTP-11) is greater than or equal to UNIX timestamp of November
              15th (or May 15th) 12:00:00 UTC, the new protocol rules take
              effect. This better enables your business to prepare for the
              upgrade at a particular estimated time, plus or minus a few hours.
            </fbt>
          </p>
          <p>
            <fbt desc="Roadmap upgrade future expectation">
              Although this semi-annual upgrade schedule is not expected to
              continue forever, it is in place for the forseeable near-term
              future. Regular protocol upgrades provide a predictable cadence
              for the ecosystem, and are necessary to achieve the vision set
              forth in the roadmap.
            </fbt>
          </p>
          <p>
            <fbt desc="Roadmap conclusion">
              To become a solid base for application development and innovation,
              Bitcoin Cash must continuously improve and compete. Working
              together, we can build a technical foundation to empower Bitcoin
              Cash to be the best money the world has ever seen.
            </fbt>
          </p>
        </div>
      </div>
    </>
  )
}

export default RoadmapPage
