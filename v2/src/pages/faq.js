import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Accordion } from "react-bootstrap"
import S from "./faq.module.scss"
import PrimaryButton from "components/buttons/primary-button"

const FAQPage = () => {
  return (
    <>
      <SEO title={fbt("Frequently Asked Questions", "FAQs page SEO title")} />
      <Container className={S.titleContianer}>
        <h2>
          <fbt desc="FAQ page, faq section title">
            Frequently Asked Questions
          </fbt>
        </h2>
        <Accordion>
          <Accordion.Toggle className={S.accordionTitle} eventKey="0">
            <h4>
              <fbt desc="FAQ page, faq what is bitcoin cash">
                What is Bitcoin Cash?
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="0">
            <p>
              <fbt desc="FAQ page, faq what is bitcoin cash answer">
                Bitcoin Cash is a peer-to-peer electronic cash system. It's a
                permissionless, decentralized cryptocurrency that requires no
                trusted third parties and no central bank.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="1">
            <h4>
              <fbt desc="FAQ page, faq Is Bitcoin Cash different from 'Bitcoin'?">
                Is Bitcoin Cash different from 'Bitcoin'?
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="1">
            <p>
              <fbt desc="FAQ page, faq Is Bitcoin Cash different from 'Bitcoin' answer">
                In 2017, the Bitcoin project and its community split in two.
                Perhaps the least controversial way to refer to each side is
                simply by their respective ticker symbols, BTC and BCH. Bitcoin
                Cash is usually represented by the BCH ticker symbol and is
                considered by its supporters to be the legitimate continuation
                of the Bitcoin project as peer-to-peer digital cash.
              </fbt>
            </p>
          </Accordion.Collapse>
        </Accordion>
      </Container>
      <Container className={S.titleContianer}>
        <h2>
          <fbt desc="FAQ page, Why Use Bitcoin Cash? section title">
            Why Use Bitcoin Cash?
          </fbt>
        </h2>
        <Accordion>
          <Accordion.Toggle className={S.accordionTitle} eventKey="0">
            <h4>
              <fbt desc="FAQ page, why use section, Send Almost for Free title">
                Send Money Anywhere In the World, Almost for Free
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="0">
            <p>
              <fbt desc="FAQ page, why use section, Send Almost for Free text">
                With Bitcoin Cash, you can send money to anyone, anywhere in the
                world, 24 hours a day, 365 days a year. Like the Internet
                itself, the network is always on. No transaction is too big or
                too small. And you never need anyone’s permission or approval.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="1">
            <h4>
              <fbt desc="FAQ page, why use section, Be you own bank title">
                Be Your Own Bank and Have Full Control Over Your Money
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="1">
            <p>
              <fbt desc="FAQ page, why use section, be you own bank text">
                The seizing of capital from account holders (“bail-ins”) that
                occurred in Cyprus and nearly in Greece, demonstrated that bank
                deposits are only as safe as political leaders decide. Even
                under the best of conditions, banks can make mistakes, hold
                funds, freeze accounts, and otherwise prevent you from accessing
                your own money.
              </fbt>
              <br />
              <br />
              <fbt desc="FAQ page, why use section, be you own bank second text block">
                Banks can also decide to block your transactions, charge you
                fees, or close your account without warning. Bitcoin Cash gives
                you full, sovereign control over your funds, which you can
                access from anywhere in the world.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="2">
            <h4>
              <fbt desc="FAQ page, why use section, scarce supply title">
                A Scarce Digital Currency with a Known Fixed Supply
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="2">
            <p>
              <fbt desc="FAQ page, why use section, scarce supply text">
                The Bitcoin Cash protocol ensures there will never be more than
                21 million coins in existence. Governments continually print
                money, endlessly inflating the supply and devaluing everyone’s
                savings. Bitcoin Cash has a fixed supply and therefore
                represents sound money.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="3">
            <h4>
              <fbt desc="FAQ page, why use section, increase privacy title">
                Increase Your Privacy and Operate Anonymously
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="3">
            <p>
              <fbt desc="FAQ page, why use section, increase privacy text1">
                Bitcoin Cash offers more privacy and anonymity than traditional
                payment systems like bank transfers and credit card payments,
                since it's normally impossible to know who controls a Bitcoin
                address.
              </fbt>
              <br />
              <br />
              <fbt desc="FAQ page, why use section, increase privacy text2">
                Bitcoin Cash offers various levels of privacy depending on how
                it is used. It's important to educate yourself thoroughly before
                using Bitcoin Cash for privacy purposes.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="4">
            <h4>
              <fbt desc="FAQ page, why use section, Enjoy Exclusive Discounts title">
                Enjoy Exclusive Discounts
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="4">
            <p>
              <fbt desc="FAQ page, why use section, Enjoy Exclusive Discounts text">
                Many merchants offer discounts for paying in Bitcoin Cash,
                because it eliminates credit card fees and helps grow the
                adoption of this new payment system.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="5">
            <h4>
              <fbt desc="FAQ page, why use section, Support Freedom Worldwide title">
                Support Freedom Worldwide
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="5">
            <p>
              <fbt desc="FAQ page, why use section, Support Freedom Worldwide text">
                Bitcoin Cash is a permissionless, open network. It empowers you
                to engage with your fellow human beings without intrusion. It's
                decentralized, voluntary, and non-aggressive. As usage grows,
                old power structures will erode while fresh ideas blossom. It
                may help usher in the greatest peaceful revolution the world has
                ever known.
              </fbt>
            </p>
          </Accordion.Collapse>
        </Accordion>
      </Container>
      <Container className={S.titleContianer}>
        <h2>
          <fbt desc="FAQ page, Benefits for Merchants section title">
            Benefits for Merchants
          </fbt>
        </h2>
        <Accordion>
          <Accordion.Toggle className={S.accordionTitle} eventKey="0">
            <h4>
              <fbt desc="FAQ page, merchant benefit section, Low fees title">
                Ultra Low Fees
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="0">
            <p>
              <fbt desc="FAQ page, why use section, low fees text">
                The network fee for a typical Bitcoin Cash transaction is less
                than one penny. If you want to convert your Bitcoin Cash into
                fiat currency, such as US dollars, you can do that through
                merchant processors for a cost that is still much lower than
                credit card processing.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="1">
            <h4>
              <fbt desc="FAQ page, merchant benefit section, no chargeback title">
                No Chargebacks
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="1">
            <p>
              <fbt desc="FAQ page, why use section, no chargeback text">
                Unlike credit cards, there are never any automatic voids,
                refunds, chargebacks, or other unexpected fees. Fraud protection
                is built into the system with no cost to the merchant.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="2">
            <h4>
              <fbt desc="FAQ page, merchant benefit section, New Customers title">
                New Customers
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="2">
            <p>
              <fbt desc="FAQ page, why use section, New Customers text">
                A growing number of patrons are choosing Bitcoin Cash as a
                preferred payment method. They favor merchants who offer this
                payment option and actively seek them out.
              </fbt>
            </p>
          </Accordion.Collapse>
          <Accordion.Toggle className={S.accordionTitle} eventKey="3">
            <h4>
              <fbt desc="FAQ page, merchant benefit section, Free Marketing and Press title">
                Free Marketing and Press
              </fbt>
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse className={S.accordionBody} eventKey="3">
            <p>
              <fbt desc="FAQ page, why use section, Free Marketing and Press text">
                By accepting Bitcoin Cash, merchants can gain free listings in
                website and app directories, gaining even more customers. They
                can also take advantage of this new trend and generate press for
                their business.
              </fbt>
            </p>
          </Accordion.Collapse>
        </Accordion>
      </Container>
      <div className={S.roadmapContianer}>
        <Container>
          <h2>
            <fbt desc="FAQ page, roadmap section title">
              The Bitcoin Cash Roadmap
            </fbt>
          </h2>
          <p>
            To become a solid base for application development and innovation,
            Bitcoin Cash must continuously improve and compete. Working
            together, we can build a technical foundation to empower Bitcoin
            Cash to be the best money the world has ever seen.
          </p>
          <PrimaryButton
            noMarginLeft={true}
            buttonText={fbt(
              "View the roadmap",
              "'view roadmap' button on the faq page"
            )}
            href={"/roadmap/"}
          />
        </Container>
      </div>
    </>
  )
}

export default FAQPage
