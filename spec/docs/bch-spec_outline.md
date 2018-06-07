This is a copy of the outline for the BCH spec documentation to be developed. Source is here: https://docs.google.com/document/d/1Sstt-B8sVri5A4jA02Dt2zHhUHFa_Jys17Q39Aw-y70/edit?usp=sharing


1. BCH
	Description -- what is it? What does it do?
	Explanation as to why it is needed -- why it’s important
	Requirements for why (what do you need to implement/use/consume)
	Technical details of its structure
	NOTE: This is the documentation model to follow for each section.

2. Consensus Rules
	A. Blocks
		Overview of block validation
			Desc of block
			Why, what is its purpose
			Block validation requirements
			Tech details (follow below)
		Block Headers
			Serialization Format
				Version
				Previous Block Hash
				Merkle root
				Timestamp
				Target (describe relationship with difficulty)
				Nonce
			Version
			Merkle Root
				Merkle trees
				Merkle details
			Time
			Target
			Nonce
		Coinbase Transaction
			Desc: Mining reward
			Why/purpose
			Requirements
			Tech details (structure, where in block)
	B. Transactions
		TX validation overview
			Desc: Transaction comprises a signature and redeem script pair. 
			Why? To provide flexibility in releasing outputs.
			Requirements for TX validation
			Tech details (which follow next)
		Serialization Format (which is?)
		Input
			Outpoint
			Signature Script
				Desc of sigscript
				Why? To ensure only legitimate spender (i.e. evidence of private key held). 
				Requirements: Conditions which authorization has to fulfill to define how outputs may be released.
				Tech details: ref to section 4
			Sequence
				Check lock time verify (s4)
				Check sequence verify (s4)
		Output
			Amount
			Redeem Script
				Desc: redeem script to spend
				Why? Sets up parameters for signature script.
				NOTE: Redeem scripts should not use OP_CODES, potentially add this to consensus standard
			Standard Transactions
				Desc: A transaction that meet some specific criterion is said to be standard. Standard transactions are accepted into the mempool and relayed by nodes on the network. 
				Why? This ensure that nodes have a similar looking mempool so that the system behave predictably.
				Requirements:
					Transaction size: < 100k
					Version must be 1 or 2
					Signature script must be data push only
					Script size must be 1650 or less
				P2SH
					23-bytes
					OP_HASH160
					<reedem script hash>
					OP_EQUAL
					Use address version=1 and hash=<reedem script hash>
				P2PKH
					25 bytes
					OP_DUP
					OP_HASH160
					<public key hash>
					OP_EQUAL
					OP_CHECKSIG
					Use address version=0 and hash=<public key hash> 
				P2PK
					35 or 67 bytes
					<public key>
					OP_CHECKSIG
					Use address version=0 and hash=HASH160(<public key>)
				Bare multisig
					<n: [0-20]>
					<pubkey 0>
					…
					<pubkey n>
					<(null)>
					OP_CHECKMULTISIG
				Data carrier
					Limited to one per transaction
					Limited to 223 bytes
					OP_RETURN
					<push data>
			Coinbase Transactions (close Output)

3. P2P Network
	A. Types of nodes
		Full node
		Lightweight node
		Wallet
	B. Bootstrapping/running a full node
		How to run (cli, gui)
		Discovering nodes, downloading blockchain
		Testing (testnet)
	C. Network messaging
		Inventory - P2P messages
		Message types - Block Headers, Link to the Wiki
		Security considerations

4. Data Structures/Standards/Opcodes
	A. Standards
		Addresses
		Standard TX types (see also II.B.4.c)
		RPC standards
	B. Data structures
		Varint
		Vectors / Byte Sequence
			BCH uses something specific for this 
			See the re-enable op codes spec
		Script data types and limits
			Signature
			Redeem
			Hash pub key/address
			Limits
	C. Opcodes
		Types 
			Constants 
			Flow control 
			Stack 
			Splice 
			Bitwise logic
			Arithmetic 
			Cryptographic 
			Locktime 
			Label
		Opcodes list (described as per example of re-enabled op codes spec):
			Each language must interpret opcodes identically
			In some case size limits/equivalence must be observed
			Note: Redeem scripts should not use OP_CODES, potentially add this to consensus standard
		Checks
			Check lock time verify
			Check sequence verify


-----------------------
## WIP Notes

Sources:

http://doc.bitcoinabc.org/ (comments/docs in the code via doxygen)
https://github.com/Bitcoin-ABC/bitcoin-abc/blob/master/src/primitives/block.h
https://msdn.microsoft.com/en-us/library/windows/desktop/aa378932(v=vs.85).aspx
https://bitcoin.org/en/developer-reference#block-headers
https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers
https://en.bitcoin.it/wiki/Block_hashing_algorithm
https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki


Notes:

1) In some documentation (https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers), the data type for the two hash fields is `char[32]`, but in the code it is as documented above. Why the difference? 

2) What is the diff between BTC and BCH in terms of the protocol/spec? 
- BCH increases the block size max from 1MB to 32MB. 
- BCH addresses are different/updated from BTC.
- BCH enables various opcodes that are disabled in BTC.
- BCH blockchain diverges after the hard fork in Aug 2017.
- Existing docs in the /spec folder have details on the changes. These need to be incorporated into the master spec.