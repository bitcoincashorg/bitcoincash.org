# Metadata

Title:            Fixing Transaction Maleability:  Is it worth it?
Workgroup:        MalFix
Meeting Time:     20170129 1100 (UTC)
Document Version: 1.0

Developer Participants:
 * Amaury Sechét of Bitcoin ABC
 * Tomas of bitCrust
 * shadders of nChain

REQUEST TO EDITORS:

This document is intended to be updated so as to act as a reference for the topic at hand.  However, due to the nature of this also reflecting the discussion of a meeting which occured at a particular point in time, any additional information or clarification should be clearly marked as an editor's note "e.n." 

# Problem Statement

Transactions may currently be modified, without affecting their validity, by both third and first parties on the Bitcoin Cash network. This is known as transaction malleability.  Transaction identifiers (`txId`s) are hashes of the complete transaction data, and thus change when a transaction is malleated.  txIds are currently malleable by both first and third parties. First party malleability of signatures is always possible due to the use of a random nonce in the ECDSA signature generation algorithm.

Due to the dependency of transaction inputs on malleable txIds, chained transactions may be invalidated if they have not yet been confirmed.  This can occur when either a first or third party is able get a malleated transaction included in a block.  Third party malleation could result in a DDoS against the network, and both forms of malleability add additional complexity to second layer solutions such as a lightning network.

Therefore, transaction maleability may be desirable to fix in order to maximize the potential uses of Bitcoin Cash.  The primary concern for these use cases is to remove txId malleability.  This can be achieved either by preventing the actual transaction from being malleated (only possible for third party malleability) or by altering the mechanism for
calculating the txId by hashing a version of the transaction that excludes the malleable parts of the transaction.  Some of the use cases which would either be enabled, or simplified are:

* Lightning Networks
* Payment Channels
* Pay as you go (e.g. streaming video, pumping gas)
* 0-conf payment processing

# Possible Solutions

## MalFix 

This solution swaps the transaction ID for a new identifier which is a hash of the transaction excluding the `scriptSig`. The existing `txID` would become the `txHash`. Nodes would maintain a set of UTXOs indexed by both the `txID` and the `txHash`.  Transactions would be able to indicate if the prevOut referenced a `txId` or `txHash` going forward.

Positives:
* Fixes nearly all possible forms of `txId` malleability

Negatives:
* Broad impact on the ecosystem, and a relatively high initial cost to implement in existing nodes.
* All software needs to understand and support the txhash/txid distinction.

References:
* https://github.com/tomasvdw/bips/blob/master/malleability-fix.mediawiki

## SigHashType: SigHashNoneAnyoneCanPay

It is possible to add a sighash type (SIGHASH\_SPENDANYOUTPUT | SIGHASH\_NOINPUT) which causes the signature not to cover the prevout fields. Such signature can be reused on every output with the same pubkey, and hence would allow off-chain chaining as the dependent transaction can simply be adopted to a malleated dependency without needing a new signature.

Positives:
* Relatively easy to implement, and natural extension of the existing API, with a low impact on the ecosystem.

Negative:
* Could cause poorly implemented wallets to lose customer funds if they ever reuse private keys.
* Requires implementations to track `txIds` 
* Burdens 2nd layer solutions with having to track transaction ID changes.

References:
* https://lists.linuxfoundation.org/pipermail/bitcoin-ml/2017-October/000331.html
* https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2016-February/012460.html

## Whack-a-mole

Consider some operations invalid in `scriptSig` one by one, thereby making the 3rd party malleation of standard transaction types impossible.

Positives:
* Does not require any sweeping changes 

Negatives:
* Enforcing standard transactions can only reasonably happen at relay time, and not as a consensus rule. Doing so as a consensus rule could prevent certain desirable transaction types from be valid in the future, and would potentially require another hardfork to enable any other `scriptSig` uses.
* It is very hard to know or claim that all forms of malleabilty have been addressed.
* Does not enable LN as ECDSA signatures will always be first-party malleable.

## Do Nothing

Malleability may not require fixing. Looking at the goals for fixing it:

* Off-chain chaining is only a problem with bidrection channels. For unidirectional payment channels, only the recipient owns the fully signed commitment transactions so malleability is not relevant. Unless I am mistaken the same goes for HTLCs. 
* There are certain advantages of software/merchants not having to deal with 3rd party malleability but the extend of this problem is discussed but not fully agreed upon.

Positives:
* Requires no additional work on the part of protocol developers

Negatives:
* Pushes significant complexity on the developers of any 2nd layer solutions

# Resolution

Group leaned towards supporting `MalFix`, however developers did not come to consensus.  The meeting participants instead agreed on the following items:

* Fixing this issue is not a priority for the May 15th Hardfork.
* Solutions have non-trivial impact
* Discussion should have more time to circulate around the Bitcoin Cash community.
* To revisit this discussion in several months after the May 15th hardfork.
