import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row } from "react-bootstrap"
import Sidebar from "components/sidebar/sidebar.js"
import LargeTile from "components/large-tile/large-tile.js"
import Cart from "assets/icons/cart.svg"
import Wordpress from "assets/icons/wordpress.svg"
import Calculator from "assets/icons/calculator.svg"
import Heart from "assets/icons/heart.svg"
import AcceptImg from "assets/images/get-started/accept-bitcoin-cash.jpg"

const AcceptPage = () => {
  const sideBarContent = [
    {
      title: fbt(
        "Bitcoin Cash Payment Gateways",
        "Accept page side column 'payment gateways' header"
      ),
      paragraph: fbt(
        "Receive Bitcoin Cash as a payment method from trusted 3rd party Payment Gateways.",
        "Accept page side column 'payment gateways' paragraph"
      ),
      icon: <Cart />,
    },
    {
      title: fbt(
        "Enable Bitcoin Cash on Wordpress",
        "Accept page side column 'wordpress' header"
      ),
      paragraph: fbt(
        "Accept Bitcoin Cash donations for content creation or integrate into your Wordpress enabled ecommerce platform.",
        "Accept page side column 'wordpress' paragraph"
      ),
      icon: <Wordpress />,
    },
    {
      title: fbt(
        "Point Of Sales",
        "Accept page side column 'Point Of Sales' header"
      ),
      paragraph: fbt(
        "Try one of the many Point Of Sale (POS) systems to accept Bitcoin Cash in your store.",
        "Accept page side column 'Point Of Sales' paragraph"
      ),
      icon: <Calculator />,
    },
    {
      title: fbt(
        "Accept Donations or Tips",
        "Accept page side column 'Accept Donations or Tips' header"
      ),
      paragraph: fbt(
        "Non-profit organizations benefit from extremely low fees when receiving Bitcoin Cash donations.",
        "Accept page side column 'Accept Donations or Tips' paragraph"
      ),
      icon: <Heart />,
    },
  ]

  const largeTileContent = [
    {
      subtitle: fbt(
        "How can my business use Bitcoin Cash?",
        "Accept page subtitle"
      ),
      title: fbt("Accept Bitcoin Cash", "Accept page title"),
      paragraph: (
        <fbt desc="Accept page main paragraph">
          As a merchant one of your main goals is to be able to accept and
          process payments as quickly and seamlessly as possible so you can make
          your customers happy and receive payments without any headaches.
          Bitcoin Cash is the solution, as it has fast and low-cost
          transactions. As the world goes digital, electronic currencies such as
          Bitcoin Cash are becoming the go-to method for paying online and in
          retail shops. Third-party providers make it easy to accept Bitcoin
          Cash using their platforms. When you sign up for a third-party
          merchant solutions application such as BitPay, you simply setup your
          account so that you can receive Bitcoin Cash and have it sent to your
          Bitcoin Cash wallet or you can convert your Bitcoin Cash to your local
          fiat currency. Most shops do a split where some funds are liquidated
          to fiat and some are held in crypto. Either way, by setting up a
          merchant solutions application you can begin accepting Bitcoin Cash
          payments today without worrying about the complexities of how to
          accept Bitcoin Cash.
        </fbt>
      ),
    },
  ]

  return (
    <>
      <SEO title={fbt("Spend Bitcoin Cash", "Spend page SEO title")} />
      <Container>
        <Row>
          <Sidebar
            content={sideBarContent}
            title={fbt(
              "How can I accept Bitcoin Cash",
              "sidebar title 'accept' page"
            )}
          />
          <LargeTile content={largeTileContent}>
            <img src={AcceptImg} alt="Accept Bitcoin Cash" />
          </LargeTile>
        </Row>
      </Container>
    </>
  )
}

export default AcceptPage
