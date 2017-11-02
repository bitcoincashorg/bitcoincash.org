# November 13th Bitcoin Cash Hardfork Technical Details

Version 1.0, 2017-11-01

## Summary
 
When the median time past[1] of the most recent 11 blocks (MTP-11) is greater than or equal to UNIX timestamp 1510600000 Bitcoin Cash will execute a hardfork according to this specification. Starting from the next block these three consensus rules changes will take effect:

* Enforcement of LOW_S signatures ([BIP 0146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki#low_s))
* Enforcement of NULLFAIL ([BIP 0146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki#nullfail))
* A replacement for the emergency difficulty adjustment. The algorithm for the new difficulty adjustment is described below

## Difficulty Adjustment Algorithm Description

To calculate the difficulty of a given block (B_n+1), with an MTP-11[1] greater than or equal to the unix timestamp 1510600000, perform the following steps:

* NOTE: Implementations must use integer arithmetic only

1. Let B_n be the Nth block in a Bitcoin Cash Blockchain.
1. Let B_last be the middle block[2] of the [B_n, B_n-1, B_n-2] when sorted by timestamp.
1. Let B_first be the middle block[2] of the [B_n-144, B_n-145, B_n-146] when sorted by timestamp.
1. Let the Timespan (TS) be equal to the difference in UNIX timestamps (in seconds) between B_last and B_first within the range [72 * 600, 288 * 600].  Values outside should be treated as their respective limit
1. Let the Work Performed (W) be equal to the difference in chainwork[3] between B_last  and B_first.
1. Let the Projected Work (PW) be equal to (W * 600) / TS.
1. Let Target (T) be equal to the (2^256 - PW) / PW.  This is calculated by taking the two’s complement of PW (-PW) and dividing it by PW (-PW / PW).
1. The target difficulty for block B_n+1 is then equal to the lesser of T and 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

## References

 - [Algorithm](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/be51cf295c239ff6395a0aa67a3e13906aca9cb2)
 - [Activation](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/18dc8bb907091d69f4887560ab2e4cfbc19bae77)
 - [Activation Time](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/8eed7939c72781a812fdf3fb8c36d4e3a428d268)

FAQ
---
Q: Does this imply that if the blocks are timestamped sequentially, the last block has no effect since it will look at the block before that one?

A: Yes

Footnotes
---------
1. The MTP-11 of a block is defined as the median timestamp of the last 11 blocks prior to, and including, a specific block
2. If two timestamps are the same, the one with the greater block height will be used.  See [GetSuitableBlock](https://github.com/Bitcoin-ABC/bitcoin-abc/commit/be51cf295c239ff6395a0aa67a3e13906aca9cb2#diff-ba91592f703a9d0badf94e67144bc0aaR208)
3. Chainwork for a Block (B) is the sum of block proofs from the genesis block to B.  Block proofs is defined in [chain.cpp](https://github.com/Bitcoin-ABC/bitcoin-abc/blob/d8eac91f8d16716eed0ad11ccac420122280bb13/src/chain.cpp#L132)
