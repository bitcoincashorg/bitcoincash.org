Testnet - 2019-05-15 Upgrade
============================

Fork time: 1550505000  (February 18, 2019 15:50:00 UTC)

Last old-rules block hash (height=1286694, mediantime=1550505775):
`00000000d80feb3c564957459688819edcb499e62f584fe314327de51e1bb87e`

First new-rules block hash (height=1286695):
`00000000ddd282493abd33df4747ac9793851c073534dbb17d596fe184de6d32`

## Set up a node

Run build of latest master with:
`bitcoin-qt -testnet -greatwallactivationtime=1550505000 -addnode=testnet.imaginary.cash`

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=testnet.imaginary.cash
greatwallactivationtime=1550505000
```

It is advised also run this to avoid soft-forking back onto normal testnet:
`bitcoin-cli invalidateblock 000000000000016b7bf51c69b14fbe0ade601186c4f15f16524598e17f4b0bc2`

## Set up other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Electron Cash Schnorr edition: https://github.com/markblundeberg/Electron-Cash/tree/schnorr
(only produces schnorr sigs)

