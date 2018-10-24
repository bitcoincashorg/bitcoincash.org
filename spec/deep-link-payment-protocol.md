```
BIP: ?
Layer: Applications
Title: Deeplink Payment Protocol
Author: Shun Usami<usatie@yenom.tech>,
        Taiki Uchida<yuiki@yenom.tech>,
        Aoi Serikawa<seri@yenom.tech>
Comments-URI: https://hackmd.io/s/BJObJntjQ
Status: Draft
Type: Standards Track
Created: 2018-10-21
```

## Abstract

Basically this is just a [BIP21(URI scheme)](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) like deeplink scheme to wallet applications with a callback url.
When the wallet app completed the requested behaviour, the wallet app ping the callback URL.
![demo](https://i.imgur.com/yXBsfJL.gif)

## Motivation
Currently, the payment experience on mobile devices are very bad, because users have to take many steps like this.
- 1. Copy the address.
- 2. Open a wallet app.
- 3. Paste the address.
- 4. Type the amount to send.
- 5. Send to the address.
- 6. Re-open the source application.

This protocol dramatically reduces the user's required steps.
- 1. Opens the deep link to a wallet app.
- 2. Confirm payment and automatically returns to the source app.

## Specification

### Deep link Scheme
This deep link scheme is protocol for communication between wallet application and another application.

i.e.
`bch-payment:{parameters}`
`bch-sign:{parameters}`


| title | value |
|:---:|:---:|
|Custom URL scheme|bch-{type}|


| type | explanation |
|:---:|:---:|
| payment | request a payment to wallet application |
| sign | request signing of message to wallet application |
| coming soon | coming soon ...|


### Mobile App to Wallet App Communication
![abstract:mobile-application](https://i.imgur.com/SPywIQE.png)

#### 1. Source app generates deep link to wallet app
The source app generates a deep link to wallet apps.
i.e.
`bch-payment:{addr}?amount={amount}&callback={callback_url}`

`addr` is a cashaddr without scheme.
i.e.
`qznj9wsazh379qa3dkph7qvtxdx5emkrxvsxhnyall`

|Query key| type | memo | example value|
|:---:|:---:|:---:|:---:|
|amount| Decimal | Coin value to send | 0.0001 |
|callback| String | deep link | yenom://payment-result |

#### 2. Wallet app make the payment
The wallet app build the payment transaction and broadcast it.


#### 3. Wallet app opens the deep link to the source app
The wallet app opens the deep link to the source app after broadcasting the payment transaction or cancelling the payment.
`callback_url?txid={txid}&status={status}`

|Query key| type | memo | example value |
|:---:|:---:|:---:|:---:|
|status| String | Status of the payment result. [success/error/cancel] | success |
|txid| String(optional) | Transaction id of the payment. Required if the status is success. | 0eac357541b0ba572849113c5faa1d1990f6382741dc3e2f5507e3ca8346dc0e |

#### 4. Source app verify the tx with txid
Source app should verify the payment is done.


### Web App to Wallet App Communication
![abstract:web-application](https://i.imgur.com/tYHey1y.png)

#### 1. Source web site generates deep link to wallet app

`bch-payment:{addr}?amount={amount}&webhook={webhook_url}&callback={callback_url}`

`addr` is a cashaddr without scheme.
i.e.
`qznj9wsazh379qa3dkph7qvtxdx5emkrxvsxhnyall`

|Query key| type | memo | example value |
|:---:|:---:|:---:|:---:|
|amount| Decimal | Coin value to send | 0.0001 |
|callback| String | web link | http://yenom.tech/payment-result |
|sessionid | String | website session id | eyJ...3mh8 |


#### 2. Wallet app build transaction with OP_RETURN output
The wallet app build and broadcast tx.
This tx should contain OP_RETURN output. This OP_RETURN output should store the SHA256 hash of session id.

[Transaction 0eac357541b0ba572849113c5faa1d1990f6382741dc3e2f5507e3ca8346dc0e - Bitcoin Cash (BCH) Block Explorer](https://explorer.bitcoin.com/bch/tx/0eac357541b0ba572849113c5faa1d1990f6382741dc3e2f5507e3ca8346dc0e)

#### 3. Wallet app pings the webhook URL
The wallet app send http `POST` request to `webhook_url` after broadcasting the payment transaction or cancelling the payment.

The webhook URL must accept a POST request with JSON. The object sent from the wallet app looks like this:

```
{
    "status" : "success",
    "txid" : "0eac357541b0ba572849113c5faa1d1990f6382741dc3e2f5507e3ca8346dc0e"
}
```

#### 4. Wallet app opens the callback URL

And then it opens the `callback_url` as well.

`callback_url?txid={txid}&status={status}`

|Query key| type | memo | example value |
|:---:|:---:|:---:|:---:|
|status| String | status of payment result. [success/error/cancel] | success |
|txid| String | Transaction id of the payment. Required if the status is success. | 0eac357541b0ba572849113c5faa1d1990f6382741dc3e2f5507e3ca8346dc0e |

#### 5. Source website verify the tx with txid
Source app should verify the payment is done. And also check the hash of the user's session id corresponds with the OP_RETURN output of tx.


## Rationale
This protocol is quite simple.
Alternative [BIP70](https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki#Motivation) like design can be considered.

## Forward compatibility
Adding optional parameters can be done by simply adding them.
Adding required parameters or destructive change can be done by simply changing the type name to new one.
i.e.
`bch-payment` -> `bch-payment-v2`

## Reference implementation
Coming soon.
