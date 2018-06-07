# BCH Spec - Block
Version: 0.1
Status: Work in progress.

## Block
This area of the BCH spec documents the block data structure, including block format, block header, and coinbase transaction.

### Block Description
A **block** is one of the two base primitives in the BCH system, the other being a **transaction**. Primitive in this context means it is one of the data structures for which the BCH software provides built-in support.

A block is a collection of one or more transactions prefaced by a **block header** and protected by proof-of-work. Each block in the blockchain contains the current transactions that have been verified plus a hash of the previous block. The first transaction in the **block body** is a required special transaction called the **coinbase transaction**. A new block is naturally limited to be generated every 10 minutes (600 seconds) on average.

### Block Purpose
The blockchain is a distributed ledger run individually by all full nodes in the BCH network. A full node has a complete copy of all blocks in the blockchain and runs the BCH core client software used to maintain the blockchain.

Each block comprises unique data stored in the blockchain, including block metadata and transaction data. The block header identifies the block. The block body contains one or more transactions.

### Block Requirements
Under current BCH consensus rules (version ?), a block is not valid unless its serialized size is not more than 32 MB. All fields described below count towards the serialized size limit.

Bytes 	| Name 			| Data type 		| Description
--------|---------------|-------------------|------------
80 		| block header 	| block_header 		| Block metadata (see [Block Header](#block-header)).
Varies 	| txn_count 	| compactSize uint 	| Total number of transactions in this block, including the coinbase transaction.
Varies 	| txns 			| raw transaction 	| Each transaction in this block in raw (serialized) transaction format. 

Blocks are serialized in binary format for transport on the network. See [Block Header](#block-header) for serialization requirements for the block header. Raw transactions must appear in the data stream in the same order their TXIDs appeared in the first row of the merkle tree. See [Transactions](#transactions).

### Block Details
On the local disk file system of a full node, each block in the blockchain is stored in a `*.dat` file. For example, on Windows 10 blocks are stored at C:\Users\user\AppData\Roaming\Bitcoin\blocks. An index of each block is also generated and stored, as well as other blockchain metadata.

## Block Header
This section of the BCH spec documents the block header.

### Block Header Description
The block header is the first 80-bytes of each block and comprises six fields concatenated together in hex notation: version, hash of previous block, hash of the merkle root (transactions in this block), timestamp, difficulty target, and nonce. See [Block Header Requirements](#block-header-requirements).

A block is identified by the hash of its header which is a unique signature for each block in the blockchain. The block header hash is included in the next block that is mined. In other words, the block header includes a pointer to the previous block that links them in the blockchain.

The serialized (raw) form of each block header is hashed as part of the hashcash algorithm (proof-of-work), making the serialized block header part of the BCH consensus rules. The block header is hashed repeatedly to create proof-of-work.

### Block Header Purpose
The block header provides metadata about the block and its transactions. The block header ensures the integrity of transactions on the blockchain by leveraging the capabilities of hashing. If a bad actor wanted to alter a transaction, it would be extremely difficult because the hash of the previous block header is stored in the subsequent block, so it would have to be changed as well. As more blocks are mined and added to the blockchain, the block becomes virtually impossible to alter. 

### Block Header Requirements
The block header is 80 bytes serialized in binary format and requires the following six fields:

Field 			| Size (bytes) 	| Data type | Description
----------------|---------------|-----------|------------
`nVersion` 		| 4 			| int32_t 	| The version number indicates which set of block validation rules to follow.
`hashPrevBlock` | 32 			| uint256 	| The SHA256(SHA256(Block_Header)) hash digest of the previous block’s header.
`hashMerkleRoot`| 32 			| uint256 	| SHA256(SHA256(Merkle_Root)) hash digest of the merkle root.
`nTime` 		| 4 			| uint32_t 	| Current timestamp in seconds since 1970-01-01T00:00 UTC (Unix time).
`nBits` 		| 4 			| uint32_t 	| Difficulty target for the proof-of-work for this block.
`nNonce`		| 4 			| uint32_t 	| 32-bit number (starts at 0) used to generate this block (the "nonce").

### Block Header Serialization Details
BCH uses SHA256(SHA256(Block_Header)) to hash the block header. You must ensure that the block header is in the proper byte-order before hashing. The following serialization rules apply to the block header:

- Both hash fields use double-hashing (`SHA256(SHA256(DATA))`) and are seralized in internal byte order, which means the standard order in which hash message digests are displayed as strings.
- The values for all other fields in the block header are serialized in little-endian order. Note that when displayed via a block browser or query, the ordering is big-endian. (Verify this, see https://en.bitcoin.it/wiki/Block_hashing_algorithm#endianess). 

## Version
The **version*** is a data field in the block header. The block header version number is a signed 4 byte integer (int32_t) that indicates which set of block validation rules to follow. For BCH the current version value is ???

## Previous Block Hash
The SHA256(SHA256(Block_Header)) hash digest of the previous block’s header. This ensures no previous block can be changed without also changing this block’s header.

## Merkle Root
The **Merkle root** is included in the block header. The Merkle root is a SHA256(SHA256(Merkle_root)) hash digest that is derived from the hashes of all transactions included in the block. Specifically, the Merkle root is the hash of all the hashes of all the transactions in the block as each transaction is hashed. The Merkle root helps ensure the integrity of the transactions in the block, ensuring they cannot be modified without changing the block header.

The Merkle tree is a record of all transactions in the block in order of the transaction timestamp. Each transaction in the block (leaf in the tree) includes a hash of the previous transaction hash. Using this approach means that the Merkle root is a hash of all transactions in the block. 

Note that the Merkle root makes it is possible in the future to securely verify that a transaction has been accepted by the network using just the block header (which includes the Merkle tree), eliminating the current requirement to download the entire blockchain.

## Timestamp
A timestamp is included in the block haeder. The block time is a Unix epoch time when the miner started hashing the header (according to the miner). The block timestamp must be greater than the median time of the previous 11 blocks. Full nodes will not accept blocks with timestamps more than two hours in the future according to their clock.

## Difficulty Target
The difficulty target is included in the block header. The difficulty target establishes the rules for proof-of-work. Specifically, the difficulty target is an encoded version of the target threshold this block’s header hash must be less than or equal to. The block header hash must satisfy the claimed `nBits` proof-of-work. In other words, the `nBits` value must match the difficulty rules. See [Proof of Work](#proof-of-work). 

Difficulty is a measure of how difficult it is to find a hash below a given target. The BCH network has a global block difficulty. Valid blocks must have a hash below the difficulty target. 

In the block header the difficulty target is a hash where the leading 32 bits are zero and the rest are one (this is known as "pool difficulty" or "pdiff"). The Bitcoin protocol represents targets as a custom floating point type with limited precision; as a result, Bitcoin clients often approximate difficulty based on this (this is known as "bdiff").

Each block stores a packed representation (called "Bits") for its actual hexadecimal target. The target can be derived from it via a predefined formula. The current difficulty target is available here: <https://blockexplorer.com/api/status?q=getDifficulty>.

## Nonce
The "nonce" is included in the block header. The nonce is a 32-bit (4-byte) field whose value is set so that the hash of the block will contain a run of leading zeros. The rest of the fields may not be changed, as they have a defined meaning.

In practice the nonce is an arbitrary number miners change to modify the header hash in order to produce a hash less than or equal to the difficulty target. If all 32-bit values are tested, the time can be updated or the coinbase transaction can be changed and the merkle root updated.

Any change to the block data (such as the nonce) will make the block hash completely different. Since it is believed infeasible to predict which combination of bits will result in the right hash, many different nonce values are tried, and the hash is recomputed for each value until a hash containing the required number of zero bits as set by the difficulty target is found. The resulting hash has to be a value less than the current difficulty and so will have to have a certain number of leading zero bits to be less than that. As this iterative calculation requires time and resources, the presentation of the block with the correct nonce value constitutes proof-of-work.

A nonce which results in a hash value lower than the target difficulty with the requisite number of leading zeros (currently 32) satifies the proof-of-work.

## Coinbase Transaction
This section of the BCH spec documents the coinbase transaction that is required for each block.

### Coinbase TX Description
A coinbase transaction (TX) is a special transaction that is the first transaction in the transaction body of a block. The coinbase transaction is created by a miner who is the first to complete the proof-of-work for this block. The coinbase transaction includes a single coinbase field, which is a special data field used as the sole input for coinbase transactions. The coinbase field allows claiming the block reward and provides up to 100 bytes for arbitrary data.

See the Transaction > Coinbase section for more details.

### Coinbase TX Purpose
The purpose of the coinbase transaction is to pay the miner for proof-of-work. It also ensures the validity of each transaction in the block.

### Coinbase TX Requirements
The first transaction in a block must be a coinbase transaction which should collect and spend any transaction fees paid by transactions included in this block.