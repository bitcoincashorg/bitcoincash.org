---
layout: specification
title: 2019-MAY-15 Network Upgrade Specification
date: 2018-10-16
activation: 1557921600
version: 0.1 DRAFT SUBJECT TO CHANGE
---

## Summary

When the median time past [1] of the most recent 11 blocks (MTP-11) is greater than or equal to UNIX timestamp 1557921600, Bitcoin Cash will execute an upgrade of the network consensus rules according to this specification. Starting from the next block these consensus rules changes will take effect:

* Enable the following opcodes
  * OP_MUL
  * OP_INVERT
  * OP_LSHIFT
  * OP_RSHIFT
* Enable Schnorr signatures
* Enforce minimal pushdata
* Enforce NULLDUMMY (BIP0147)
* Replace transaction size >100 byte requirement with transaction size not equal 64 bytes.

The following are not consensus changes, but are recommended changes for Bitcoin Cash implementations:

* Automatic replay protection for future upgrade

## OpCodes

The following opcodes will be re-enabled per [20190515-reenabled-opcodes.md](2019-may-opcodes.md):

* OP_MUL
* OP_INVERT
* OP_LSHIFT
* OP_RSHIFT

## Schnorr Signatures

Support schnorr signatures per [schnorr-signatures.md](schnorr-signatures.md):

## Enforce minimal pushdata

As per existing standardness checks, enforce that all pushed data is a minimal representation at the script layer.

## Enforce NULLDUMMY (BIP0147)

As per BIP0147, enforce that the dummy element in OP_CHECKMULSIG(VERIFY) is a null
stack element.  This will go into effect at the consensus layer.

## Allow transactions <100 bytes, except 64 bytes specifically

Replace transaction size >100 byte requirement with transaction size not equal 64 bytes.

This rule prevents a hash griding attack, where SPV wallets can confuse a 64 byte transaction for a merkle node.
The amount of entropy in each 32-byte sections of the transaction is insufficient to prevent a preimage attack. 
In this case, a valid transaction could be found with a hash equal
to the first, or last, 32 bytes of a 64-byte transaction.

## Automatic Replay Protection

When the median time past [2] of the most recent 11 blocks (MTP-11) is less than UNIX timestamp 1573819200 (Nov 2019 upgrade) Bitcoin Cash full nodes MUST enforce the following rule:

 * `forkid` [1] to be equal to 0.

When the median time past [1] of the most recent 11 blocks (MTP-11) is greater than or equal to UNIX timestamp 1573819200 (Nov 2019 upgrade) Bitcoin Cash full nodes implementing the May 2019 consensus rules SHOULD enforce the following change:

 * Update `forkid` [1] to be equal to 0xFF0002.  ForkIDs beginning with 0xFF will be reserved for future protocol upgrades.

This particular consensus rule MUST NOT be implemented by Bitcoin Cash wallet software. Wallets that follow the upgrade should not have to change anything.

## References

[1] The `forkId` is defined as per the [replay protected sighash](replay-protected-sighash.md) specification.
