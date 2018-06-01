

hashcash POW fuction
	service string
		version
		hash of previous block
		root hash of merkle tree (all txs in the block)
		current time
		difficulty
	nonce (extraNonce)
	counter


Nodes collect new transactions into a block, hash them into a hash tree, and scan through nonce values to make the block's hash satisfy proof-of-work requirements. When they solve the proof-of-work, they broadcast the block to everyone and the block is added to the block chain. The first transaction in the block is a special one (called the "coinbase transaction") that creates a new coin owned by the creator of the block.

The block header is built from the followign six fields, concatenated together as little-endian values in hex notation, then hashed.

Field 			| Size (bytes) 	| Data type | Description
nVersion 		| 4 			| int32_t 	| Version of the BCH software.
hashPrevBlock 	| 32 			| uint256 	| SHA256 hash of the previous block header (SHA256(SHA256(Block_Header)).
hashMerkleRoot	| 32 			| uint256 	| SHA256 hash of all of accepted transactions in this block.
nTime 			| 4 			| uint32_t 	| Current timestamp in seconds since 1970-01-01T00:00 UTC.
nBits 			| 4 			| uint32_t 	| Difficulty requirement for the proof of work target for this block.
nNonce			| 4 			| uint32_t 	| 32-bit number (starts at 0) used to generate this block (the "nonce).

Ref:

https://en.bitcoin.it/wiki/Block_hashing_algorithm
https://en.bitcoin.it/wiki/Protocol_documentation#Block_Headers
http://en.cppreference.com/w/cpp/types/integer
https://bitcoin.org/en/developer-reference#block-headers

Notes:

Source: \bitcoin-abc\src\primitives\block.h.
Coding convention: Hungarian notation (https://msdn.microsoft.com/en-us/library/windows/desktop/aa378932(v=vs.85).aspx) is used to include a suggestion of the data type with the variable name.

- hash is SHA-256
- n means short integer (short int) 

See also:
https://google.github.io/styleguide/cppguide.html#Constant_Names
https://en.wikipedia.org/wiki/Hungarian_notation

https://bitcoin.org/en/developer-reference#block-headers

Questions:

1) In some documentation I see the data type for the two hash fields is char[32], but in the code it is as documented above. Why the difference? 

2) 