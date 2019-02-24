2019-05-15 Upgrade Testnet
==========================

On May 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

Fork time: `1550505000`  (February 18, 2019 15:50:00 UTC)

Last old-rules block hash (height=1286694, mediantime=1550505775):
`00000000d80feb3c564957459688819edcb499e62f584fe314327de51e1bb87e`

First new-rules block hash (height=1286695):
`00000000ddd282493abd33df4747ac9793851c073534dbb17d596fe184de6d32`

First Schorr-containing block hash (height=1286698):
`0000000038067b3b52bdf8f3caa578b5b892595b80703e9f0de5d0dbd4012054`

## Set up a node

Run Bitcoin ABC 0.19.0 with:
```
bitcoin-qt -testnet -greatwallactivationtime=1550505000 -addnode=testnet.imaginary.cash
```

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=testnet.imaginary.cash
greatwallactivationtime=1550505000
```

You should also run this to avoid soft-forking back onto normal testnet:

```
bitcoin-cli -testnet invalidateblock 000000000000016b7bf51c69b14fbe0ade601186c4f15f16524598e17f4b0bc2
```

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Electron Cash Schnorr edition: https://github.com/markblundeberg/Electron-Cash/tree/schnorr
(only produces schnorr sigs)

Insight API: http://testnet.imaginary.cash/api/BCH/testnet/ (try http://testnet.imaginary.cash/api/BCH/testnet/tx/0514a52cb921ffb9a9bc7c1060a05c12cfd3778c123073e4b8ac8ed2a72e9754 )

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).
