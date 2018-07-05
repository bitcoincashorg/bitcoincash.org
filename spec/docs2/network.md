+++
date = "2018-07-05"
title = "Network"
description = "Network, peer-to-peer communications"
category = "bch spec"
+++

This section of the BCH spec documents the peer-to-peer network protocol governing communication among BCH nodes.

This spec is based on the Bitcoin ABC implementation of the [BitcoinCash](<https://www.bitcoincash.org/>) protocol. Additional resources:
- Bitcoin ABC source code: <https://github.com/Bitcoin-ABC/bitcoin-abc/tree/master/src>
- Bitcoin ABC developer documentation: <http://doc.bitcoinabc.org/index.html>

## BCH Network

All peer-to-peer communication among BCH nodes is TCP. Unless otherwise noted, all multi-byte integers must be transmitted in little-endian order.

### Constants And Defaults
The following constants and defaults are supported (see also the chainparams.cpp source code file).

| Network | Default Port | Start String 								 | Max nBits
|---------|--------------|-----------------------------------------------|---------------
| Mainnet | 8333         | 0xf9beb4d9                                    | 0x1d00ffff
| Testnet | 18333        | 0x0b110907                                    | 0x1d00ffff
| Regtest | 18444        | 0xfabfb5da                                    | 0x207fffff

Command line parameters can change what port a node listens on (see `-help`). Start strings are hardcoded constants that appear at the start of all messages sent on the Bitcoin network; they may also appear in data files such as the system's block database.  The nBits displayed above are in big-endian order; they're sent over the network in little-endian order.

Note that the [chainparams.cpp][core chainparams.cpp] also includes other constants useful to programs, such as the hash of the genesis blocks for the different networks.

## Protocol Versions
-- WHAT protocol version(s) does BCH support?

## Message Header
All messages in the network protocol use the same container format, which provides a required multi-field message header and an optional payload. 

The message header format is:

| Bytes | Name         | Data Type | Description
|-------|--------------|-----------|-------------
| 4     | start string | char[4]   | Magic bytes indicating the originating network; used to seek to next message when stream state is unknown.
| 12    | command name | char[12]  | ASCII string which identifies what message type is contained in the payload.  Followed by nulls (0x00) to pad out byte count; for example: `version\0\0\0\0\0`.
| 4     | payload size | uint32_t  | Number of bytes in payload. The current maximum number of bytes (`MAX_SIZE`) allowed in the payload is 32 MiB. messages with a payload size larger than this will be dropped or rejected.
| 4     | checksum     | char[4]   | First 4 bytes of SHA256(SHA256(payload)) in internal byte order. If payload is empty, as in `verack` and `getaddr` messages, the checksum is always 0x5df6e0e2 (SHA256(SHA256(\<empty string>))).

## Data Message
The following network messages all request or provide data related to transactions and blocks:

| Request Message   | Reply Message
|-------------------|---------------
| getHeaders 		| headers		
| getBlocks			| inv
| mempool 			| inv
| getData 			| tx, block, merkeblock, notfound	


Many of the data messages use inventories as unique identifiers for transactions and blocks. Inventories have a simple 36-byte structure:

| Bytes | Name            | Data Type | Description
|-------|-----------------|-----------|-------------
| 4     | type identifier | uint32_t  | The type of object which was hashed.  See list of type identifiers below.
| 32    | hash            | char[32]  | SHA256(SHA256()) hash of the object in internal byte order.

The currently-available type identifiers are:

| Type Identifier | Name                        | Description
|-----------------|-----------------------------|---------------
| 1               | `MSG_TX`                    | The hash is a TXID.
| 2               | `MSG_BLOCK`                 | The hash is of a block header.
| 3               | `MSG_FILTERED_BLOCK`        | The hash is of a block header; identical to `MSG_BLOCK`. When used in a `getdata` message, this indicates the response should be a `merkleblock` message rather than a `block` message (if a bloom filter was previously configured). **Only for use in `getdata` messages.**
| 4               | `MSG_CMPCT_BLOCK`           | The hash is of a block header; identical to `MSG_BLOCK`. When used in a `getdata` message, this indicates the response should be a `cmpctblock` message. **Only for use in `getdata` messages.**
| 5               | `MSG_WITNESS_BLOCK`         | The hash is of a block header; identical to `MSG_BLOCK`. When used in a `getdata` message, this indicates the response should be a block message with transactions that have a witness using witness serialization. **Only for use in `getdata` messages.**
| 6               | `MSG_WITNESS_TX`            | The hash is a TXID. When used in a `getdata` message, this indicates the response should be a transaction message, if the witness structure is nonempty, the witness serialization will be used. **Only for use in `getdata` messages.**
| 7               | `MSG_FILTERED_WITNESS_BLOCK` | Reserved for future use, not used as of Protocol Version 70015.

Type identifier zero and type identifiers greater than three are reserved for future implementations. The system ignores all inventories with one of these unknown types.

## Block Message
The `block` message transmits a single serialized block in the format described in the serialized blocks section. It can be sent for two different reasons:

1. **GetData Response:** Nodes will always send it in response to a `getdata` message that requests the block with an inventory type of `MSG_BLOCK` (provided the node has that block available for relay).

2. **Unsolicited:** Some miners will send unsolicited `block` messages broadcasting their newly-mined blocks to all of their peers. Many mining pools do the same thing, although some may be misconfigured to send the block from multiple nodes, possibly sending the same block to some peers more than once.

## GetBlocks
The `getblocks` message requests an `inv` message that provides block header hashes starting from a particular point in the block chain. It allows a peer which has been disconnected or started for the first time to get the data it needs to request the blocks it hasn't seen.

Peers which have been disconnected may have stale blocks in their locally-stored block chain, so the `getblocks` message allows the requesting peer to provide the receiving peer with multiple header hashes at various heights on their local chain. This allows the receiving peer to find, within that list, the last header hash they had in common and reply with all subsequent header hashes.

Note: the receiving peer itself may respond with an `inv` message containing header hashes of stale blocks.  It is up to the requesting peer to poll all of its peers to find the best block chain.

If the receiving peer does not find a common header hash within the list, it will assume the last common block was the genesis block (block zero), so it will reply with in `inv` message containing header hashes starting with block one (the first block after the genesis block).

| Bytes    | Name                 | Data Type        | Description
|----------|----------------------|------------------|----------------
| 4        | version              | uint32_t         | The protocol version number; the same as sent in the `version` message.
| *Varies* | hash count           | compactSize uint | The number of header hashes provided not including the stop hash. There is no limit except that the byte size of the entire message must be below the `MAX_SIZE` limit; typically from 1 to 200 hashes are sent.
| *Varies* | block header hashes  | char[32]         | One or more block header hashes (32 bytes each) in internal byte order.  Hashes should be provided in reverse order of block height, so highest-height hashes are listed first and lowest-height hashes are listed last.
| 32       | stop hash            | char[32]         | The header hash of the last header hash being requested; set to all zeroes to request an `inv` message with all subsequent header hashes (a maximum of 500 will be sent as a reply to this message; if you need more than 500, you will need to send another `getblocks` message with a higher-height header hash as the first entry in block header hash field).

## GetData
The `getdata` message requests one or more data objects from another node. The objects are requested by an inventory, which the requesting node typically received previously by way of an `inv` message.

The response to a `getdata` message can be a `tx` message, `block` message, `merkleblock` message, `cmpctblock` message, or `notfound` message.

This message cannot be used to request arbitrary data, such as historic transactions no longer in the memory pool or relay set. Full nodes may not even be able to provide older blocks if they've pruned old transactions from their block database. For this reason, the `getdata` message should usually only be used to request data from a node which previously advertised it had that data by sending an `inv` message.

The format and maximum size limitations of the `getdata` message are identical to the `inv` message; only the message header differs.

## GetHeaders
The `getheaders` message requests a `headers` message that provides block headers starting from a particular point in the block chain. It allows a peer which has been disconnected or started for the first time to get the headers it hasn’t seen yet.

The `getheaders` message is nearly identical to the `getblocks` message, with one minor difference: the `inv` reply to the `getblocks` message will include no more than 500 block header hashes; the `headers` reply to the `getheaders` message will include as many as 2,000 block headers.

## Headers
The `headers` message sends block headers to a node which previously requested certain headers with a `getheaders` message. A headers message can be empty.

| Bytes    | Name    | Data Type        | Description
|----------|---------|------------------|-----------------
| *Varies* | count   | compactSize uint | Number of block headers up to a maximum of 2,000.  Note: headers-first sync assumes the sending node will send the maximum number of headers whenever possible.
| *Varies* | headers | block_header     | Block headers: each 80-byte block header is in the format described in the [block headers section][section block header] with an additional 0x00 suffixed.  This 0x00 is called the transaction count, but because the headers message doesn't include any transactions, the transaction count is always zero.

## Inv
The `inv` message (inventory message) transmits one or more inventories of objects known to the transmitting peer.  It can be sent unsolicited to announce new transactions or blocks, or it can be sent in reply to a `getblocks` message or `mempool` message.

The receiving peer can compare the inventories from an `inv` message against the inventories it has already seen, and then use a follow-up message to request unseen objects.

| Bytes    | Name      | Data Type             | Description
|----------|-----------|-----------------------|-----------------
| *Varies* | count     | compactSize uint      | The number of inventory entries.
| *Varies* | inventory | inventory             | One or more inventory entries up to a maximum of 50,000 entries.

## MemPool
The `mempool` message requests the TXIDs of transactions that the receiving node has verified as valid but which have not yet appeared in a block. That is, transactions which are in the receiving node's memory pool. The response to the `mempool` message is one or more `inv` messages containing the TXIDs in the usual inventory format.

Sending the `mempool` message is mostly useful when a program first connects to the network. Full nodes can use it to quickly gather most or all of the unconfirmed transactions available on the network; this is especially useful for miners trying to gather transactions for their transaction fees. SPV clients can set a filter before sending a `mempool` to only receive transactions that match that filter; this allows a recently-started client to get most or all unconfirmed transactions related to its wallet.

The `inv` response to the `mempool` message is, at best, one node's view of the network---not a complete list of unconfirmed transactions
on the network. There is no payload in a `mempool` message.  See the [message header
section][section message header] for an example of a message without a payload.

## MerkleBlock
The `merkleblock` message is a reply to a `getdata` message that requested a block using the inventory type `MSG_MERKLEBLOCK`.  It is only part of the reply: if any matching transactions are found, they will be sent separately as `tx` messages.

If a filter has been previously set with the `filterload` message, the `merkleblock` message will contain the TXIDs of any transactions in the requested block that matched the filter, as well as any parts of the block's merkle tree necessary to connect those transactions to the block header's merkle root. The message also contains a complete copy of the block header to allow the client to hash it and confirm its proof of work.

| Bytes    | Name               | Data Type        | Description
|----------|--------------------|------------------|----------------
| 80       | block header       | block_header     | The block header in the format described in the block header section.
| 4        | transaction count  | uint32_t         | The number of transactions in the block (including ones that don't match the filter).
| *Varies* | hash count         | compactSize uint | The number of hashes in the following field.
| *Varies* | hashes             | char[32]         | One or more hashes of both transactions and merkle nodes in internal byte order.  Each hash is 32 bytes.
| *Varies* | flag byte count    | compactSize uint | The number of flag bytes in the following field.
| *Varies* | flags              | byte[]           | A sequence of bits packed eight in a byte with the least significant bit first.  May be padded to the nearest byte boundary but must not contain any more bits than that.  Used to assign the hashes to particular nodes in the merkle tree as described below.

Note: when fully decoded, the above `merkleblock` message provided the TXID for a single transaction that matched the filter. In the network traffic dump this output was taken from, the full transaction belonging to that TXID was sent immediately after the `merkleblock` message as a `tx` message.

The `merkleblock` message provides three special data types: a transaction count, a list of hashes, and a list of one-bit flags. You can use the transaction count to construct an empty merkle tree. 

To create a `merkleblock` message, create a complete merkle tree with TXIDs on the bottom row and all the other hashes calculated up to the merkle root on the top row. For each transaction that matches the filter, track its TXID node and all of its ancestor nodes.

## CmpctBlock
The `cmpctblock` message is a reply to a `getdata` message which requested a block using the inventory type `MSG_CMPCT_BLOCK`. If the requested block was recently announced and is close to the tip of the best chain of the receiver and after having sent the requesting peer a `sendcmpct` message, nodes respond with a `cmpctblock` message containing data for the block. If the requested block is too old, the node responds with a *full non-compact block. 

Upon receipt of a `cmpctblock` message, after sending a `sendcmpct` message, nodes should calculate the short transaction ID for each unconfirmed transaction they have available (ie in their mempool) and compare each to each short transaction ID in the `cmpctblock` message. After finding already-available transactions, nodes which do not have all transactions available to reconstruct the full block should request the missing transactions using a `getblocktxn` message.

A node must not send a `cmpctblock` message unless they are able to respond to a `getblocktxn` message which requests every transaction in the block. A node 
must not send a `cmpctblock` message without having validated that the header properly commits to each transaction in the block, and properly builds on top of the existing, fully-validated chain with a valid proof-of-work either as a part of the current most-work valid chain, or building directly on top of it. A node may send a `cmpctblock` message before validating that each transaction in the block validly spends existing UTXO set entries.

The `cmpctblock` message contains a vector of `PrefilledTransaction` whose structure is defined below.

| Bytes    | Name                 | Data Type        | Description
|----------|----------------------|------------------|----------------
| *Varies* | index                | compactSize uint | The index into the block at which this transaction is located. 
| *Varies* | tx                   | Transaction      | The transaction which is in the block at the index.

The `cmpctblock` message is compromised of a serialized `HeaderAndShortIDs` structure which is defined below. A `HeaderAndShortIDs` structure is used to 
relay a block header, the short transactions IDs used for matching already-available transactions, and a select few transactions which we expect a peer may be missing.

| Bytes    | Name                 | Data Type              | Description
|----------|----------------------|------------------------|----------------
| 80       | block header         | block_header           | The block header in the format described in the block header section.
| 8        | nonce                | uint64_t               | A nonce for use in short transaction ID calculations.
| *Varies* | shortids length      | compactSize uint       | The number of short transaction IDs in the following field.
| *Varies* | shortids             | byte[]                 | The short transaction IDs calculated from the transactions which were not provided explicitly in prefilledtxn. Vector of 6-byte integers in the spec, padded with two null-bytes so it can be read as an 8-byte integer. **In version 2 of compact blocks, shortids should use the *wtxid* instead of *txid* as defined by *BIP141***
| *Varies* | prefilled txn length | compactSize uint       | The number of prefilled transactions in the following field.
| *Varies* | prefilled txn        | PrefilledTransaction[] | Used to provide the coinbase transaction and a select few which we expect a peer may be missing. Vector of `PrefilledTransaction` structures defined above.

Transactions inside `cmpctblock` messages (both those used as direct announcement and those in response to getdata) and in `blocktxn` messages must include witness data, using the same format as responses to getdata `MSG_WITNESS_TX`.

Upon receipt of a `getdata` message containing a request for a `MSG_CMPCT_BLOCK` object for which a `cmpctblock` message is not sent in response, the block message containing the requested block in non-compact form MUST be encoded with witnesses (as is sent in reply to a `MSG_WITNESS_BLOCK`) if the protocol version used to encode the `cmpctblock` message would have been 2, and encoded without witnesses (as is sent in response to a `MSG_BLOCK`) if the protocol version used to encode the `cmpctblock` message would have been 1.

Short transaction IDs are used to represent a transaction without sending a full 256-bit hash. They are calculated as follows,

* A single-SHA256 hashing the block header with the nonce appended (in little-endian)
* Running SipHash-2-4 with the input being the transaction ID (**wtxid in version 2 of compact blocks**) and the keys (k0/k1) set to the first two little-endian 64-bit integers from the above hash, respectively.
* Dropping the 2 most significant bytes from the SipHash output to make it 6 bytes.
* Two null-bytes appended so it can be read as an 8-byte integer.

## SendCmpct
The `sendcmpct` message is defined as a message containing a 1-byte integer followed by a 8-byte integer. The first integer is interpreted as a boolean and should have a value of either 1 or 0. The second integer is be interpreted as a little-endian version number. 

Upon receipt of a `sendcmpct` message with the first and second integers set to 1, the node should announce new blocks by sending a `cmpctblock` message. 

Upon receipt of a `sendcmpct` message with the first integer set to 0, the node shouldn't announce new blocks by sending a `cmpctblock` message, but instead announce new blocks by sending invs or headers, as defined by **BIP130**. 

Upon receipt of a `sendcmpct` message with the second integer set to something other than 1, nodes should treat the peer as if they had not received the message (as it indicates the peer will provide an unexpected encoding in `cmpctblock` messages, and/or other, messages). This allows future versions to send duplicate `sendcmpct` messages with different versions as a part of a version handshake for future versions.

Nodes should check for a protocol version of >= 70014 before sending `sendcmpct` messages. Nodes shouldn't send a request for a `MSG_CMPCT_BLOCK` object to a peer before having received a `sendcmpct` message from that peer. Nodes shouldn't request a `MSG_CMPCT_BLOCK` object before having sent all `sendcmpct` messages to that peer which they intend to send, as the peer cannot know what version protocol to use in the response.

The structure of a `sendcmpct` message is defined below.

| Bytes    | Name         | Data Type        | Description
|----------|--------------|------------------|----------------
| 1        | announce     | block_header     | An integer representing a boolean value, must be 1 or 0 (1 is true, 0 is false).
| 8        | version      | uint64_t         | A little-endian representation of a version number. **Version 2 compact blocks should be specified by setting version to 2**

## GetBlockTxn
The `getblocktxn` message is defined as a message containing a serialized `BlockTransactionsRequest` message. Upon receipt of a properly-formatted `getblocktxn` message, nodes which recently provided the sender of such a message a `cmpctblock` message for the block hash identified in this message must respond with either an appropriate `blocktxn` message, or a full block message. 

A `blocktxn` message response must contain exactly and only each transaction which is present in the appropriate block at the index specified in the `getblocktxn` message indexes list, in the order requested.

The structure of `BlockTransactionsRequest` is defined below.

| Bytes    | Name                 | Data Type              | Description
|----------|----------------------|------------------------|----------------
| 32       | block hash           | binary blob            | The blockhash of the block which the transactions being requested are in.
| *Varies* | indexes length       | compactSize uint       | The number of transactions being requested.
| *Varies* | indexes              | compactSize uint[]     | Vector of compactSize containing the indexes of the transactions being requested in the block. **In version 2 of compact blocks, the *wtxid* should be used instead of the *txid* as defined by *BIP141***

## BlockTxn
The `blocktxn` message is defined as a message containing a serialized `BlockTransactions` message. On receipt of a properly-formatted requested `blocktxn` message, nodes should attempt to reconstruct the full block by taking the prefilledtxn transactions from the original `cmpctblock` message and placing them in the marked positions, then for each short transaction ID from the original `cmpctblock` message, in order, find the corresponding transaction either from the `blocktxn` message or from other sources and place it in the first available position in the block then once the block has been reconstructed, it shall be processed as normal, keeping in mind that short transaction IDs are expected to occasionally collide, and that nodes must not be penalized for such collisions, 
wherever they appear.

The structure of `BlockTransactions` is defined below.

| Bytes    | Name                 | Data Type              | Description
|----------|----------------------|------------------------|----------------
| 32       | block hash           | binary blob            | The blockhash of the block which the transactions being provided are in.
| *Varies* | transactions length  | compactSize uint       | The number of transactions being provided.
| *Varies* | transactions         | Transactions[]         | Vector of transactions, for an example hexdump of the raw transaction format.

## NotFound
The `notfound` message is a reply to a `getdata` message which requested an object the receiving node does not have available for relay. (Nodes are not expected to relay historic transactions which are no longer in the memory pool or relay set. Nodes may also have pruned spent transactions from older blocks, making them unable to send those blocks.)

The format and maximum size limitations of the `notfound` message are identical to the `inv` message; only the message header differs.

## Tx
The `tx` message transmits a single transaction in the raw transaction format. It can be sent in a variety of situations;

* **Transaction Response:** Node will send it in response to a `getdata` message that requests the transaction with an inventory type of `MSG_TX`.

* **MerkleBlock Response:** Node will send it in response to a `getdata` message that requests a merkle block with an inventory type
  of `MSG_MERKLEBLOCK`. (This is in addition to sending a `merkleblock` message.) Each `tx` message in this case provides a matched transaction from that block.

## Connection Control Messages

The following network messages all help control the connection between two peers or allow them to advise each other about the rest of the network.

## Addr
The `addr` (IP address) message relays connection information for peers on the network. Each peer which wants to accept incoming connections creates an `addr` message providing its connection information and then sends that message to its peers unsolicited. Some of its peers send that information to their peers (also unsolicited), some of which further distribute it, allowing decentralized peer discovery for any program already on the network.

An `addr` message may also be sent in response to a `getaddr` message.

| Bytes      | Name             | Data Type          | Description
|------------|------------------|--------------------|----------------
| *Varies*   | IP address count | compactSize uint   | The number of IP address entries up to a maximum of 1,000.
| *Varies*   | IP addresses     | network IP address | IP address entries.  See the table below for the format of a Bitcoin network IP address.

Each encapsulated network IP address currently uses the following structure:

| Bytes | Name       | Data Type | Description
|-------|------------|-----------|---------------
| 4     | time       | uint32    | A time in Unix epoch time format.  Nodes advertising their own IP address set this to the current time. Nodes advertising IP addresses they've connected to set this to the last time they connected to that node.  Other nodes just relaying the IP address should not change the time.  Nodes can use the time field to avoid relaying old `addr` messages. Malicious nodes may change times or even set them in the future.
| 8     | services   | uint64_t  | The services the node advertised in its `version` message.
| 16    | IP address | char      | IPv6 address in **big endian byte order**. IPv4 addresses can be provided as IPv4-mapped IPv6 addresses.
| 2     | port       | uint16_t  | Port number in **big endian byte order**.  Note that the system will only connect to nodes with non-standard port numbers as a last resort for finding peers. This is to prevent anyone from trying to use the network to disrupt non-Bitcoin services that run on other ports.

## Alert
The legacy alert messaging system is retired; however, internal alerts, partition detection warnings and the `-alertnotify` option features remain.

## FeeFilter
The `feefilter` message is a request to the receiving peer to not relay any transaction inv messages to the sending peer where the fee rate for the
transaction is below the fee rate specified in the feefilter message.

`feefilter` was introduced following the introduction of mempool limiting. Mempool limiting provides protection against attacks and spam transactions that have low fee rates and are unlikely to be included in mined blocks. The `feefilter` messages allows a node to inform its peers that it will not accept transactions below a specified fee rate into its mempool, and therefore that the peers can skip relaying inv messages for transactions below that fee rate to that node.

| Bytes | Name    | Data Type | Description
|-------|---------|-----------|---------------
| 8     | feerate | uint64_t  | The fee rate (in satoshis per kilobyte) below which transactions should not be relayed to this peer.

The receiving peer may choose to ignore the message and not filter transaction inv messages.

The fee filter is additive with bloom filters. If an SPV client loads a bloom filter and sends a feefilter message, transactions should only be relayed if
they pass both filters.

Note however that feefilter has no effect on block propagation or responses to getdata messages. For example, if a node requests a merkleblock from its peer
by sending a getdata message with inv type MSG_FILTERED_BLOCK and it has previously sent a feefilter to that peer, the peer should respond with a merkleblock containing *all* the transactions matching the bloom filter, even if they are below the feefilter fee rate.

inv messages generated from a mempool message are subject to a fee filter if it exists.

## FilterAdd
The `filteradd` message tells the receiving peer to add a single element to a previously-set bloom filter, such as a new public key. The element is
sent directly to the receiving peer; the peer then uses the parameters set in the `filterload` message to add the element to the bloom filter.

Because the element is sent directly to the receiving peer, there is no obfuscation of the element and none of the plausible-deniability privacy
provided by the bloom filter. Clients that want to maintain greater privacy should recalculate the bloom filter themselves and send a new `filterload` message with the recalculated bloom filter.

| Bytes    | Name          | Data Type        | Description
|----------|---------------|------------------|-----------------
| *Varies* | element bytes | compactSize uint | The number of bytes in the following element field.
| *Varies* | element       | uint8_t[]        | The element to add to the current filter.  Maximum of 520 bytes, which is the maximum size of an element which can be pushed onto the stack in a pubkey or signature script.  Elements must be sent in the byte order they would use when appearing in a raw transaction; for example, hashes should be sent in internal byte order.

Note: a `filteradd` message will not be accepted unless a filter was previously set with the `filterload` message.

## FilterClear
The `filterclear` message tells the receiving peer to remove a previously-set bloom filter. This also undoes the effect of setting the relay field in the `version` message to 0, allowing unfiltered access to `inv` messages announcing new transactions.

The system does not require a `filterclear` message before a replacement filter is loaded with `filterload`. It also doesn't require
a `filterload` message before a `filterclear` message. There is no payload in a `filterclear` message.  

## FilterLoad
The `filterload` message tells the receiving peer to filter all relayed transactions and requested merkle blocks through the provided filter. This allows clients to receive transactions relevant to their wallet plus a configurable rate of false positive transactions which can provide plausible-deniability privacy.

| Bytes    | Name         | Data Type | Description
|----------|--------------|-----------|---------------
| *Varies* | nFilterBytes | compactSize uint | Number of bytes in the following filter bit field.
| *Varies* | filter       | uint8_t[] | A bit field of arbitrary byte-aligned size. The maximum size is 36,000 bytes.
| 4        | nHashFuncs   | uint32_t  | The number of hash functions to use in this filter. The maximum value allowed in this field is 50.
| 4        | nTweak       | uint32_t  | An arbitrary value to add to the seed value in the hash function used by the bloom filter.
| 1        | nFlags       | uint8_t   | A set of flags that control how outpoints corresponding to a matched pubkey script are added to the filter. 

## GetAddr
The `getaddr` message requests an `addr` message from the receiving node, preferably one with lots of IP addresses of other receiving nodes. The transmitting node can use those IP addresses to quickly update its database of available nodes rather than waiting for unsolicited `addr` messages to arrive over time.

There is no payload in a `getaddr` message. 

## Ping
The `ping` message helps confirm that the receiving peer is still connected. If a TCP/IP error is encountered when sending the `ping` message (such as a connection timeout), the transmitting node can assume that the receiving node is disconnected. The response to a `ping` message is the `pong` message.

The `ping` message includes a single field, the nonce.

| Bytes | Name  | Data Type | Description
|-------|-------|-----------|---------------
| 8     | nonce | uint64_t  | *Added in protocol version 60001 as described by BIP31.* <br><br>Random nonce assigned to this `ping` message.  The responding `pong` message will include this nonce to identify the `ping` message to which it is replying.

## Pong
The `pong` message replies to a `ping` message, proving to the pinging node that the ponging node is still alive. The system will, by default, disconnect from any clients which have not responded to a `ping` message within 20 minutes.

To allow nodes to keep track of latency, the `pong` message sends back the same nonce received in the `ping` message it is replying to.

The format of the `pong` message is identical to the `ping` message except the message header differs.

## Reject
The `reject` message informs the receiving node that one of its previous messages has been rejected.

| Bytes    | Name          | Data Type        | Description
|----------|---------------|------------------|--------------
| *Varies* | message bytes | compactSize uint | The number of bytes in the following message field.
| *Varies* | message       | string           | The type of message rejected as ASCII text *without null padding*.  For example: "tx", "block", or "version".
| 1        | code          | char             | The reject message code.  See the table below.
| *Varies* | reason bytes  | compactSize uint | The number of bytes in the following reason field.  May be 0x00 if a text reason isn't provided.
| *Varies* | reason        | string           | The reason for the rejection in ASCII text.  This should not be displayed to the user; it is only for debugging purposes.
| *Varies* | extra data    | *varies*         | Optional additional data provided with the rejection.  For example, most rejections of `tx` messages or `block` messages include the hash of the rejected transaction or block header.  See the code table below.

The following table lists message reject codes.  Codes are tied to the type of message they reply to; for example there is a 0x10 reject code for transactions and a 0x10 reject code for blocks.

| Code | In Reply To       | Extra Bytes | Extra Type | Description
|------|-------------------|-------------|------------|----------------
| 0x01 | *any message*     | 0           | N/A        | Message could not be decoded.  Be careful of `reject` message feedback loops where two peers each don't understand each other's `reject` messages and so keep sending them back and forth forever.
| 0x10 | `block` message   | 32          | char[32]   | Block is invalid for some reason (invalid proof-of-work, invalid signature, etc).  Extra data may include the rejected block's header hash.
| 0x10 | `tx` message      | 32          | char[32]   | Transaction is invalid for some reason (invalid signature, output value greater than input, etc.).  Extra data may include the rejected transaction's TXID.
| 0x11 | `block` message   | 32          | char[32]   | The block uses a version that is no longer supported.  Extra data may include the rejected block's header hash.
| 0x11 | `version` message | 0           | N/A        | Connecting node is using a protocol version that the rejecting node considers obsolete and unsupported.
| 0x12 | `tx` message      | 32          | char[32]   | Duplicate input spend (double spend): the rejected transaction spends the same input as a previously-received transaction.  Extra data may include the rejected transaction's TXID.
| 0x12 | `version` message | 0           | N/A        | More than one `version` message received in this connection.
| 0x40 | `tx` message      | 32          | char[32]   | The transaction will not be mined or relayed because the rejecting node considers it non-standard---a transaction type or version unknown by the server.  Extra data may include the rejected transaction's TXID.
| 0x41 | `tx` message      | 32          | char[32]   | One or more output amounts are below the dust threshold.  Extra data may include the rejected transaction's TXID.
| 0x42 | `tx` message      |             | char[32]   | The transaction did not have a large enough fee or priority to be relayed or mined.  Extra data may include the rejected transaction's TXID.
| 0x43 | `block` message   | 32          | char[32]   | The block belongs to a block chain which is not the same block chain as provided by a compiled-in checkpoint.  Extra data may include the rejected block's header hash.

## SendHeaders
The `sendheaders` message tells the receiving peer to send new block announcements using a `headers` message rather than an `inv` message.

There is no payload in a `sendheaders` message.  See the message header section for an example of a message without a payload.

## VerAck
The `verack` message acknowledges a previously-received `version` message, informing the connecting node that it can begin to send other messages. The `verack` message has no payload.

## Version
The `version` message provides information about the transmitting node to the receiving node at the beginning of a connection. Until both peers have exchanged `version` messages, no other messages will be accepted.

If a `version` message is accepted, the receiving node should send a `verack` message---but no node should send a `verack` message before initializing its half of the connection by first sending a `version` message.

| Bytes    | Name                  | Data Type        | Required/Optional                        | Description
|----------|-----------------------|------------------|------------------------------------------|-------------
| 4        | version               | int32_t          | Required                                 | The highest protocol version understood by the transmitting node.
| 8        | services              | uint64_t         | Required                                 | The services supported by the transmitting node encoded as a bitfield. The value `0x01` name `NODE_NETWORK` indicates it is a full node and can be asked for full blocks. It should implement all protocol features available in its self-reported protocol version. Otherwise the unnamed value `0x00` is used for a node that can only provide data for TXs it initiates. 
| 8        | timestamp             | int64_t          | Required                                 | The current Unix epoch time according to the transmitting node's clock.  Because nodes will reject blocks with timestamps more than two hours in the future, this field can help other nodes to determine that their clock is wrong.
| 8        | addr_recv services    | uint64_t         | Required                                 | The services supported by the receiving node as perceived by the transmitting node.  Same format as the 'services' field above. The system will attempt to provide accurate information.
| 16       | addr_recv IP address  | char             | Required                                 | The IPv6 address of the receiving node as perceived by the transmitting node in **big endian byte order**. IPv4 addresses can be provided as IPv4-mapped IPv6 addresses.
| 2        | addr_recv port        | uint16_t         | Required                                 | The port number of the receiving node as perceived by the transmitting node in **big endian byte order**.
| 8        | addr_trans services   | uint64_t         | Required                                 | The services supported by the transmitting node.  Should be identical to the 'services' field above.
| 16       | addr_trans IP address | char             | Required                                 | The IPv6 address of the transmitting node in **big endian byte order**. IPv4 addresses can be provided as IPv4-mapped IPv6 addresses.  Set to ::ffff:127.0.0.1 if unknown.
| 2        | addr_trans port       | uint16_t         | Required                                 | The port number of the transmitting node in **big endian byte order**.
| 8        | nonce                 | uint64_t         | Required                                 | A random nonce which can help a node detect a connection to itself.  If the nonce is 0, the nonce field is ignored.  If the nonce is anything else, a node should terminate the connection on receipt<!--noref--> of a `version` message with a nonce it previously sent.
| *Varies* | user_agent bytes      | compactSize uint | Required                                 | Number of bytes in following user\_agent field.  If 0x00, no user agent field is sent.
| *Varies* | user_agent            | string           | Required if user_agent bytes > 0         | User agent as defined by BIP14. Previously called subVer.
| 4        | start_height          | int32_t          | Required                                 | The height of the transmitting node's best block chain or, in the case of an SPV client, best block header chain.
| 1        | relay                 | bool             | Optional                                 | Transaction relay flag.  If 0x00, no `inv` messages or `tx` messages announcing new transactions should be sent to this client until it sends a `filterload` message or `filterclear` message.  If the relay field is not present or is set to 0x01, this node wants `inv` messages and `tx` messages announcing new transactions.