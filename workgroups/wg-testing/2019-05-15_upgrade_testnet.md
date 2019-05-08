2019-05-15 Upgrade Testnet
==========================

On May 15, 2019 the Bitcoin Cash network will undergo a planned protocol upgrade, as part of a series of regularly scheduled network upgrades. The changes have been [specified](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2019-05-15-upgrade.md) and implemented three months prior to upgrade activation in order to permit the ecosystem to prepare well in advance.

To assist technical preparations for the upgrade, a testnet is available where the upgrade features can be trialed and tested. Node implementations, wallets, businesses and services built on the Bitcoin Cash network can use this testnet to ensure compatibility, or to get started building products to make use of the upgrade features. This document outlines the information needed to participate in this upgrade testnet.

To communicate and coordinate with other Upgrade Testnet participants, please join the Telgram group at: https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw

## Upgrade Testnet Parameters

New Activation: 1557630000

Upgrade Testnet users please be advised: we will be doing a new upgrade activation at the MTP timestamp 1557630000. This corresponds to Sunday, 12 May 2019, at 03:00:00 UTC, or Saturday, 11 May at 20:00 Pacific time.

The plan of events will be as follows:

* May 9th ~12:00 UTC (Thursday morning PST) - mining will cease on the Upgrade Testnet. Miners and nodes can re-sync to the regular testnet.
* May 9th ~ 23:00 UTC (Thursday afternoon PST) afternoon. Miners will invalidate a block to split from main testnet. Shortly after this happens, the block hash will be shared in this channel so all Upgrade Testnet participants can also invalidate the same block.
* May 12 03:00 UTC (20:00 Saturday evening PST), Upgrade will activate when MTP reaches this timestamp.

Further information will be posted as it becomes available.

## Other services

Miners: to `testnet.imaginary.cash:19338`
user: (testnet address) password:(anything)

Electrumx server: `testnet.imaginary.cash:50002` will follow the bitcoind.

Electron Cash Schnorr edition: https://github.com/markblundeberg/Electron-Cash/tree/schnorr
(only produces schnorr sigs)

Insight API: http://testnet.imaginary.cash/api/BCH/testnet/ 

Explorers: 
 - http://testnet.imaginary.cash
 - http://190.123.23.9:3001/insight/
 
Transaction broadcaster: http://190.123.23.9:3001/insight/tx/send

Faucet: http://190.123.23.9:3002/

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).
