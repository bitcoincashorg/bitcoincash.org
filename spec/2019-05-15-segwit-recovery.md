---
layout: specification
title: 2019-MAY-15 Segwit Recovery Specification
date: 2019-04-16
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

(All values in hex)

#### Valid segwit recoveries:
    V1) Recovering v0 P2SH-P2WPKH:
        scriptSig: 16001491b24bf9f5288532960ac687abb035127b1d28a5
        scriptPubKey: a91417743beb429c55c942d2ec703b98c4d57c2df5c687

    V2) Recovering v0 P2SH-P2WSH:
        scriptSig: 2200205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
        scriptPubKey: a91417a6be2f8fe8e94f033e53d17beefda0f3ac440987

    V3) Max allowed version, v16:
        scriptSig: 2260205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
        scriptPubKey: a9149b0c7017004d3818b7c833ddb3cb5547a22034d087

    V4) Max allowed length, 42 bytes:
        scriptSig: 2a00285a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f2021222324252627
        scriptPubKey: a914df7b93f88e83471b479fb219ae90e5b633d6b75087

    V5) Min allowed length, 4 bytes:
        scriptSig: 0400025a01
        scriptPubKey: a91486123d8e050333a605e434ecf73128d83815b36f87

    V6) Valid in spite of a false boolean value being left on stack, 0:
        scriptSig: 0451020000
        scriptPubKey: a9144b3617b50ea16c6a75b5e7974a03da4ab894e3c687

    V7) Valid in spite of a false boolean value being left on stack, minus 0:
        scriptSig: 0451020080
        scriptPubKey: a914b538e9b063ba9c2c53a9c378cc2eb3b3d425745d87

#### Invalid segwit recoveries:
    I1) Non-P2SH output:
        scriptSig: 16001491b24bf9f5288532960ac687abb035127b1d28a5
        scriptPubKey: 51

    I2) Redeem script hash does not match P2SH output:
        scriptSig: 16001491b24bf9f5288532960ac687abb035127b1d28a5
        scriptPubKey: a91417a6be2f8fe8e94f033e53d17beefda0f3ac440987

    I3) scriptSig pushes two items onto the stack:
        scriptSig: 0016001491b24bf9f5288532960ac687abb035127b1d28a5
        scriptPubKey: a91417743beb429c55c942d2ec703b98c4d57c2df5c687

    I4) Invalid witness program, non-minimal push in version field:
        scriptSig: 1701001491b24bf9f5288532960ac687abb035127b1d28a5
        scriptPubKey: a9140718743e67c1ef4911e0421f206c5ff81755718e87

    I5) Invalid witness program, non-minimal push in program field:
        scriptSig: 05004c0245aa
        scriptPubKey: a914d3ec673296c7fd7e1a9e53bfc36f414de303e90587

    I6) Invalid witness program, too short, 3 bytes:
        scriptSig: 0300015a
        scriptPubKey: a91440b6941895022d458de8f4bbfe27f3aaa4fb9a7487

    I7) Invalid witness program, too long, 43 bytes:
        scriptSig: 2b00295a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728
        scriptPubKey: a91413aa4fcfd630508e0794dca320cac172c5790aea87

    I8) Invalid witness program, version -1:
        scriptSig: 224f205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
        scriptPubKey: a91497aa1e96e49ca6d744d7344f649dd9f94bcc35eb87

    I9) Invalid witness program, version 17:
        scriptSig: 230111205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
        scriptPubKey: a9144b5321beb1c09f593ff3c02be4af21c7f949e10187

    I10) Invalid witness program, OP_RESERVED in version field:
         scriptSig: 2250205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f
         scriptPubKey: a914be02794ceede051da41b420e88a86fff2802af0687

    I11) Invalid witness program, more than 2 stack items:
         scriptSig: 2300205a0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f51
         scriptPubKey: a9148eb812176c9e71732584123dd06d3246e659b19987
