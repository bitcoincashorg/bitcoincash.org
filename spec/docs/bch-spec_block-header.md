# BCH Spec
Version: 0.1
Status: Work in progress.

## Block Header
This section of the BCH spec documents the block header.

### Description

A block is a collection of one or more transactions prefaced by a **block header** and protected by proof-of-work. Blocks are the data stored on the block chain.

The block header is the unique signature for each block in the blockchain. The block header is the first 80-bytes of each block and comprises six fields concatenated together and encoded in hex notation. The block header is hashed and included in the next block that is mined.

### Purpose

The serialized (raw) form of each block header is hashed as part of the hashcash algorithm (proof-of-work), making the serialized block header part of the consensus rules. The block header is hashed repeatedly to create proof-of-work.

In addition, the block header ensures the integrity of the blockchain and its transactions by leveraging the fuctionality of hashing. If someone wanted to alter a transaction, it would be nearly impossible because the hash of the header stored in each block would have to also be modified.

### Requirements

The block header requires the following six fields:

Field 			| Size (bytes) 	| Data type | Description
----------------|---------------|-----------|------------
nVersion 		| 4 			| int32_t 	| The version number indicates which set of block validation rules to follow. 
hashPrevBlock 	| 32 			| uint256 	| The SHA256(SHA256(Block_Header)) hash digest of the previous block’s header. This ensures no previous block can be changed without also changing this block’s header.
hashMerkleRoot	| 32 			| uint256 	| SHA256(SHA256(Merkle_Root)) hash digest of the merkle tree. The merkle root is derived from the hashes of all transactions included in this block, ensuring that none of those transactions can be modified without modifying the header.
nTime 			| 4 			| uint32_t 	| Current timestamp in seconds since 1970-01-01T00:00 UTC (Unix time). The block time is a Unix epoch time when the miner started hashing the header (according to the miner). Must be strictly greater than the median time of the previous 11 blocks. Full nodes will not accept blocks with headers more than two hours in the future according to their clock.
nBits 			| 4 			| uint32_t 	| Difficulty target for the proof-of-work for this block. An encoded version of the target threshold this block’s header hash must be less than or equal to. See the nBits format described below.
nNonce			| 4 			| uint32_t 	| 32-bit number (starts at 0) used to generate this block (the "nonce"). An arbitrary number miners change to modify the header hash in order to produce a hash less than or equal to the target threshold. If all 32-bit values are tested, the time can be updated or the coinbase transaction can be changed and the merkle root updated.

Notes:
- hash is SHA256(SHA256()) in internal byte order, wich means the standard order in which hash digests are displayed as strings.
- The values for all other fields are in little-endian order.

### Details

Bitcoin Cash uses SHA256(SHA256(Block_Header)) to hash the block header. You must ensure that the block heaser is in the proper byte-order before hashing. The block header hash must satisfy claimed `nBits` proof of work. In other words, the `nBits` value must match the difficulty rules. See "Proof of Work" section for more details.

### Other

Sources:

https://github.com/Bitcoin-ABC/bitcoin-abc/blob/master/src/primitives/block.h
https://msdn.microsoft.com/en-us/library/windows/desktop/aa378932(v=vs.85).aspx
https://bitcoin.org/en/developer-reference#block-headers
https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers
https://en.bitcoin.it/wiki/Block_hashing_algorithm
https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki


Questions:

1) In some documentation (https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers), the data type for the two hash fields is `char[32]`, but in the code it is as documented above. Why the difference? 

2) How should the field names be documented? As is in the code?

