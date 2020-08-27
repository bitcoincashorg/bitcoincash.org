import React from "react"
import fbt from "fbt"
import SEO from "components/seo"
import { Container, Row, Col } from 'react-bootstrap';
import S from './start-here.module.scss';
import GetStarted from 'assets/images/get-started/getting-started.jpg';
import Store from 'assets/images/get-started/bitcoin-cash-wallet.jpg';
import Buy from 'assets/images/get-started/buy-bitcoin-cash.jpg';
import Spend from 'assets/images/get-started/spend-bitcoin-cash.jpg';
import Accept from 'assets/images/get-started/accept-bitcoin-cash.jpg';






const StartHerePage = () => {
  return (
    <>
      <SEO title="Start Here" />
      <Container>
            <Row>
                <Col md={6}>
                    <div className={S.carduserprofile}>
                        <a href="getting-started.html">
                            <img class="card-user-profile-img" src={GetStarted} alt="Getting Started Getting Started Bitcoin Cash" />
                        </a>
                        <div class="card-user-profile-content card-section">
                            <div class="card-user-profile-avatar">
                                <ion-icon name="school"></ion-icon>
                            </div>
                            <p class="card-user-profile-name">What is peer to peer electronic cash?</p>
                            <p class="card-user-profile-status">1. Getting Started</p>
                            <p class="card-user-profile-info">Peer to peer (P2P) electronic cash is simply described as online money sent from one person to another without the need for a trusted third-party. As described in the original Bitcoin whitepaper by Satoshi Nakamoto, P2P cash makes use of digital signatures as part of the solution, but the main benefits are lost if a trusted third party is still required to prevent fraud. This makes P2P cash a trustless and safe way to transact without the need of intermediaries.</p>
                        </div>

                        <div class="card-user-profile-actions">
                            <a href="getting-started.html" class="card-user-profile-button btn btn-secondary btn-round secondary">View More</a>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className={S.carduserprofile}>
                        <a href="wallets.html">
                            <img class="card-user-profile-img" src={Store} alt="Download a wallet Bitcoin Cash Wallet on iPhone and Macbook" />
                        </a>
                        <div class="card-user-profile-content card-section">
                            <div class="card-user-profile-avatar">
                                <ion-icon name="wallet"></ion-icon>
                            </div>
                            <p class="card-user-profile-name">Where do I store my Bitcoin Cash?</p>
                            <p class="card-user-profile-status">2. Download a wallet</p>
                            <p class="card-user-profile-info">Getting started with Bitcoin Cash is super easy. The first step is to download a wallet so that you can begin participating in the Bitcoin economy. Most wallets are free to download and are easy to use that have a few key features such as sending, receiving, storing funds securely, transaction lookups, and more. </p>
                        </div>

                        <div class="card-user-profile-actions">
                            <a href="wallets.html" class="card-user-profile-button btn btn-secondary btn-round secondary">View More</a>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div className={S.carduserprofile}>
                        <a href="buy-bitcoin-cash.html">
                            <img class="card-user-profile-img" src={Buy} alt="Buy or Earn Bitcoin Cash Bitcoin Cash Coin with Coinbase Behind" />
                        </a>
                        <div class="card-user-profile-content card-section">
                            <div class="card-user-profile-avatar">
                                <ion-icon name="cart"></ion-icon>
                            </div>
                            <p class="card-user-profile-name">How do I get Bitcoin Cash?</p>
                            <p class="card-user-profile-status">3. Buy or Earn Bitcoin Cash</p>
                            <p class="card-user-profile-info">The two easiest ways to get Bitcoin Cash is to buy or work for it. Buying Bitcoin Cash is the most used and convenient way, where all you have to do is sign up for a Bitcoin exchange and deposit funds so you can convert it to Bitcoin Cash. The exchange will send you Bitcoin Cash after the trade has occurred.</p>
                        </div>

                        <div class="card-user-profile-actions">
                            <a href="buy-bitcoin-cash.html" class="card-user-profile-button btn btn-secondary btn-round secondary">View More</a>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className={S.carduserprofile}>
                        <a href="spend-bitcoin-cash.html">
                            <img class="card-user-profile-img" src={Spend} alt="Spend Bitcoin Cash - Tokyo Shibuya Crossing Bitcoin Cash" />
                        </a>
                        <div class="card-user-profile-content card-section">
                            <div class="card-user-profile-avatar">
                                <ion-icon name="gift"></ion-icon>
                            </div>
                            <p class="card-user-profile-name">What can I buy with Bitcoin Cash?</p>
                            <p class="card-user-profile-status">4. Spend Bitcoin Cash</p>
                            <p class="card-user-profile-info">Bitcoin Cash isn’t just for speculation. It’s intended usage is a peer to peer electronic currency, which means, it should be spent. Spending Bitcoin Cash is fast, with near-instant transactions and sub-cent transaction fees, making it the most secure and widely used digital currency on the planet.</p>
                        </div>

                        <div class="card-user-profile-actions">
                            <a href="spend-bitcoin-cash.html" class="card-user-profile-button btn btn-secondary btn-round secondary">View More</a>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className={S.carduserprofile}>
                        <a href="accept-bitcoin-cash.html">
                            <img class="card-user-profile-img" src={Accept} alt="Accept Bitcoin Cash - iPad accepting Bitcoin Cash" />
                        </a>
                        <div class="card-user-profile-content card-section">
                            <div class="card-user-profile-avatar">
                                <ion-icon name="star"></ion-icon>
                            </div>
                            <p class="card-user-profile-name">How can my business use Bitcoin Cash?</p>
                            <p class="card-user-profile-status">5. Accept Bitcoin Cash</p>
                            <p class="card-user-profile-info">As a merchant one of your main goals is to be able to accept and process payments as quickly and seamlessly as possible so you can make your customers happy and receive payments without any headaches. Bitcoin Cash is the solution, as it has fast and low-cost transactions. As the world goes digital, electronic currencies such as Bitcoin are becoming the go-to method for paying online and in retail shops. Easily accept Bitcoin Cash directly or use third-party providers to accept Bitcoin Cash using their platforms and convert all or part of the sale into local fiat currency.</p>
                        </div>

                        <div class="card-user-profile-actions">
                            <a href="accept-bitcoin-cash.html" class="card-user-profile-button btn btn-secondary btn-round secondary">View More</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
      
    </>
  )
}

export default StartHerePage
