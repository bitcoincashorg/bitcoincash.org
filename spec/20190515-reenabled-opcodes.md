---
layout: specification
title: Specification for Re-enabling old Opcodes, May 2019
date: 2018-08-03
version: 1.0
updated: 2018-08-13
---

# Introduction

In May 2018 several disabled opcodes were reintroduced to the Bitcoin Cash scripting engine2. The scope of that change was limited in order to focus developer attention rather than attempting to reintroduce all of the disabled opcodes at once. This specification expands upon that change by reintroducing additional opcodes.

This specifications describes the opcodes that are proposed to be added in the May 2019 protocol upgrade.

The opcodes to be added are:

| Word | OpCode | Hex | Input | Output | Description |
| :--- | :----- | :-- | :---- | :----- | :---------- |
| OP_MUL | 149 | 0x95 | n1 | n2 | out | Multiplies two numbers |
| OP_RSHIFT | 153 | 0x99 | b | n | out | Right shift b by n bits |
| OP_LSHIFT | 152 | 0x98 | b | n | out | Left shift b by n bits |
| OP_INVERT | 131 | 0x83 | b | out | Bitwise | NOT |

## Data types

Script data values are byte sequences but may be interpreted as numeric values by some opcodes. Specification of the data types used by Script is beyond the scope of this document.

For accuracy in this specification, byte sequence values are represented as a sequence of byte values surrounded by curly brackets, such as {0x01, 0x02, 0x03}. This sequence is three bytes long, it begins with a byte of value 1 and ends with a byte of value 3.

Numeric data values are represented in this document as decimal numbers, such as 35315.

In this specification, a variable representing a byte sequence is named using the symbol b. A variable representing a numeric value is named using the symbol n.

## Overflow

Conceptually overflow means that the result of the operation is out-of-bounds.

For consistency with previous opcodes and to avoid exposing underlying implementation details, all of the opcodes defined in this document give no indication of overflow.

Note that divide by zero is a separate error and reported as such.

## Definitions
Operand order: In keeping with convention, where multiple operands are specified the top most stack item is the last operand. For example:
```
n1 n2 OP_MUL → out
```
is the same as

1. Push n1 onto stack
2. Push n2 onto stack
3. Execute OP_MUL

The result is that n2 and n1 are popped from the stack and replaced by out.

## Global Conditions

The following conditions apply to all opcodes. These conditions must be checked by the implementation to ensure that no violations occur:

1. for all b : elements on the stack, 0 <= len(b) <= MAX_SCRIPT_ELEMENT_SIZE
2. for each opcode, the prerequisite number of operands are present on the stack when the
opcode is executed

These unit tests should be included for every opcode:

1. Executing the opcode with an input element of length greater than
MAX_SCRIPT_ELEMENT_SIZE fails.
2. Executing the opcode with an insufficient number of operands on the stack fails.

## Operand Consumption

In all cases the opcode and operand stack elements are consumed by the opcode and replaced with the output.

# Arithmetic Operators

## OP_MUL

Opcode (decimal): 149
Opcode (hex): 0x95
Description: Multiply two operands.

```
n1 n2 OP_MUL → out,
where out is the product (multiplication) of n1 and n2.
```

### Examples:
* 4 7 OP_MUL → 28
* -4 7 OP_MUL → -28

Any overflow is ignored. The result of the opcode may be a byte sequence that is too large to be interpreted as a numeric value.

Impact of successful execution:

* The number of elements on stack is reduced by one.

### Unit Tests

1. b1 b2 OP_MUL -> FAIL - where b1 is not a valid numerical value or b2 is not a valid
numerical value, or both
2. The following test will be repeated with various values for n1 and n2. The values of n1 and n2 must include values which have byte sequence representations of size 1 to 4 bytes inclusive. The tests will be repeated with values n1,n2 and -n1,n2 and n1,-n2 and -n1,-n2.
  a. n1 n2 OP_MUL → n1*n2
  b. n1 1 OP_MUL → n1
  c. n1 0 OP_MUL → 0 3. n1 n2 OP_MUL -> b - where (n1 * n2) is too large to be represented in 4 bytes. The result b must be a byte sequence which is a representation of (n1*n2) but larger than 4 bytes.

