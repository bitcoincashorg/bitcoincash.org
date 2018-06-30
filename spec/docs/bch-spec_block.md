# BCH Spec - Block
Version: 0.1
Status: Work in progress.

## Block
This area of the BCH spec covers the block data structure, including block format, block header, and coinbase transaction.

#### Description
A **block** is a collection of one or more transactions prefaced by a **block header** and protected by the [proof-of-work](proof-of-work). Each block in the blockchain contains the current transactions that have been verified plus a hash of the previous block. The first transaction in the **block body** is a required special transaction called the **coinbase transaction**. A new block is naturally limited to be generated every 10 minutes (600 seconds) on average.

A **block** is one of the two base primitives in the BCH system, the other being a **transaction**. Primitive in this context means it is one of the data structures for which the BCH software provides built-in support.

#### Purpose
Each block comprises unique data stored in the blockchain, including block metadata and transaction data. The block header identifies the block. The block body contains one or more transactions. The blockchain is a distributed ledger run individually by all full nodes in the BCH network. A full node has a complete copy of all blocks in the blockchain and runs the BCH core client software used to maintain the blockchain.

#### Requirements
Under current BCH consensus rules (see [version](#version), a block is valid if its searlized size is not more than 32 MB. All fields described below count towards the serialized size limit.

Bytes 	| Name 			| Data type 		| Description
--------|---------------|-------------------|------------
80 		| block header 	| block_header 		| Block metadata (see [Block Header](#block-header)).
Varies 	| txn_count 	| compactSize uint 	| Total number of transactions in this block, including the coinbase transaction.
Varies 	| txns 			| raw transaction 	| Each transaction in this block in raw (serialized) transaction format. 

#### Serialization
Blocks are serialized in binary format for transport on the network. See [Block Header](#block-header) for serialization requirements for the block header. Raw transactions must appear in the data stream in the same order their TXIDs appeared in the first row of the merkle tree. See [Transactions](#transactions).

#### Storage
Each block is stored on the local disk file system of full nodes in a `*.dat` file. For example, on Windows 10 blocks are stored at C:\Users\user\AppData\Roaming\Bitcoin\blocks. An index of each block is also generated and stored, as well as other blockchain metadata.

## Block Header
This section of the BCH spec documents the block header.

#### Description
The block header is the first 80-bytes of each block comprising six fields concatenated together in hex notation: [version](#version), [hash of previous block](#previous-block-hash), [hash of the merkle root](#merkle-root-hash), [timestamp](#time), [difficulty](difficulty-target), and [nonce](#nonce). See [Block Header Requirements](#block-header-requirements).

A block is identified by the hash of its header which is a unique signature for each block in the blockchain. The block header hash is included in the next block that is mined. The block header includes a pointer to the previous block that links them in the blockchain.

The serialized (raw) form of each block header is hashed as part of the proof-of-work, making the serialized block header part of the BCH consensus rules. As part of the mining process, the block header is hashed repeatedly to create proof-of-work.

#### Purpose
The block header provides an immutable record of all transactions in a block. The block header ensures the integrity of transactions on the blockchain by leveraging the capabilities of hashing. It would be extremely difficult to alter a transaction after it has been committed to the blockchain because the hash of the previous block header is stored in the subsequent block. As more blocks are mined and added to the blockchain, the block becomes virtually impossible to alter. 

#### Requirements
The block header is 80 bytes serialized in binary format and requires the following six fields:

Field 			| Size (bytes) 	| Data type | Description
----------------|---------------|-----------|------------
`nVersion` 		| 4 			| int32_t 	| The version number indicates which set of block validation rules to follow.
`hashPrevBlock` | 32 			| uint256 	| The SHA256(SHA256(Block_Header)) hash digest of the previous block’s header.
`hashMerkleRoot`| 32 			| uint256 	| SHA256(SHA256(Merkle_Root)) hash digest of the merkle root.
`nTime` 		| 4 			| uint32_t 	| Current timestamp in seconds since 1970-01-01T00:00 UTC (Unix time).
`nBits` 		| 4 			| uint32_t 	| Difficulty target for the proof-of-work for this block.
`nNonce`		| 4 			| uint32_t 	| 32-bit number (starts at 0) used to generate this block (the "nonce").

#### Serialization
BCH uses SHA256(SHA256(Block_Header)) to hash the block header. You must ensure that the block header is in the proper byte-order before hashing. The following serialization rules apply to the block header:

- Both hash fields use double-hashing (`SHA256(SHA256(DATA))`) and are seralized in internal byte order, which means the standard order in which hash message digests are displayed as strings.
- The values for all other fields in the block header are serialized in little-endian order. Note that when displayed via a block browser or query, the ordering is big-endian. (https://en.bitcoin.it/wiki/Block_hashing_algorithm#endianess). 

### Version
The block header version number is a signed 4 byte integer (int32_t) that indicates which set of block validation rules to follow. For BCH the current version value is ???

### Previous Block Hash
The SHA256(SHA256(Block_Header)) hash digest of the previous block’s header. This ensures no previous block can be changed without also changing this block’s header. 

### Merkle Root
The **Merkle root** is a SHA256(SHA256(Merkle_root)) hash digest that is derived from the hashes of all transactions in the block. The Merkle root ensures the integrity of transactions in the block because they cannot be modified without changing the block header.

The Merkle tree is a record of all transactions in the block in order of the transaction timestamp. Each transaction in the block is a leaf in the tree and includes a hash of the previous transaction hash. The Merkle root thereby a hash of all transactions in the block. 

Note that the Merkle root makes it is possible in the future to securely verify that a transaction has been accepted by the network using just the block header (which includes the Merkle tree), eliminating the current requirement to download the entire blockchain.

### Timestamp
The block timestamp is Unix epoch time when the miner started hashing the header according to the miner's clock. The block timestamp must be greater than the median time of the previous 11 blocks. Full nodes will not accept blocks with timestamps more than two hours in the future according to their clock.

### Difficulty Target
The difficulty target establishes the rules for proof-of-work. Specifically, the difficulty target is an encoded version of the target threshold this block’s header hash must be less than or equal to. The block header hash must satisfy the claimed `nBits` [proof-of-work]((#proof-of-work).

Difficulty is a measure of how difficult it is to find a hash below a given target. The BCH network has a global block difficulty. Valid blocks must have a hash below the difficulty target; the `nBits` value must match the difficulty rules.

In the block header the difficulty target is a hash where the leading 32 bits are zero and the rest are one ("pool difficulty" or `pdiff`). The BCH protocol represents the difficutly target as a custom floating point type with limited precision; as a result, clients often approximate difficulty based on this (`bdiff`).

Each block stores a packed representation (called "Bits") for its actual hexadecimal target. The target can be derived from it via a predefined formula. The current difficulty target is available here: <https://blockexplorer.com/api/status?q=getDifficulty>.

### Nonce
The nonce is a 32-bit (4-byte) field whose value is set so that the hash of the block will contain a run of leading zeros. The rest of the fields may not be changed, as they have a defined meaning. A nonce that results in a hash value lower than the difficulty target  with the required number of leading zeros (currently 32) satifies the proof-of-work. 

The nonce is the solution to the mining process. Individual blocks must contain a proof of work to be considered valid. This proof of work is verified by other BCH nodes each time they receive a block.

The nonce is an arbitrarily changed by miners to modify the header hash and produce a hash less than or equal to the difficulty target. If all 32-bit values are tested, the time can be updated or the coinbase transaction can be changed and the merkle root updated.

Any change to the nonce will make the block header hash completely different. Since it is virtually impossible to predict which combination of bits will result in the right hash, many different nonce values are tried, and the hash is recomputed for each value until a hash containing the required number of zero bits as set by the difficulty target is found. The resulting hash has to be a value less than the current difficulty and so will have to have a certain number of leading zero bits to be less than that. As this iterative calculation requires time and resources, the presentation of the block with the correct nonce value constitutes proof-of-work.

## Coinbase Transaction
This section of the BCH spec documents the coinbase transaction that is part of each block.

### Description
A coinbase transaction (TX) is a special transaction that is required and is always the first transaction in the body of a block. The coinbase transaction is created by a miner who is the first to publish proof-of-work for this block. (???) The coinbase transaction includes a single `coinbase` field, which is a special data field used as the sole input for coinbase transactions.

### Purpose
The purpose of the coinbase transaction is to pay the miner for proof-of-work and any transaction fees. It also ensures the validity of each transaction in the block since a miner cannot create a coinbase transaction until proof-of-work is satisfied. (???)

### Requirements
The first transaction in a block must be a coinbase transaction which should collect and spend any transaction fees paid by transactions included in this block.

The `coinbase` field is the sole input. It allows claiming the block reward and provides up to 100 bytes for arbitrary data. See the Transaction > Coinbase section for more details.