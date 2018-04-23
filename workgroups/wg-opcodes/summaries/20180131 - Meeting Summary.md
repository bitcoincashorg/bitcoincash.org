---
layout: summary
title: Discussion on proposal to re-enable a subset of opcodes
group: opcodes
time: 20170131 1100 (UTC)
version: 1.0
participants: [
    Amaury Sechét of Bitcoin ABC,
    Shammah Chancellor of Bitcoin ABC,
    Jason B Cox of Bitcoin ABC,
    shadders of nChain,
    Dan Connoly of BitcoinJ Cash,
    Dagur of Bitcoin XT,
    Andreas Suisani of Bitcoin Unlimited,
    Josh Yabut
]
---

REQUEST TO EDITORS:

This document is intended to be updated so as to act as a reference for the topic at hand.  However, due to the nature of this also reflecting the discussion of a meeting which occured at a particular point in time, any additional information or clarification should be clearly marked as an editor's note "e.n." 

# Discussion Topic

In order to support non-trivial cash use cases for the Bitcoin Cash blockchain, a number of ecosystem participants would like to see some of the original Bitcoin OpCodes re-enabled for use in smart contracts.  However, the original issues associated with these opcodes remain valid.  Namely, undefined behavior, and potential for DDoS attacks against the network.

The purpose of this discussion is to review a (specification proposed)[https://github.com/shadders/uahf-spec/blob/5ca75404f31d35fe3f682dd94580a5f111acf144/reenable-op-codes.md] by Steve Shadders and Dan Connolly which proposes to re-enabled a subset of the original Bitcoin OpCodes while addressing undefined behavior and any potentials for DDoS using contracts.

## Brief Overview of the Bitwise Logic Operators

Three operators are proposed to be re-enabled: `OP_AND`, `OP_OR`, and `OP_XOR`. These operators all take two operands from the stack, perform the bitwise logic operation on them, and push the result back on the stack.

```
   x1 x2 OP_AND -> out
```

Options on specification details were included for discussion in the meeting.

# Concerns Raised

The size of the operands for the operators was raised as a concern. Two options were proposed in the draft specification. The first option was the *restrictive* option, which was to require the size of the operands to be the same. The second option was a more *liberal* choice, which was to automatically "left pad" the shorter operand to make it equal in length to the longer operand before performing the operation. The concern raised here centered on the data type of the operands: it is not possible to determine the data type of the operands and "left padding" numeric operands is not the same as "left padding" byte arrays due to the presence of the sign-bit for numeric operands.

There was also a concern that the operators could be used to produce elements which are expected to be numeric, but which are not in canonical form and would subsequently cause errors. An example is `0x2020 0x00FF OP_AND`. This example would produce `0x0020` which, as a number, is not in canonical form.

With regard to the lengths of the operands for the bitwise operators, the proposal includes a recommendation for the more restricted option be selected for implementation. This option requires the lengths of the operands to be the same. Any danger inherent in automatically "left padding" operands is obviated.

# Possible Solutions

## OP_PADLEFT_NUM

Introduce a specialized padding operator which treats the stack element to be padded specifically as a number, converting it to a canonical form as a byte array.  This operator would need to be applied binary operands to ensure that binary operators are working with numbers in a canonical format.

## OP_BIN2NUM and OP_NUM2BIN

Another operator may be added: `x OP_BIN2NUM -> n`. This operator will convert a binary array into a valid (canonical) numeric element. It accounts for the sign bit. The input operand can be any byte length (within the SCRIPT_MAX_ELEMENT_SIZE limit) but the result must fit within the maximum size of the numeric elements (currently 4 bytes with one sign bit, do not depend on the specific size, it is possible the maximum size will change in the future). Example: 0x0000000002 OP_BIN2NUM -> 0x02. If the result would be too large, the operator fails.

* We propose to add an operator `n m OP_NUM2BIN -> out`. This operator will convert a numeric value `n` into a byte array of length `m`. Both `n` and `m` must be valid numeric values. `m` can be any size up to SCRIPT_MAX_ELEMENT_SIZE. The sign bit is accounted for and moves to the left bit of the result. The result may not be a valid numeric value (e.g. `0x02 4 OP_NUM2BIN -> 0x00000002`).

# Resolution

Steve Shadders and Dan Connolly will add a section at the beginning of the specification document describing the data types supported by the scripting language. This section must make it very clear that all data is considered to be an "array of bytes" type, unless specifically stated. Only the operators in the *arithmetic* section are designed for the numeric type, which is a subset of the "array of bytes" type, and have certain limitations (size and canonical form). Rules from BIP62 that have been implemented should also be included in this section.

Steve Shadders and Dan Connolly favor the operators `OP_BIN2NUM` and `OP_NUM2BIN` and will update the specification to reflect adding these operators.  These operators, unlike `OP_PADLEFT_NUM`, emphasize that the operators change the *type* of the operands and to highlight that the bitwise operators use binary operands, not numeric operands. The bitwise operators do not account for the sign bit in numeric values.

