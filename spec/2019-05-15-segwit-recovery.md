---
layout: specification
title: 2019-MAY-15 Segwit Recovery Specification
date: 2019-04-10
activation: 1557921600
version: 0.3
---

Segwit Recovery Specification
===============================================

## Motivation
Prior to the [November 2018 upgrade](2018-nov-upgrade.md), miners were able to recover coins accidentally sent to segwit pay-to-script-hash [(P2SH)](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki) addresses. These P2SH addresses have a two-push redeem script that contains no signature checks, and they were thus spendable by any miner (though not spendable by normal users due to relay rules). In practice, such coins were sometimes recovered by the intended recipient with the help of miners, and sometimes recovered by anonymous miners who simply decided to assert ownership of these anyone-can-spend coins.

In November 2018, the CLEANSTACK consensus rule was activated, with the intent of reducing malleability mechanisms. This had the unfortunate side effect of also making these segwit scripts *unspendable*, since attempting to spend these coins would always leave two items on the stack.

Starting in May 2019, transactions spending segwit P2SH coins will be allowed once again to be included in blocks.

## Specification
A transaction input
1. that spends a P2SH coin (scriptPubKey=`OP_HASH160 <hash160 of the redeem script> OP_EQUAL`); and
2. where the scriptSig only pushes one item onto the stack: a redeem script that correctly hashes to the value in the scriptPubKey; and
3. where the redeem script is a witness program;

shall be considered valid under the consensus rules to be activated in May 2019.

A witness program has a 1-byte push opcode (for a number between 0 and 16, inclusive) followed by a data push between 2 and 40 bytes (inclusive), both in minimal form.
Equivalently, a witness program can be identified by examining the length and the first two bytes of the redeem script:
* The redeem script byte-length is at least 4 and at most 42.
* The first byte is 0x00, or in the range 0x51 – 0x60. (OP_0, or OP_1 – OP_16).
* The second byte is equal to to the redeem script byte-length, minus two.

This exemption should not be applied for the acceptance of transactions from network peers (i.e., only to acceptance of new blocks), so that segwit recovery transactions remain non-standard (and thus require a miner's cooperation to perform).

## Test cases

Valid scriptSigs when spending a P2SH coin:

* `16001491b24bf9f5288532960ac687abb035127b1d28a5` (recovering v0 P2SH-P2WPKH)
* `2200205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f` (recovering v0 P2SH-P2WSH)
* `2260205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f` (max allowed version, v16)
* `2a00285a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f2021222324252627` (max allowed length, 42 bytes)
* `4e16000000001491b24bf9f5288532960ac687abb035127b1d28a5` (non-minimal push of redeemscript)
* `0451020000` (min allowed length, 4 bytes, valid in spite of a false boolean value being left on stack)
* `0451020080` (min allowed length, 4 bytes, valid in spite of a false boolean value being left on stack)

Invalid:

* `16001491b24bf9f5288532960ac687abb035127b1d28a5` (if not spending a P2SH coin)
* `16001491b24bf9f5288532960ac687abb035127b1d28a5` (if hash does not match P2SH output)
* `0016001491b24bf9f5288532960ac687abb035127b1d28a5` (scriptSig pushes two items onto the stack)
* `1701001491b24bf9f5288532960ac687abb035127b1d28a5` (invalid witness program, non-minimal push in version field)
* `05004c0245aa` (invalid witness program, non-minimal push in program field)
* `0300015a` (invalid witness program, too short)
* `2b00295a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728` (invalid witness program, too long)
* `224f205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f` (invalid witness program, version -1)
* `230111205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f` (invalid witness program, version 17)
* `2300205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f51` (invalid witness program, more than 2 stack items)
