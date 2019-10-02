2019-11-15 Upgrade Testnet
==========================

On Nov 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-11-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

Fork time: `1570082400`  (October 03, 2019 06:00:00 UTC)

## Set up a node

Run Bitcoin ABC 0.20.X with:
```
bitcoind -testnet -gravitonactivationtime=1570082400 -addnode=testnet.imaginary.cash
```

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=testnet.imaginary.cash
gravitonactivationtime=1570082400
```

for Bitcoin Unlimited, run:
```
bitcoind -testnet -consensus.forkNov2019Time=1570082400 -addnode=testnet.imaginary.cash
```

or setup the bitcoin.conf file as:
```
testnet=1
addnode=testnet.imaginary.cash
consensus.forkNov2019Time=1570082400
```

You should also run these commands to get from the previous upgrade testnet back onto regular testnet,
and then from regular testnet onto the new upgrade testnet:

```
bitcoin-cli -testnet reconsiderblock 000000000000067656459385ff54b1178d985a5334f40e209c1e3580c08cc18b
bitcoin-cli -testnet invalidateblock 000000000b1246b802e56ce28c2beb597b907ca44d983e8b0c71f7f224fd97ab
bitcoin-cli -testnet invalidateblock 000000000002364d1632d3be0744d1e4283b9a478097fb1e115ad98de94cd3a0
```

Or alternatively, sync testnet3 from scratch and then run
```
bitcoin-cli -testnet invalidateblock 000000000002364d1632d3be0744d1e4283b9a478097fb1e115ad98de94cd3a0
```

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Explorer: http://testnet.imaginary.cash

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).

