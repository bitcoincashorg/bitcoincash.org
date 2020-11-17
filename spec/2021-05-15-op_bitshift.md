---
layout: specification
title: OP_BITSHIFT Specification
category: spec
date: 2020-11-17
activation: TBD
version: 0.1
author: Tobias Ruck
---

OP_BITSHIFT
==========

`a n OP_BITSHIFT` moves the bits of byte array `a` forwards or backwards, depending on the sign of `n`. Bits are dropped at the end of the shift and filled with zeros at the start of the shift.

Rationale
---------

This opcode has two intended use-cases:
- Calculating 2^n efficiently (along with multiplying and dividing by 2^n efficiently). This could be useful for floating-point arithmetic.
- Efficient interaction between bits of a large byte array.

### Calculation of 2^n
Calculation of 2^n can be emulated in Script in two ways:
- By pushing a lookup table `... 64 32 16 8 4 2 1`, then calling `n OP_PICK`. Afterwards, the stack has to be cleaned up again.
- By pushing a lookup table as encoded bytearray `0x0100'0200'0400'0800'1000'2000...`, then calling `2n OP_SPLIT 2 OP_SPLIT OP_DROP OP_BIN2NUM`. This involves less cleanup and is more efficient for large tables.

However, with this opcode, a lookup table is no longer required. 2^n can be calculated using just OP_BITSHIFT:

n > 0 and n < 31: `0x01000000 n OP_BITSHIFT OP_BIN2NUM`.

Multiplication and division of 2^n, without this opcode, requires OP_DIV/OP_MOD or OP_DIV, respectively, plus the above lookup tables. With this opcode, it's just OP_NUM2BIN, OP_BITSHIFT and OP_BIN2NUM.

### Efficient interaction between bits of a large byte array.
One underexplored area for Bitcoin ABC is games. Many games are based on a tilemap, the most prominent example of such a game certainly is chess [1], but there are numerous others. Tilemaps can be implemented efficiently using byte arrays, which are available in Script.

Many operations for tilemaps can be implemented efficiently using bitsets and OP_AND, OP_OR and OP_XOR. For instance, random numbers between two parties can be generated using OP_XOR on the preimages of commitments, and probabilities of individual bits can be changed to basically any independent distribution using OP_AND, OP_OR and OP_XOR. However, dependent distributions are not feasible.

Say you want to implement the following logic:
- For all bytes of a byte array, if bit 1 of the byte is 1, bit 0 is set to 0, otherwise it is kept unchanged.

This could be used for generating a long string of (non-uniform) random numbers between 0 and 2, and if combined with other operations could be used to generate all sorts of distributions. 

Currently, for small arrays, this can be emulated using OP_SPLIT and OP_DIV, however, this is very inefficient and scales linearly in opcode count with the size of the byte array. For larger arrays, this is not possible to do in Script.

This opcode would solve this.

Many other similar use-cases can be envisioned for this opcode; generally, the theme is simple logic but applied to a potentially large array, allowing operations to be processed in bulk, thus making them very efficient.

OP_BITSHIFT Specification
-----------------------------

This specification uses the same syntax for the stack/stackitems as [2].

### Semantics

`a n OP_BITSHIFT -> b`.

OP_BITSHIFT fails if the stack is empty or contains only one stack item.

OP_BITSHIFT fails if `n` is not a minimally encoded number.

OP_BITSHIFT fails if `abs(n)` is greater than `len(a)*8`.

If n > 0, OP_BITSHIFT shifts the bits of byte sequence `a` by `n` bits towards the end of the sequence. Bits that get moved from one byte to the next are shifted to the following byte if one exists, or otherwise ignored. This preserves little-endianness of Script's numbers.

If n < 0, OP_BITSHIFT shifts the bits of byte sequence `a` by `-n` bits towards the beginning of the sequence. Bits that get moved from one byte to the next are shifted to the preceding byte if one exists, or otherwise ignored. This preserves little-endianness of Script's numbers.

If n = 0, OP_BITSHIFT returns `a` unchanged.

Examples:

* `{} 0 OP_BITSHIFT -> {}`
* `{0x01} 1 OP_BITSHIFT -> {0x02}`
* `{0x01} 3 OP_BITSHIFT -> {0x08}`
* `{0x01, 0x00, 0x00, 0x80} 11 OP_BITSHIFT -> {0x00, 0x08, 0x00, 0x00}`
* `{0x01, 0x00, 0x00, 0x80} -11 OP_BITSHIFT -> {0x00, 0x00, 0x10, 0x00}`
* `{} 1 OP_BITSHIFT -> fail`

