2020-11-15 Upgrade Testnet
==========================

The Nov 15, 2020 Bitcoin Cash will undergo a planned network upgrade.
The purpose of this upgrade testnet will be for testing of the upgrade activation and features.

## Scheduled Activation Testnet

In order for businesses and services to test activation of the new rules, a Scheduled Activation
Testnet is available which forks off from the regular testnet on a daily basis. It performs a test
activation every day when a block of median time past (MTP) 12:00 UTC is mined.

To join the next day's activation, go to [upgrade-explorer.bitcoincash.org](https://upgrade-explorer.bitcoincash.org), copy **tomorrow's**
activation timestamp, set your node's <em>axionactivationtime</em> to that and restart it. Example,
using the command-line:

>bitcoind -testnet -axionactivationtime=<em>activationtimestamp</em>

Miners: to `stratum+tcp://electrum.bitcoincash.org:19340` user: (address) password: (anything)

ElectrumX Server: `electrum.bitcoincash.org:60004`

Block Explorer: [upgrade-explorer.bitcoincash.org](https://upgrade-explorer.bitcoincash.org)

## Regular Testnet

The testnet that follows the same consensus rules as the main Bitcoin Cash network.

Miners: to `stratum+tcp://electrum.bitcoincash.org:19338` user: (address) password: (anything)

ElectrumX server: `electrum.bitcoincash.org:60002`

Block Explorer: [texplorer.bitcoincash.org](https://texplorer.bitcoincash.org)

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).
