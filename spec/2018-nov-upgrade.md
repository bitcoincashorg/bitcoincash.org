---
layout: specification
title: 2018 November 15 Network Upgrade Specification
date: 2018-07-29
activation: 1542300000
version: 0.2
---

## Summary

When the median time past [1] of the most recent 11 blocks (MTP-11) is greater than or equal to UNIX timestamp 1542300000, Bitcoin Cash will execute an upgrade of the network consensus rules according to this specification. Starting from the next block these consensus rules changes will take effect:

* Remove topological transaction order constraint, and enforce canonical transaction order
* Enable OP_CHECKDATASIG and OP_CHECKDATASIGVERIFY opcodes
* Enforce minimum transaction size
* Enforce "push only" rule for scriptSig

The following are not consensus changes, but are recommended changes for Bitcoin Cash implementations:

* Automatic replay protection for future upgrade

## Canonical Transaction Order

With the exception of the coinbase transaction, transactions within a block shall be sorted by Transaction ID in ascending order. The coinbase transaction shall be the first transaction in a block.

## OpCodes

New opcodes OP_CHECKDATASIG and OP_CHECKDATASIGVERIFY will be enabled as specified in [op_checkdatasig.md](op_checkdatasig.md) [2].

## Minimum Transaction Size

Transactions that are smaller than 100 bytes shall be considered invalid. This protects against a Merkle tree vulnerability that allows attackers to spoof transactions against SPV wallets [3].

## Push Only

Transactions shall be considered invalid if an opcode with number greater than 96 (hex encoding 0x60) appears in a scriptSig.

## Automatic Replay Protection

When the median time past [2] of the most recent 11 blocks (MTP-11) is less than UNIX timestamp 1557921600 (May 2019 upgrade) Bitcoin Cash full nodes MUST enforce the following rule:

 * `forkid` [4] to be equal to 0.

When the median time past [1] of the most recent 11 blocks (MTP-11) is greater than or equal to UNIX timestamp 1557921600 (May 2019 upgrade) Bitcoin Cash full nodes implementing the November 2018 consensus rules SHOULD enforce the following change:

 * Update `forkid` [4] to be equal to 0xFF0001.  ForkIDs beginning with 0xFF will be reserved for future protocol upgrades.

This particular consensus rule MUST NOT be implemented by Bitcoin Cash wallet software. Wallets that follow the upgrade should not have to change anything.

## References

[1] Median Time Past is described in [bitcoin.it wiki](https://en.bitcoin.it/wiki/Block_timestamp). It is guaranteed by consensus trules to be monotonically increasing.

[2] https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/op_checkdatasig.md

[3] [Leaf-Node weakness in Bitcoin Merkle Tree Design](https://bitslog.wordpress.com/2018/06/09/leaf-node-weakness-in-bitcoin-merkle-tree-design/)

[4] The `forkId` is defined as per the [replay protected sighash](replay-protected-sighash.md) specification.
