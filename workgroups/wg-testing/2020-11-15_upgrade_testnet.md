2020-11-15 Upgrade Testnet
==========================

The Nov 15, 2020 Bitcoin Cash will undergo a planned network upgrade.
The purpose of this upgrade testnet will be for testing of the upgrade activation and features.

## Scheduled Activation Testnet

In order for businesses and services to test activation of the new rules, a Scheduled Activation
Testnet is available which forks off from the regular testnet on a daily basis. It performs a test
activation every day when a block of median time past (MTP) 12:00 UTC is mined.

How to participate in the Scheduled Activation Testnet:
1. Go to [upgrade-explorer.bitcoincash.org](https://upgrade-explorer.bitcoincash.org).
2. Copy **tomorrow's activation timestamp** and set your node's <em>-axionactivationtime</em> option to that.
3. Make sure you connect to our nodes (both are specified in the example below) using the <em>-addnode</em> option.
4. Restart your node.

Minimal command-line example to participate in the activation:

<pre><code>bitcoind -chain=test \
    -addnode=<b>upgrade-node1.bitcoincash.org</b> \
    -addnode=<b>upgrade-node2.bitcoincash.org</b> \
    -axionactivationtime=<b>[activation timestamp]</b></code></pre>

### Services:

Miners: `stratum+tcp://tpool.bitcoincash.org:19340` user: (address) password: (anything)

Electrum Server: `telectrum.bitcoincash.org:60004`

Block Explorer: [upgrade-explorer.bitcoincash.org](https://upgrade-explorer.bitcoincash.org)

## Regular Testnet

The testnet that follows the same consensus rules as the main Bitcoin Cash network.

### Services:

Miners: `stratum+tcp://tpool.bitcoincash.org:19338` user: (address) password: (anything)

Electrum server: `telectrum.bitcoincash.org:60002`

Block Explorer: [texplorer.bitcoincash.org](https://texplorer.bitcoincash.org)

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw).
