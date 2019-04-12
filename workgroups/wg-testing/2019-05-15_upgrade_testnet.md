2019-05-15 Upgrade Testnet
==========================

On May 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

## Upgrade Testnet Parameters

New Activation: 1555333200

Upgrade Tesnet users please be advised: we will be doing a new upgrade activation at the MTP timestamp 1555333200. This corresponds to Monday, 15 April 2019, at 13:00:00 UTC. Mining has ceased on the previous upgrade testnet, and all participants should join the new upgrade testnet, and set a new activation time by issuing the following commands:

```
rm ~/.bitcoin/testnet3/banlist.dat

bitcoind -testnet -greatwallactivationtime=1555333200 -addnode=testnet.imaginary.cash

bitcoin-cli -testnet reconsiderblock 000000000000016b7bf51c69b14fbe0ade601186c4f15f16524598e17f4b0bc2

[Wait for node to sync to regular testnet chain tip]

bitcoin-cli -testnet invalidateblock 0000000000000294acbf8b48cdb725053f4f375252be85717165f1fac4155a28
```

After invalidating the block, you should check that you are synced to the correct chain tip by checking with the Upgrade Testnet explorer listed below.

Further information will be added here as it becomes available

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Electron Cash Schnorr edition: https://github.com/markblundeberg/Electron-Cash/tree/schnorr
(only produces schnorr sigs)

Insight API: http://testnet.imaginary.cash/api/BCH/testnet/ (try http://testnet.imaginary.cash/api/BCH/testnet/tx/0514a52cb921ffb9a9bc7c1060a05c12cfd3778c123073e4b8ac8ed2a72e9754 )

Explorer: http://testnet.imaginary.cash (try http://testnet.imaginary.cash/tx/357c349c08a0b3c4ab2bf64813bdb2e4a4219ef2cbb463abed90a8f594b88ea4 )

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).
