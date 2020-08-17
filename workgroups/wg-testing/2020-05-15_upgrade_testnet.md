2020-05-15 Upgrade Testnet
==========================

The May 15, 2020 the Bitcoin Cash network upgrade, and we have discontinued the upgrade testnet.

Please see the [Testing Workgroup](workgroup.md) for information on later Bitcoin Cash network upgrades.

If you had a node running on the upgrade testnet, youcan re-sync to the regular testnet by following these instructions:

1. Stop the running node
2. Delete the ban list at `.bitcoin/testnet3/banlist.dat`
3. Start Bitcoin ABC 0.21.x
4. `bitcoin-cli -testnet reconsiderblock 000000001be228c2f33f7c612bf30b8670c50ba885bc26856899424c2e8d4b0a`
5. `bitcoin-cli -testnet invalidateblock 0000000015c702db7c97bbc63441150e3430bb787bff00abd18839d12912c0e2`

## Communication

To communicate and coordinate with other Upgrade Testnet users, you can join the [Testing Workgroup](workgroup.md) and its associated [Telegram Group](https://t.me/joinchat/DUeWWkYZbVMjvwMTRFlRhw)

