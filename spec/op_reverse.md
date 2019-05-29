---
layout: specification
title: OP_REVERSE Specification
category: spec
date: 2019-5-29
activation: TBD
version: 0.1
---

OP_REVERSE
==========

OP_REVERSE reverses the bytes of the top stackitem.

Rationale
---------

Bitcoin's protocol almost exclusively uses little-endian encoding [8], and Script provides various tools for using integers encoded in little endian, such as `OP_NUM2BIN` and `OP_BIN2NUM` [11]. Using covenants [2], sophisticated smart contracts can be created, and Script already has a great arsenal of arithmetic operators (opcodes 139 to 165) to enforce e.g. how input and output amounts of transactions have to be related.

However, many protocols do not use little endian encoding, and it is by no means clear that one is superior to the other. Both AMQP [12] and Apache Thrift [13], for instance, use big-endian encoding. The Simple Ledger Protocol (SLP) uses big-endian encoding as well [1]. Bitdb, when using the `hN` elements, returns stack items in a format that can be directly interpreted as base16 big-endian encoded numbers, and to use this feature, it has to be possible to encode values as big-endian.

Further, now that oracles using OP_CHECKDATASIG are possible, likely used to retrieve numeric data, it would be unnecessarily limiting to assume all oracles will use little-endian encoding.

Among the mentioned protocols, SLP tokens are likely the most important ones. Various new use cases combining the power of covenants and looping transactions [5] emerge, among them:

* Decentralized exchanges (such as SLP Agora or SLPDEX) [3] [6] [4]
* Donation mintable tokens
* DAOs, which charge a fee for services and distribute revenue proportional to shares [7]
* Native tokens (not yet possible)

Note that values can be converted to big-endian encoding if the size of the encoding is both fixed and not too large. Currently, Script only supports 32-bit integers, and they can be encoded in big-endian using OP_SPLIT, OP_SWAP and OP_CAT:

```
// initial:    // <value>
// convert to little-endian
PUSH 4         // <value> 4
OP_NUM2BIN     // <value 4-byte little endian>

// split into individual bytes
PUSH 1         // <value 4-byte little endian> 1
OP_SPLIT       // <value 1st byte> <value 2nd-4th byte>
PUSH 1         // <value 1st byte> <value 2nd-4th byte> 1
OP_SPLIT       // <value 1st byte> <value 2nd byte> <value 3rd-4th byte>
PUSH 1         // <value 1st byte> <value 2nd byte> <value 3rd-4th byte> 1
OP_SPLIT       // <value 1st byte> <value 2nd byte> <value 3rd byte> <value 4th byte>

// reverse individual bytes and concat
// results in 4-byte big endian
OP_SWAP        // <value 1st byte> <value 2nd byte> <value 4th byte> <value 3rd byte>
OP_CAT         // <value 1st byte> <value 2nd byte> <value 4th, 3rd byte>
OP_SWAP        // <value 1st byte> <value 4th, 3rd byte> <value 2nd byte>
OP_CAT         // <value 1st byte> <value 4th, 3rd, 2nd byte>
OP_SWAP        // <value 4th, 3rd, 2nd byte> <value 1st byte>
OP_CAT         // <value 4-byte big endian>
```

However, if with OP_REVERSE, this becomes trivial:

```
// convert to bytes
PUSH 4         // <SLP value> 4
OP_NUM2BIN     // <SLP value 4-byte little endian>
OP_REVERSE     // <SLP value 4-byte big endian>
```

That's 11 bytes (9 operations and 3 pushdata) saved. 

There are multiple reasons why the second version would be preferable:

* Covenants and looping scripts usually take the script code of the preimage [9] as input, which means every operation counts twice: Once for the stack item containing the script code, and once for the P2SH script stack item [10]. For a conversion to 8-byte big-endian, this would save 32 bytes per conversion, and if there's, say, three of those conversions in a script, it would already amount to 96 bytes - a non-trivial number of bytes for a transaction.
* The cognitive load of developing scripts using the larger snippet above is increased unnecessarily. Developing scripts, by hand or by using tools such as macros or Spedn, already puts a lot of cognitive load on developers, and errors can be devastating to the community. A prominent example of such a failure is the contentious hard-fork on the Ethereum blockchain that was caused by a bug in The DAO smart contract.
* The first version assumes that Script uses 32-bit numbers, however, once integers with larger width are implemented, the script gets linearly longer (4 bytes/byte) with each additional byte. For 256-bit numbers, it would require a whopping 124 bytes (93 operations and 31 pushdata) to convert to big-endian. As the opcode limit currently is 201, that wouldn't leave much room for other operations. In contrast, `<N> OP_NUM2BIN OP_REVERSE` always encodes integers as N-byte big-endian number, with a constant script size independent of N.

