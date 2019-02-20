---
layout: specification
title: 2019-MAY-15 Segwit Recovery Specification
date: 2019-02-13
activation: 1557921600
version: 0.2
---

In-Progress Segwit Recovery Draft Specification
===============================================

## Motivation
Prior to the [November 2018 upgrade](2018-nov-upgrade.md), miners were able to recover coins accidentally sent to segwit P2SH addresses. These P2SH addresses have a two-push redeem script that contains no signature checks, and they were thus spendable by any miner (though not spendable by normal users due to relay rules). In practice, such coins were sometimes recovered by the intended recipient with the help of miners, and sometimes recovered by anonymous miners who simply decided to assert ownership of these anyone-can-spend coins.

In November 2018, the CLEANSTACK consensus rule was activated, with the intent of reducing malleability mechanisms. This had the unfortunate side effect of also making these segwit scripts *unspendable*, since attempting to spend these coins would always leave two items on the stack.

Starting in May 2019, an exemption to the CLEANSTACK rule will be made, allowing transactions spending segwit P2SH coins to be once again included in blocks.

## Specification
A transaction input
1. that spends a P2SH coin; and
2. where the scriptSig only pushes a single item—the redeem script—onto the stack; and
3. where the redeem script is a witness program;

shall be exempted from the CLEANSTACK rule under the consensus rules to be activated in May 2019.

A witness program has a 1-byte push opcode (for a number between 0 and 16, inclusive) followed by a data push between 2 and 40 bytes (inclusive), both in minimal form.
Equivalently, a witness program can be identified by examining the length and the first two bytes of the redeem script:
* The redeem script byte-length is at least 4 and at most 42.
* The first byte is 0x00, or in the range 0x51 – 0x60. (OP_0, or OP_1 – OP_16).
* The second byte is equal to to the redeem script byte-length, minus two.

The exemption should not be applied for the acceptance of transactions from network peers (i.e., only to acceptance of new blocks), so that segwit recovery transactions remain non-standard (and thus require a miner's cooperation to perform).

## Examples

Exempted scriptSigs, when spending a P2SH coin:

* `160014fcf9969ce1c98a135ed293719721fb69f0b686cb` (recovering P2SH-P2WPKH)
* `220020fc8b08ed636cb23afcb425ff260b3abd03380a2333b54cfa5d51ac52d803baf4` (recovering P2SH-P2WSH)
* `165114fcf9969ce1c98a135ed293719721fb69f0b686cb` (recovering hypothetical v1 witness program)
* `4e160000000014fcf9969ce1c98a135ed293719721fb69f0b686cb` (non-minimal push of redeemscript)
* `1600140000000000000000000000000000000000000080` (exempted, though ultimately invalid since a false boolean value is left on stack)
* `0453020101` (four-byte witness program)

Not exempted:

* `160014fcf9969ce1c98a135ed293719721fb69f0b686cb` (if not P2SH)
* `00160014fcf9969ce1c98a135ed293719721fb69f0b686cb` (pushes two items on stack)
* `17010014fcf9969ce1c98a135ed293719721fb69f0b686cb` (non-minimal push inside witness program)
* `17004c14fcf9969ce1c98a135ed293719721fb69f0b686cb` (non-minimal push inside witness program)
* `164914fcf9969ce1c98a135ed293719721fb69f0b686cb` (OP_1NEGATE for witness program version byte)