# Bitwise Operators

The result produced by these opcodes is always the same size as the operand.
The execution cost of these opcodes is proportional to the length of the operand.

## OP_RSHIFT

Opcode (decimal): 153
Opcode (hex): 0x99
Description: Right shift b by n bits.

```
b n OP_RSHIFT → out,
where out is the byte sequence created by a right shift of the binary bit pattern b by n bits.
```

There is no limit imposed on the value of n except that n must be a valid numerical value and must be non-negative. If n is negative, the script fails.

If n is greater than the number of bits in the byte sequence, the result is a zero filled byte sequence equal in length to the original byte sequence. This is consistent with the interpretation of b n OP_RSHIFT as equal to b 1 OP_RSHIFT repeated n times. This amounts to a logical, rather than arithmetic shift.

Impact of successful execution:

* The number of elements on stack is reduced by one.

### Unit Tests

These tests may be repeated with a number of values for b and n.

1. b 0 OP_RSHIFT → b
2. b n OP_RSHIFT → out with for various n > 0, including when n > len(b)
3. b n OP_RSHIFT → fails with error with n < 0

## OP_LSHIFT

Opcode (decimal): 152
Opcode (hex): 0x98
Description: Left shift b by n bits.

```
b n OP_LSHIFT → out,
where out is the byte sequence created by a left shift of binary bit pattern b by n bits.
```

There is no limit imposed on the value of n except that n must be a valid numerical value and must be non-negative. If n is negative, the script fails.

If n is greater than the number of bits in the byte sequence, the result is a zero filled byte sequence equal in length to the original byte sequence. This is consistent with the interpretation of b n OP_LSHIFT as equal to b 1 OP_LSHIFT repeated n times.

Impact of successful execution:

* The number of elements on stack is reduced by one.

### Unit Tests

These tests must be repeated with a number of values for b and n.

1. b 0 OP_LSHIFT → b
2. b n OP_LSHIFT → out with for various n > 0, including when n > len(b)
3. b n OP_LSHIFT → fails with error with n < 0

## OP_INVERT

Opcode (decimal): 131
Opcode (hex): 0x83
Description: Bitwise invert.

```
b OP_INVERT → out,
where out is b bitwise inverted.
```

Impact of successful execution:

* The number of elements on stack is unchanged.

### Unit Tests

1. {} OP_INVERT → {}
2. b OP_INVERT → bitwise invert(x) for various b and various sizes of b. E.g. {0x80, 0x12, 0x34} → {0x7F, 0xED, 0xCB}

# References

[1] [https://en.bitcoin.it/wiki/Script#Opcodes](https://en.bitcoin.it/wiki/Script#Opcodes)

[2] [may-2018-reenabled-opcodes.md](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/may-2018-reenabled-opcodes.md)

# Specification Status

This document is a final draft in Google Doc format. It will be made available for public comment. It will also be transcribed into Markdown format and submitted to the bitcoincashorg GitHub repository.
This document is a specification document. It was produced following a proposal, community discussions in the “[WG] OpCodes” telegram group, and a workshop style meeting.
The proposal document is [here](https://docs.google.com/document/d/1KaX9IUJRBXl_r7ZsjYEt67s07x22jcaTw06zFhCFYdw/edit).
The meeting was held on 19th July 2018, the agenda is [here](https://drive.google.com/file/d/14xYdMV-7yAhWWElJ5GVMpaydQmNI9EpT/view).

# Document History

* 2018-08-13 - Daniel Connolly, nChain Ltd - included license
* 2018-08-13 - Daniel Connolly, nChain Ltd - version 1.0
* 2018-08-06 - Daniel Connolly, nChain Ltd - minor edits, grammar, typos
* 2018-08-03 - Shaun O’Kane, nChain Ltd - initial version

# License

Copyright 2018 nChain Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy of this specification, to deal in the specification without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the specification, and to permit persons to whom the specification is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the specification.

THE SPECIFICATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SPECIFICATION OR THE USE OR OTHER DEALINGS IN THE SPECIFICATION.
