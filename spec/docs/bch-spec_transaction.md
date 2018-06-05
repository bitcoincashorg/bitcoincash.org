# BCH Spec: Transaction
Version: 0.1
Status: Work in progress.

This section of the BCH spec documents the transaction primitive.

## Transaction Overview
A transaction is one of the two base primitives in the BCH system, the other being a block. Primitive in this context means that it is one of the data types for which the BCH spec provides built-in support.

A transaction is a transfer of BCH that is broadcast to the network and collected into blocks. A transaction typically references previous transaction outputs as new transaction inputs and dedicates all input Bitcoin values to new outputs. Transactions are not encrypted, so it is possible to browse and view every transaction ever collected into a block. Once transactions are buried under enough confirmations they can be considered irreversible.



### Desccription
Transaction comprises a signature and redeem script pair. 

### Purpose
To provide flexibility in releasing outputs.

### Requirements
What is needed for valid TX.

### Details
Which follow.

## Transaction Serialization Format
A serialized transaction contains an input and an output.

## Transaction Input

Inputs to a transaction include the outpoint, signature script, and sequence.

An input is a reference to an output from a previous transaction. Multiple inputs are often listed in a transaction. All of the new transaction's input values (that is, the total coin value of the previous outputs referenced by the new transaction's inputs) are added up, and the total (less any transaction fee) is completely used by the outputs of the new transaction. Previous tx is a hash of a previous transaction. Index is the specific output in the referenced transaction. ScriptSig is the first half of a script (discussed in more detail later).




### Outpoint

The outpoint is a reference to an output from a previous transaction. 

### Signature Script

The signature script contains two components: a signature and a public key. The public key must match the hash given in the script of the redeemed output. The public key is used to verify the redeemers signature, which is the second component. More precisely, the second component is an ECDSA signature over a hash of a simplified version of the transaction. It, combined with the public key, proves the transaction was created by the real owner of the address in question.

Desc of sigscript

Why? To ensure only legitimate spender (i.e. evidence of private key held). 

Conditions which authorization has to fulfill to define how outputs may be released.

### Sequence

Check lock time verify (s4)

Check sequence verify (s4)

## Transaction Output

Outputs from a transaction include the BCH amount, redeed script, and 

### Amount

### Redeem Script
Desc: redeem script to spend
Why? Sets up parameters for signature script.
NOTE: Redeem scripts should not use OP_CODES, potentially add this to consensus standard

### Standard Transactions

A transaction that meet some specific criterion is said to be standard. Standard transactions are accepted into the mempool and relayed by nodes on the network. 

This ensures that nodes have a similar looking mempool so that the system behave predictably.

Requirements:
	Transaction size: < 100k
	Version must be 1 or 2
	Signature script must be data push only
	Script size must be 1650 or less

Standard transaction outputs nominate addresses, and the redemption of any future inputs requires a relevant signature.
				
#### P2SH
	23-bytes
	OP_HASH160
	<reedem script hash>
	OP_EQUAL
	Use address version=1 and hash=<reedem script hash>

#### P2PKH
	25 bytes
	OP_DUP
	OP_HASH160
	<public key hash>
	OP_EQUAL
	OP_CHECKSIG
	Use address version=0 and hash=<public key hash> 

#### P2PK
	35 or 67 bytes
	<public key>
	OP_CHECKSIG
	Use address version=0 and hash=HASH160(<public key>)

#### Bare multisig
	<n: [0-20]>
	<pubkey 0>
	…
	<pubkey n>
	<(null)>
	OP_CHECKMULTISIG

#### Data carrier
	Limited to one per transaction
	Limited to 223 bytes
	OP_RETURN
	<push data>

### Coinbase Transactions