### Alternatives

#### Numeric bitshift
Instead having byte arrays as underlying data structure, a bitshift could also be implemented using Script integers. The main advantages would be higher performance and simplicity of implementation.

However, the behavior of a numeric bitshift can largely be emulated using lookup tables and OP_DIV/OP_MOD anyway, so not much is added. Also, it open the can of worms of how to treat the sign.

With the implementation as described above, a numeric shift is easily possible using OP_BIN2NUM, and a byte array shift is equally possible, allowing new kinds of operations.

#### Resizing bitshift
A bitshift that preserves all bits could be done by resizing the array dynamically so all bits fit. However, there seem to be no advantages for that, but a multitude of disadvantages, such as the possibility of a required allocation. Also, Script development is harder, as the size of the resulting byte array is unknown, making subsequent OP_AND/OP_OR much harder.

#### Using two opcodes
Instead of using just one opcode and differentiating the direction by the sign of the shift, alternatively, one could split the two cases into two opcodes, OP_LSHIFT and OP_RSHIFT, and erroring on a negative shift. The upside is that if one were to use a variable right shift based on a positive number, they'd have to prepend the OP_BITSHIFT with OP_NEGATE, which is not the case with OP_RSHIFT. It also saves on one branch. However, it wastes one opcode space, and makes dynamically switching between right and left shifts more complex. Also, it's more in align with the minimalist philosophy expressed in [2]: "The minimalist philosohy where a single primitive can be used to simulate multiple more complex operations".

### Opcode number
This document proposes to re-use the disabled opcode OP_LSHIFT with number 152 (0x98 in hex encoding), as it represents a superset of the intended semantics of OP_LSHIFT. OP_RSHIFT remains disabled, and can be used for something else (e.g. OP_BITROT).

### Complexity & security
Implementations of this opcode require no allocations, as shifts can be done in-place. Complexity in all cases is `O(len(a))`, where `len(a)` is the size of the byte array `a`.

This is strictly faster than many other opcodes, such as OP_HASH256, and equivalently fast as OP_REVERSEBYTES, therefore, this opcode has no impact on security of the system whatsoever, assuming no errors in the implementation.

### Activation

This document proposes to activate the opcode during the 15th May 2021 hardfork.

### Unit Tests

The following unit tests are used by the ABC implementation of the opcode as of Feb 17th 2020.
- `<array> <n> OP_BITSHIFT` fails if 15th May 2021 protocol upgrade is not yet activated.
- `OP_BITSHIFT` fails if the stack is empty.
- `{} OP_BITSHIFT -> {}` fails if the stack contains only one stack item.
- `{0x19} 3 OP_BITSHIFT -> {0xc8}`
- `{0x99} 3 OP_BITSHIFT -> {0xc8}`
- `{0x99} -3 OP_BITSHIFT -> {0x13}`
- `{0xde, 0xad} 12 OP_BITSHIFT -> {0x00, 0x0e}`
- `{0xde, 0xad, 0x00} 12 OP_BITSHIFT -> {0x00, 0x0e, 0xdd}`
- `{0xde, 0xad, 0x00, 0x00} 12 OP_BITSHIFT -> {0x00, 0x0e, 0xdd, 0x0a}`
- `{0xde, 0xad, 0xa1} -12 OP_BITSHIFT -> {0x1a, 0x0a, 0x00}`
- `{0xde, 0xad, 0xbe, 0xef} -12 OP_BITSHIFT -> {0xea, 0xfb, 0x0e, 0x00}`
- `{0x12, 0x34, 0x56} 8 OP_BITSHIFT -> {0x00, 0x12, 0x34}`
- for all n ∈ [1; 520]: `{i mod 256 | i < n} 8 OP_BITSHIFT -> {(if (i = 0) then (0) else (i - 1)) mod 256 | i < n}`
- for all n ∈ [2; 520]: `{i mod 256 | i < n} 12 OP_BITSHIFT -> {if (i < 2) then (0) else (((i-1)&0x7) << 4) | (((i-2)&0x70)>>4)) mod 256 | i < n}`
<!-- - for all n ∈ [9; 520]: `{i mod 256 | i < n} -68 OP_BITSHIFT -> {}` -->
- `<shifted sig> 4 OP_BITSHIFT OP_SPLIT 1 OP_NIP <pubkey> OP_CHECKSIG -> OP_TRUE`

References
----------

[1] Let's play chess on the BCH Blockchain: https://tobiasruck.com/content/lets-play-chess-on-bch/

[2] May 2018, reenabled opcodes: https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/may-2018-reenabled-opcodes.md
