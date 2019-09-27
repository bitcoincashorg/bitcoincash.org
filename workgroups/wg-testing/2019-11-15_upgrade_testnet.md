2019-11-15 Upgrade Testnet
==========================

On Nov 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-11-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

Fork time: `1566227700`  (August 19, 2019 15:15:00 UTC)

Last old-rules block hash (height=1322706, mediantime=1566228221):
`0000000005169def04a5f0cba7e6eadcafa361007496554e62e1cebdfb148a1a`

First new-rules block hash (height=1322707):
`000000000b1246b802e56ce28c2beb597b907ca44d983e8b0c71f7f224fd97ab`
This block contains a Schnorr multisig transaction.

## Set up a node

Run Bitcoin ABC 0.20.0 with:
```
bitcoin-qt -testnet -gravitonactivationtime=1566227700 -addnode=testnet.imaginary.cash
```

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=testnet.imaginary.cash
gravitonactivationtime=1566227700
```

You should also run this to avoid soft-forking back onto normal testnet:

```
bitcoin-cli -testnet invalidateblock 000000000000067656459385ff54b1178d985a5334f40e209c1e3580c08cc18b
```

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Explorer: http://testnet.imaginary.cash

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).

