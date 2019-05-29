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

With the advent of SLP Tokens [1], Script becomes a lot more relevant and powerful. Various new use cases combining the power of covenants [2] and looping scripts [5] emerge, among them:

* Decentralized exchanges (such as SLP Agora or SLPDEX) [3] [6] [4]
* Donation mintable tokens
* DAOs, which charge a fee for services and distribute revenue proportional to shares [7]
* Native tokens (not yet possible)

We already have a powerful arsenal of tools for creating such contracts, most notably OP_NUM2BIN and OP_BIN2NUM. These convert minimally encoded 32-bit integers to/from N-byte little encoded integers.

Bitcoin Cash output values use 8-byte **little endian** encoded integers [8], however, SLP tokens use 8-byte **big endian** encoded integers [1]. If, say, a contract enforces that a Bitcoin Cash output value has to be a certain factor of another SLP output, a difficult conversion has to take place, for example:

```
// BCH value on top of stack, Script integer (i.e. minimally little endian encoded)
PUSH <factor>  // <BCH value> <factor>
OP_DIV         // <SLP value>

// convert to bytes
PUSH 4         // <SLP value> 4
OP_NUM2BIN     // <SLP value 4-byte little endian>

// split into individual bytes
PUSH 1         // <SLP value 4-byte little endian> 1
OP_SPLIT       // <SLP value 1st byte> <SLP value 2nd-4th byte>
PUSH 1         // <SLP value 1st byte> <SLP value 2nd-4th byte> 1
OP_SPLIT       // <SLP value 1st byte> <SLP value 2nd byte> <SLP value 3rd-4th byte>
PUSH 1         // <SLP value 1st byte> <SLP value 2nd byte> <SLP value 3rd-4th byte> 1
OP_SPLIT       // <SLP value 1st byte> <SLP value 2nd byte> <SLP value 3rd byte> <SLP value 4th byte>

// reverse individual bytes and concat
// results in 4-byte big endian
OP_SWAP        // <SLP value 1st byte> <SLP value 2nd byte> <SLP value 4th byte> <SLP value 3rd byte>
OP_CAT         // <SLP value 1st byte> <SLP value 2nd byte> <SLP value 4th, 3rd byte>
OP_SWAP        // <SLP value 1st byte> <SLP value 4th, 3rd byte> <SLP value 2nd byte>
OP_CAT         // <SLP value 1st byte> <SLP value 4th, 3rd, 2nd byte>
OP_SWAP        // <SLP value 4th, 3rd, 2nd byte> <SLP value 1st byte>
OP_CAT         // <SLP value 4-byte big endian>

// prefix 0x00000000 to extend 4-byte big endian to 8-byte big endian
PUSH 0x00000000 // <SLP value 4-byte big endian> 0x00000000
OP_SWAP         // 0x00000000 <SLP value 4-byte big endian>
OP_CAT          // <SLP value 8-byte big endian>
```

However, if with OP_REVERSE, this becomes trivial:

```
PUSH <factor>  // <BCH value> <factor>
OP_DIV         // <SLP value>

// convert to bytes
PUSH 8         // <SLP value> 8
OP_NUM2BIN     // <SLP value 8-byte little endian>
OP_REVERSE     // <SLP value 8-byte big endian>
```

That's 12 operations, and 16 bytes saved, respectively. 

There are multiple reasons why the second version would be preferable:

* Covenants and looping scripts usually take the script code of the preimage [9] as input, which means every operation counts twice: Once for the stack item containing the script code, and once for the P2SH script stack item [10]. In the example above, this would save 32 bytes per conversion, and if there's, say, three of those conversions in a script, it would already amount to 96 bytes - a non-trivial amount of bytes for a transaction.
* The cognitive load of developing scripts using the larger snippet above is increased unnecessarily. Developing scripts, by hand or by using tools such as macros or Spedn, already puts a lot of cognitive load on developers, and errors can be devastating to the community. A prominent example of such a failure is the contentious hard-fork on the Ethereum blockchain that was caused by a bug in The DAO smart contract.
* The first version assumes that Script uses 32-byte numbers, however, once 64-bit numbers are implemented, the script fails when numbers that do not fit in 32-bits are used [11], and has to be updated. The second version will work with up to 64-bit numbers.

Further, there's likely many additional use cases beside encoding SLP values, as many protocols outside of Bitcoin use big endian numbers, and all of them would benefit from this opcode. Also, it can be used to check palindromes.

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

OP_REVERSE proposes to replace the OP_RESERVED1 opcode with number 137 (0x89 in hex encoding). The rationale is that this opcode is in the "bit logic" group, which appears fitting, and reverse is an anagram of reserve.

### Activation

The activation is yet to be defined, however it is proposed to activate it on the 15 November 2019 protocol upgrade.

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
