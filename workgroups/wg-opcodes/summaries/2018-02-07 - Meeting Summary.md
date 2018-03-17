---
layout: summary
title: Followup discussion on proposal to re-enable a subset of opcodes
group: opcodes
category: summary
time: 20180207 1500 (UTC)
version: 1.0
chair: JVP
participants: [
    Shammah Chancellor of Bitcoin ABC,
    Dan Connolly of BitcoinJ Cash,
    Amaury Sechét of Bitcoin ABC,
    Steve Shadders of nChain,
    Andrew Stone of Bitcoin Unlimited,
    Andrea Suisani of Bitcoin Unlimited,
    Jason B Cox,
    Joshua Yabut,
    more
]
---

# Discussion Topic

In order to support non-trivial cash use cases for the Bitcoin Cash blockchain, a number of ecosystem participants would 
like to see some of the original Bitcoin OpCodes re-enabled for use in smart contracts.  However, the original issues 
associated with these opcodes remain valid.  Namely, undefined behavior, and potential for DDoS attacks against the network.

Some concerns were raised during the first [meeting](20180131 - Meeting Summary.md) on this topic. A proposal to address
these concerns was circulated to the Working Group and this followup meeting was held to discuss the updated 
[specification document](https://github.com/shadders/uahf-spec/blob/100a677a41305907951a021715ac06be7e749c6b/reenable-op-codes.md).


# Brief overview of discussion

* Operator behaviour 
  * reminder that most programming languages treat some arithmetic operations differently from how they are defined in 
mathematics - e.g. the modulo operator in C++.
  * agreement by the group that for the purposes of specifications in Bitcoin Cash, the C++ 2011 definition of operations 
is used (as defined in ISO/IEC 14882)
* OP_MOD and OP_DIV will have the same issues and it would make sense to implement them together
* some discussion on the number of possible opcodes
  * we should be careful adding new opcodes because the number available is limited without increasing the size of the opcode
  * opcodes can not be redefined or re-used, its possible that they are used without being visible in the blockchain such
as in P2SH scripts
* OP_MOD, OP_DIV, OP_CAT, OP_SPLIT, OP_AND, OP_OR, OP_XOR, OP_NUM2BIN, & OP_BIN2NUM
  * specification to be completed, sample code to be written 
  * agreement by the group on including these operators
* OP_ZEROES - not needed, effect can be achieved by using OP_REPEAT or OP_NUM2BIN
* OP_REPEAT - nice but presently no use case, maybe in the future if required
* OP_GROUP - some discussion on this, specification and code ready to be checked in by Andrew Stone

# Resolution

The meeting participants agreed on the following:

* to include OP_MOD, OP_DIV, OP_CAT, OP_SPLIT, OP_AND, OP_OR, OP_XOR, OP_NUM2BIN, & OP_BIN2NUM in the May 2018 protocol upgrade
* arithmetic operator behaviour to conform with equivalent behaviour from C++ 2011 definitions, as defined in ISO/IEC 14882

# Further Actions

* finalize specification for the opcodes that were agreed to - Steve Shadders
* check in OP_GROUP specification and code, and arrange discussion - Andrew Stone
