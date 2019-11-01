2019-11-15 Upgrade Testnet
==========================

On Nov 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-11-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

Fork time: `1572850800`  (November 04, 2019 07:00:00 UTC)

## Set up a node

Run Bitcoin ABC 0.20.X with:
```
bitcoind -testnet -gravitonactivationtime=1572850800 -addnode=testnet.imaginary.cash
```

Alternatively as bitcoin.conf file:
```
testnet=1
addnode=testnet.imaginary.cash
gravitonactivationtime=1572850800
```

for Bitcoin Unlimited, run:
```
bitcoind -testnet -consensus.forkNov2019Time=1572850800 -addnode=testnet.imaginary.cash
```

or setup the bitcoin.conf file as:
```
testnet=1
addnode=testnet.imaginary.cash
consensus.forkNov2019Time=1572850800
```

You should also run these commands to get from the previous upgrade testnet back onto regular testnet,
and then from regular testnet onto the new upgrade testnet:

```
bitcoin-cli -testnet reconsiderblock 000000000002364d1632d3be0744d1e4283b9a478097fb1e115ad98de94cd3a0
bitcoin-cli -testnet invalidateblock 00000000566f3f20c1d6b0970b7c53bc2db993b0ec6439cee846fe42be0e2284
bitcoin-cli -testnet invalidateblock 0000000000003ed4ec3f13b02bd08d9517ab135e249878f6c3b6b73bebde6dd2
```

Or alternatively, sync testnet3 from scratch and then run
```
bitcoin-cli -testnet invalidateblock 0000000000003ed4ec3f13b02bd08d9517ab135e249878f6c3b6b73bebde6dd2
```

After invalidating the block, the "new" block 1338207 has hash 00000000262d9b66138b58ee561959a060afa2ed6d8797e21403714935eb4a98

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Explorer: http://testnet.imaginary.cash

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).

