2020-05-15 Upgrade Testnet
==========================

On May 15, 2020 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

Fork time: `1582729200`  (February 26, 2020 15:00:00 UTC)

## Set up a node

Run Bitcoin ABC 0.21.0 with:
```
bitcoin-qt -testnet -phononactivationtime=1582729200 -addnode=bitcoincash.gq -enableminerfund=0
```

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=bitcoincash.gq
phononactivationtime=1582729200
enableminerfund=0
```

## Other services

Miners: to `bitcoincash.gq:19338`
user: (testnet address) password:(anything)

Electrumx server: `fulcrum.bitcoincash.gq:60002` will follow the bitcoind.

Explorer: http://bitcoincash.gq:3002

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw)