Also, suppose an oracle returns an ordered list of 1-byte items (e.g. indices), however, if the script requires the bytes to be in the reversed order, then OP_REVERSE would allow to do this trivially.

### A Note On Signs

For unsigned integers, the behavior is always the expected one: the number will be encoded as unsigned big-endian integer. However, as integers in Script are encoded rather curiously, signed integers might result in unexpected behavior:

`-1 4 OP_NUM2BIN OP_REVERSE -> {0x80, 0x00, 0x00, 0x01}`

Here, the sign bit is the first bit of the resulting stackitem. Usually, negative numbers are encoded in two's complement, and the number should be `{0xff, 0xff, 0xff, 0xff}`. However, as long as developers are aware of this quite Script specific encoding, there's no issue at hand.

OP_REVERSE Specification
-----------------------------

This specification uses the same syntax for the stack/stackitems as [11].

### Semantics

`a OP_REVERSE -> b`.

OP_REVERSE fails immediately if the stack is empty.

Otherwise, the top stack item is removed from the stack, and a byte-reversed version is pushed onto the stack.

Examples:

* `{} OP_REVERSE -> {}`
* `{0x01} OP_REVERSE -> {0x01}`
* `{0x01, 0x02, 0x03, 0x04} OP_REVERSE -> {0x04, 0x03, 0x02, 0x01}`

### Opcode Number

OP_REVERSE proposes to use the previously unused opcode with number 192 (0xc0 in hex encoding). The rationale is that this opcode would belong with the 0x7e - 0x82 group of opcodes related to byte manipulation, however, there's no space anymore for an additional opcode. `0xc0` leaves some space after OP_CHECKDATASIGVERIFY (`0xbb`) for additional crypto operations (e.g. ECC multiplication), which is fitting.

### Activation

The activation is yet to be defined; however, it is proposed to activate it on the 15 November 2019 protocol upgrade.

### Unit Tests

 - `<item> OP_REVERSE` fails if 15 November 2019 protocol upgrade is not yet activated.
 - `OP_REVERSE` fails if the stack is empty.
 - `<item> OP_REVERSE` fails if the top stack item after execution is not <item> byte-reversed.
 - `{0x01, 0x02, 0x03, 0x02, 0x01} OP_DUP OP_REVERSE OP_EQUALVERIFY` succeeds with an empty stack.
 - `{0x01, 0x02, 0x03, 0x01, 0x02} OP_DUP OP_REVERSE OP_EQUALVERIFY` fails.

References
----------

[1] SLP Token specification: https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md

[2] Spending constraints with OP_CHECKDATASIG: https://honest.cash/pein_sama/spending-constraints-with-op_checkdatasig-172

[3] SLP Agora: https://github.com/EyeOfPython/slpagora

[4] Sample SLPDEX transaction: https://blockchair.com/bitcoin-cash/transaction/2e69f47a985673c5a645e20ad09025a0892321f096224679657f98e6152c845c

[5] Let's play chess on the BCH Blockchain: https://tobiasruck.com/content/lets-play-chess-on-bch/

[6] SLPDEX (work in progress): slpdex.cash

[7] DAO: https://en.wikipedia.org/wiki/Decentralized_autonomous_organization

[8] Bitcoin protocol documentation, common structures: https://en.bitcoin.it/wiki/Protocol_documentation#Common_structures

[9] BIP143: https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki

[10] BIP16: https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki

[11] May 2018, reenabled opcodes: https://github.com/EyeOfPython/bitcoincash.org/blob/master/spec/may-2018-reenabled-opcodes.md

[12] AMQP specification, page 14: http://www.amqp.org/sites/amqp.org/files/amqp.pdf

[13] Apache Thrift binary protocol: https://github.com/apache/thrift/blob/master/doc/specs/thrift-binary-protocol.md
