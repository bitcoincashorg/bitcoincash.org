---
layout: meeting-summary
title: Discussion on OP_DATASIGVERIFY
group: opcodes
category: summary
time: 20180222 1500 (UTC)
version: 1.0
chair: JVP
participants: [
    Shammah Chancellor, ABC,
    Daniel Connolly,
    Steve Shadders, nChain,
    Brad,
    Amaury Sechét, ABC,
    Joshua Yabut,
    Andrew Stone, BU,
    Andrea Suisani, BU ABC
]
---

# Discussion Topic

* Setting requirements for how to get in May Fork
* OP_DATASIGVERIFY

# Brief overview of discussion

It is unclear what the requirements are for including changes in a particular protocol upgrade but this is not really
within the scope of the OpCodes WG. This topic will be raised in the Quality Assurance WG.

## OP_DATASIGVERIFY
Quick overview: An “Oracle” refers to an off-chain data source which may be used by script to affect the spendability of 
transaction outputs.   This may be results of a soccer game, stock data, etc. OP_DATASIGVERIFY allows for that data to 
be imported as signed data for transactions to process as part of a smart contract. Binary contracts are the primary 
example. (e.g. if data matches one value, then payment goes to address A, otherwise to address B.)

* Decided that it should be split out from the re-enabled op-codes into its own specification
* Discussion on the signature format - uses the same mechanism as the existing “sign message” functionality
* Add a “signature type” byte similar to SigHashType?
* Discussion on the byte string that is appended to data before signature. For current sign message functionality this 
  text is “Bitcoin Signed Message:\n”. An oracle would need to include this when signing the message, which makes it 
  Bitcoin specific. It might be nice to have this removed, but then it would be incompatible with the existing signing 
  mechanism. Seems to be an ecosystem-wide standard so it should be followed. The prefix is only added to the data when 
  the signature is being generated, it does not need to be included in the data.
* If the data was to be obscured, the hash of the original information could be used as the data for this opcode.
* The re-enabled op codes can be used in conjunction with this opcode.
* This is one of the items for the May upgrade that everyone should be looking at.
* There was some discussion about “non-VERIFY” and “negated” versions of the opcodes. *(Editor's note: I thought this 
  discussion was a bit confused, that the difference between the two types, “non-VERIFY” and “negated”, was not clearly 
  distinguished. Some paraphrasing here)*.
  * The VERIFY version of an opcode causes a script failure if the result is false. A “non-VERIFY” version would not 
    fail but put the result (true/false) on the stack. See for example OP_EQUAL vs OP_EQUALVERIFY.
  * A “negated” version would fail if the result is true and pass if the result was false. It was pointed out that this 
    would probably not be useful as it is trivial to cause the result to be false.

## Additional discussion

There was some time left at the end of the meeting so a brief discussion was held on a previous suggestion to bump 
transaction version number with every upgrade:
* Nodes should recognize that they do not know that version of transaction and although they cannot process the 
  transaction, they should not penalize the source of the transaction. 
* Some discussion that exchanges are interested in fork protection and that this could assist with that. The exchanges 
  would presumably be up to date and would ensure that all of their transactions would be created with the new version, 
  and that therefore these transactions would not be included in a fork caused by out of date clients.
* Need to bear in mind the interaction of nodes when they are in IBD (initial block download) or when they are simply 
  behind and trying to catch up. How do they know which transaction versions are valid?
* Check for version numbers that are currently being used; there may be many different values. It’s unclear how the 
  current node software handles transaction versions.
* Adding this check now might not help immediately with the May upgrade, but could be put in place for subsequent 
  upgrades.
* Andrew Stone to open a PR to start discussion

# Action Items

* Investigate currently in use transaction versions.
* Open up a pull request for OP_DATASIGVERIFY (Andrew Stone), and regarding transaction versioning.
* Begin defining tests for OP_DATASIGVERIFY.
