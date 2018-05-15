---
layout: specification
title: BCH JSON RPC Specification
date: 2018-05-15
activation: 1501590000
version: 0.2
---

## Summary

Documenting the BCH JSON RPC HTTP verbs, methods and arguments

## Blockchain

### getbestblockhash

#### HTTP Verb

`POST`

#### Arguments

 * None

#### Result

* hex (`String`): the block hash hex encoded

### getblock

#### HTTP Verb

`POST`

#### Arguments

1. blockhash (`String`, required): The block hash
2. verbose (`Boolean`, optional, default=true): `true` for a json object, `false` for the hex encoded data

#### Result

* Result (for verbose = `true`): object

```js
{
  "hash" : "hash",     (`String`) the block hash (same as provided)
  "confirmations" : n,   (`Numeric`) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (`Numeric`) The block size
  "height" : n,          (`Numeric`) The block height or index
  "version" : n,         (`Numeric`) The block version
  "versionHex" : "00000000", (`String`) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (`String`) The merkle root
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (`String`) The transaction id
     ,...
  ],
  "time" : ttt,          (`Numeric`) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (`Numeric`) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (`Numeric`) The nonce
  "bits" : "1d00ffff", (`String`) The bits
  "difficulty" : x.xxx,  (`Numeric`) The difficulty
  "chainwork" : "xxxx",  (`String`) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (`String`) The hash of the previous block
  "nextblockhash" : "hash"       (`String`) The hash of the next block
}
```

* Result (for verbose = `false`):

data (`String`) A string that is serialized, hex-encoded data for block 'hash'.

### getblockchaininfo

#### HTTP Verb

`POST`

#### Arguments

 * None

#### Result

```js
{
  "chain": "xxxx",        (`String`) current network name as defined in BIP70 (main, test, regtest)
  "blocks": xxxxxx,         (`Numeric`) the current number of blocks processed in the server
  "headers": xxxxxx,        (`Numeric`) the current number of headers we have validated
  "bestblockhash": "...", (`String`) the hash of the currently best block
  "difficulty": xxxxxx,     (`Numeric`) the current difficulty
  "mediantime": xxxxxx,     (`Numeric`) median time for the current best block
  "verificationprogress": xxxx, (`Numeric`) estimate of verification progress [0..1]
  "chainwork": "xxxx"     (`String`) total amount of work in active chain, in hexadecimal
  "pruned": xx,             (`Boolean`) if the blocks are subject to pruning
  "pruneheight": xxxxxx,    (`Numeric`) lowest-height complete block stored
  "softforks": [            (array) status of softforks in progress
     {
        "id": "xxxx",        (`String`) name of softfork
        "version": xx,         (`Numeric`) block version
        "reject": {            (object) progress toward rejecting pre-softfork blocks
           "status": xx,       (`Boolean`) true if threshold reached
        },
     }, ...
  ],
  "bip9_softforks": {          (object) status of BIP9 softforks in progress
     "xxxx" : {                (`String`) name of the softfork
        "status": "xxxx",    (`String`) one of "defined", "started", "locked_in", "active", "failed"
        "bit": xx,             (`Numeric`) the bit (0-28) in the block version field used to signal this softfork (only for "started" status)
        "startTime": xx,       (`Numeric`) the minimum median time past of a block at which the bit gains its meaning
        "timeout": xx,         (`Numeric`) the median time past of a block at which the deployment is considered failed if not yet locked in
        "since": xx            (`Numeric`) height of the first block to which the status applies
     }
  }
}
```

### getblockcount

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

* n (`Numeric`): The current block count

### getblockhash

#### HTTP Verb

`POST`

#### Arguments

1. height (`Numeric`, required): The height index

#### Result

hash (`String`): The block hash

### getblockheader

#### HTTP Verb

`POST`

#### Arguments

1. hash (`String`, required): The block hash
2. verbose (`Boolean`, optional, default=true): true for a json object, false for the hex encoded data

#### Result

```js
{
  "hash" : "hash",     (`String`) the block hash (same as provided)
  "confirmations" : n,   (`Numeric`) The number of confirmations, or -1 if the block is not on the main chain
  "height" : n,          (`Numeric`) The block height or index
  "version" : n,         (`Numeric`) The block version
  "versionHex" : "00000000", (`String`) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (`String`) The merkle root
  "time" : ttt,          (`Numeric`) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (`Numeric`) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (`Numeric`) The nonce
  "bits" : "1d00ffff", (`String`) The bits
  "difficulty" : x.xxx,  (`Numeric`) The difficulty
  "chainwork" : "0000...1f3"     (`String`) Expected number of hashes required to produce the current chain (in hex)
  "previousblockhash" : "hash",  (`String`) The hash of the previous block
  "nextblockhash" : "hash",      (`String`) The hash of the next block
}
```

### getchaintips

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

```js
[
  {
    "height": xxxx,         (`Numeric`) height of the chain tip
    "hash": "xxxx",         (`String`) block hash of the tip
    "branchlen": 0          (`Numeric`) zero for main chain
    "status": "active"      (`String`) "active" for the main chain
  },
  {
    "height": xxxx,
    "hash": "xxxx",
    "branchlen": 1          (`Numeric`) length of branch connecting the tip to the main chain
    "status": "xxxx"        (`String`) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
  }
]
```

### getchaintxstats

#### HTTP Verb

`POST`

#### Arguments

1. nblocks (`Numeric`, optional): Size of the window in number of blocks (default: one month).
2. blockhash (`String`, optional): The hash of the block that ends the window.

#### Result

```js
{
  "time": xxxxx,                (`Numeric`) The timestamp for the final block in the window in UNIX format.
  "txcount": xxxxx,             (`Numeric`) The total number of transactions in the chain up to that point.
  "window_block_count": xxxxx,  (`Numeric`) Size of the window in number of blocks.
  "window_tx_count": xxxxx,     (`Numeric`) The number of transactions in the window. Only returned if "window_block_count" is > 0.
  "window_interval": xxxxx,     (`Numeric`) The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0.
  "txrate": x.xx,               (`Numeric`) The average rate of transactions per second in the window. Only returned if "window_interval" is > 0.
}
```

### getdifficulty

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

* n.nnn (`Numeric`): the proof-of-work difficulty as a multiple of the minimum difficulty.

### getmempoolancestors

#### HTTP Verb

`POST`

#### Arguments

1. txid (`String`, required): The transaction id (must be in mempool)
2. verbose (`Boolean`, optional, default=`false`): True for a json object, false for array of transaction ids

#### Result

Result (for verbose=`false`):
```js
[                       (json array of strings)
  "transactionid"           (`String`) The transaction id of an in-mempool ancestor transaction
  ,...
]
```

Result (for verbose=`true`):
```js
{                           (json `Object`)
  "transactionid" : {       (json `Object`)
    "size" : n,             (`Numeric`) transaction size.
    "fee" : n,              (`Numeric`) transaction fee in BCH
    "modifiedfee" : n,      (`Numeric`) transaction fee with fee deltas used for mining priority
    "time" : n,             (`Numeric`) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (`Numeric`) block height when transaction entered pool
    "startingpriority" : n, (`Numeric`) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (`Numeric`) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (`Numeric`) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (`Numeric`) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (`Numeric`) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (`Numeric`) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (`Numeric`) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (`Numeric`) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (`String`) parent transaction id
       ... ]
  }, ...
}
```

### getmempooldescendants

#### HTTP Verb

`POST`

#### Arguments

1. "txid"                 (`String`, required): The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

#### Result

Result (for verbose=false):
```js
[                       (json array of strings)
  "transactionid"           (`String`) The transaction id of an in-mempool descendant transaction
  ,...
]
```

Result (for verbose=`true`):
```js
{                           (json `Object`)
  "transactionid" : {       (json `Object`)
    "size" : n,             (`Numeric`) transaction size.
    "fee" : n,              (`Numeric`) transaction fee in BCH
    "modifiedfee" : n,      (`Numeric`) transaction fee with fee deltas used for mining priority
    "time" : n,             (`Numeric`) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (`Numeric`) block height when transaction entered pool
    "startingpriority" : n, (`Numeric`) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (`Numeric`) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (`Numeric`) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (`Numeric`) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (`Numeric`) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (`Numeric`) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (`Numeric`) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (`Numeric`) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (`String`) parent transaction id
       ... ]
  }, ...
}
```

### getmempoolentry txid

#### HTTP Verb

`POST`

#### Arguments

1. "txid"                   (`String`, required): The transaction id (must be in mempool)

#### Result

```js
Result:
{                           (json `Object`)
    "size" : n,             (`Numeric`) transaction size.
    "fee" : n,              (`Numeric`) transaction fee in BCH
    "modifiedfee" : n,      (`Numeric`) transaction fee with fee deltas used for mining priority
    "time" : n,             (`Numeric`) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (`Numeric`) block height when transaction entered pool
    "startingpriority" : n, (`Numeric`) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (`Numeric`) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (`Numeric`) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (`Numeric`) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (`Numeric`) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (`Numeric`) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (`Numeric`) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (`Numeric`) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (`String`) parent transaction id
       ... ]
}
```

### getmempoolinfo

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

```js
{
  "size": xxxxx,               (`Numeric`) Current tx count
  "bytes": xxxxx,              (`Numeric`) Transaction size.
  "usage": xxxxx,              (`Numeric`) Total memory usage for the mempool
  "maxmempool": xxxxx,         (`Numeric`) Maximum memory usage for the mempool
  "mempoolminfee": xxxxx       (`Numeric`) Minimum fee for tx to be accepted
}
```

### getrawmempool ( verbose )

#### HTTP Verb

`POST`

#### Arguments

1. verbose (boolean, optional, default=false) True for a json object, false for array of transaction ids

#### Result

Result: (for verbose = false):
```js
[                     (json `Array` of `String`)
  "transactionid"     (`String`) The transaction id
  ,...
]
```

Result: (for verbose = true):
```js
{                           (json `Object`)
  "transactionid" : {       (json `Object`)
    "size" : n,             (`Numeric`) transaction size.
    "fee" : n,              (`Numeric`) transaction fee in BCH
    "modifiedfee" : n,      (`Numeric`) transaction fee with fee deltas used for mining priority
    "time" : n,             (`Numeric`) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (`Numeric`) block height when transaction entered pool
    "startingpriority" : n, (`Numeric`) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (`Numeric`) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (`Numeric`) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (`Numeric`) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (`Numeric`) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (`Numeric`) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (`Numeric`) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (`Numeric`) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (`String`) parent transaction id
       ... ]
  }, ...
}
```

### gettxout

#### HTTP Verb

`POST`

#### Arguments

1. "txid"             (`String`, required): The transaction id
2. "n"                (`Numeric`, required) vout number
3. "include_mempool"  (boolean, optional) Whether to include the mempool. Default: true.     Note that an unspent output that is spent in the mempool won't appear.

#### Result

```js
{
  "bestblock" : "hash",    (`String`) the block hash
  "confirmations" : n,       (`Numeric`) The number of confirmations
  "value" : x.xxx,           (`Numeric`) The transaction value in BCH
  "scriptPubKey" : {         (json `Object`)
     "asm" : "code",       (`String`)
     "hex" : "hex",        (`String`)
     "reqSigs" : n,          (`Numeric`) Number of required signatures
     "type" : "pubkeyhash", (`String`) The type, eg pubkeyhash
     "addresses" : [          (array of string) array of bitcoin addresses
        "address"     (`String`) bitcoin address
        ,...
     ]
  },
  "coinbase" : true|false   (`Boolean`) Coinbase or not
}
```

### gettxoutproof

#### HTTP Verb

`POST`

#### Arguments

1. "txids"       (`String`) A json array of txids to filter
    [
      "txid"     (`String`) A transaction hash
      ,...
    ]
2. "blockhash"   (`String`, optional) If specified, looks for txid in the block with this hash

#### Result

"data"           (`String`) A string that is a serialized, hex-encoded data for the proof.

### gettxoutsetinfo

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

```js
{
  "height":n,     (`Numeric`) The current block height (index)
  "bestblock": "hex",   (`String`) the best block hash hex
  "transactions": n,      (`Numeric`) The number of transactions
  "txouts": n,            (`Numeric`) The number of output transactions
  "bogosize": n,          (`Numeric`) A database-independent metric for UTXO set size
  "hash_serialized": "hash",   (`String`) The serialized hash
  "disk_size": n,         (`Numeric`) The estimated size of the chainstate on disk
  "total_amount": x.xxx          (`Numeric`) The total amount
}
```

### preciousblock

#### HTTP Verb

`POST`

#### Arguments

1. "blockhash"   (`String`, required): the hash of the block to mark as precious

#### Result

* none

### pruneblockchain

#### HTTP Verb

`POST`

#### Arguments

1. "height"       (`Numeric`, required) The block height to prune up to. May be set to a discrete height, or a unix timestamp
                  to prune blocks whose block time is at least 2 hours older than the provided timestamp.
#### Result

n    (`Numeric`) Height of the last block pruned.

### verifychain

#### HTTP Verb

`POST`
#### Arguments

1. checklevel   (numeric, optional, 0-4, default=3) How thorough the block verification is.
2. nblocks      (numeric, optional, default=6, 0=all) The number of blocks to check.

#### Result

true|false       (`Boolean`) Verified or not

### verifytxoutproof "proof"

## Control

### getinfo

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

```js
{
  "version": xxxxx,           (`Numeric`) the server version
  "protocolversion": xxxxx,   (`Numeric`) the protocol version
  "walletversion": xxxxx,     (`Numeric`) the wallet version
  "balance": xxxxxxx,         (`Numeric`) the total bitcoin balance of the wallet
  "blocks": xxxxxx,           (`Numeric`) the current number of blocks processed in the server
  "timeoffset": xxxxx,        (`Numeric`) the time offset
  "connections": xxxxx,       (`Numeric`) the number of connections
  "proxy": "host:port",     (`String`, optional) the proxy used by the server
  "difficulty": xxxxxx,       (`Numeric`) the current difficulty
  "testnet": true|false,      (`Boolean`) if the server is using testnet or not
  "keypoololdest": xxxxxx,    (`Numeric`) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (`Numeric`) how many new keys are pre-generated
  "unlocked_until": ttt,      (`Numeric`) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,         (`Numeric`) the transaction fee set in BCH/kB
  "relayfee": x.xxxx,         (`Numeric`) minimum relay fee for non-free transactions in BCH/kB
  "errors": "..."           (`String`) any error messages
}
```

### getmemoryinfo

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

```js
{
  "locked": {               (json `Object`) Information about locked memory manager
    "used": xxxxx,          (`Numeric`) Number of bytes used
    "free": xxxxx,          (`Numeric`) Number of bytes available in current arenas
    "total": xxxxxxx,       (`Numeric`) Total number of bytes managed
    "locked": xxxxxx,       (`Numeric`) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    "chunks_used": xxxxx,   (`Numeric`) Number allocated chunks
    "chunks_free": xxxxx,   (`Numeric`) Number unused chunks
  }
}
```

### help

#### HTTP Verb

`POST`
#### Arguments

1. "command"     (`String`, optional) The command to get help on

#### Result

"text"     (`String`) The help text

### stop

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* None

### uptime

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

ttt        (`Numeric`) The number of seconds that the server has been running

## Generating

### generatetoaddress

#### HTTP Verb

`POST`
#### Arguments

1. nblocks      (`Numeric`, required) How many blocks are generated immediately.
2. address      (`String`, required): The address to send the newly generated bitcoin to.
3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).
4.
#### Result

[ blockhashes ]     (array) hashes of blocks generated

## Mining

### getblocktemplate

#### HTTP Verb

`POST`
#### Arguments

1. template_request         (json object, optional) A json object in the following spec
```js
     {
       "mode":"template"    (`String`, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
       "capabilities":[     (array, optional) A list of strings
           "support"          (`String`) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
           ,...
       ],
       "rules":[            (array, optional) A list of strings
           "support"          (`String`) client side supported softfork deployment
           ,...
       ]
     }
```

#### Result

```js
{
  "version" : n,                    (`Numeric`) The preferred block version
  "rules" : [ "rulename", ... ],    (array of strings) specific block rules that are to be enforced
  "vbavailable" : {                 (json `Object`) set of pending, supported versionbit (BIP 9) softfork deployments
      "rulename" : bitnumber          (`Numeric`) identifies the bit number as indicating acceptance and readiness for the named softfork rule
      ,...
  },
  "vbrequired" : n,                 (`Numeric`) bit mask of versionbits the server requires set in submissions
  "previousblockhash" : "xxxx",     (`String`) The hash of current highest block
  "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
      {
         "data" : "xxxx",             (`String`) transaction data encoded in hexadecimal (byte-for-byte)
         "txid" : "xxxx",             (`String`) transaction id encoded in little-endian hexadecimal
         "hash" : "xxxx",             (`String`) hash encoded in little-endian hexadecimal (including witness data)
         "depends" : [                (array) array of numbers
             n                          (`Numeric`) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
             ,...
         ],
         "fee": n,                    (`Numeric`) difference in value between transaction inputs and outputs (in Satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
         "sigops" : n,                (`Numeric`) total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
         "required" : true|false      (`Boolean`) if provided and true, this transaction must be in the final block
      }
      ,...
  ],
  "coinbaseaux" : {                 (json `Object`) data that should be included in the coinbase's scriptSig content
      "flags" : "xx"                  (`String`) key name is to be ignored, and value included in scriptSig
  },
  "coinbasevalue" : n,              (`Numeric`) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in Satoshis)
  "coinbasetxn" : { ... },          (json `Object`) information for coinbase transaction
  "target" : "xxxx",                (`String`) The hash target
  "mintime" : xxx,                  (`Numeric`) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  "mutable" : [                     (array of string) list of ways the block template may be changed
     "value"                          (`String`) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
     ,...
  ],
  "noncerange" : "00000000ffffffff",(`String`) A range of valid nonces
  "sigoplimit" : n,                 (`Numeric`) limit of sigops in blocks
  "sizelimit" : n,                  (`Numeric`) limit of block size
  "curtime" : ttt,                  (`Numeric`) current timestamp in seconds since epoch (Jan 1 1970 GMT)
  "bits" : "xxxxxxxx",              (`String`) compressed target of next block
  "height" : n                      (`Numeric`) The height of the next block
}
```

### getmininginfo

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

```js
{
  "blocks": nnn,             (`Numeric`) The current block
  "currentblocksize": nnn,   (`Numeric`) The last block size
  "currentblocktx": nnn,     (`Numeric`) The last block transaction
  "difficulty": xxx.xxxxx    (`Numeric`) The current difficulty
  "errors": "..."            (`String`) Current errors
  "networkhashps": nnn,      (`Numeric`) The network hashes per second
  "pooledtx": n              (`Numeric`) The size of the mempool
  "chain": "xxxx",           (`String`) current network name as defined in BIP70 (main, test, regtest)
}
```

### getnetworkhashps

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
2. height      (numeric, optional, default=-1) To estimate at the time of the given height.

#### Result

x             (`Numeric`) Hashes per second estimated

### prioritisetransaction

#### HTTP Verb

`POST`

#### Arguments

1. "txid"       (`String`, required): The transaction id.
2. priority_delta (`Numeric`, required) The priority to add or subtract.
                  The transaction selection algorithm considers the tx as it would have a higher priority.
                  (priority of a transaction is calculated: coinage * value_in_satoshis / txsize)
3. fee_delta      (`Numeric`, required) The fee value (in satoshis) to add (or subtract, if negative).
                  The fee is not actually paid, only the algorithm for selecting transactions into a block
                  considers the transaction as it would have paid a higher (or lower) fee.

#### Result

true              (`Boolean`) Returns true

### submitblock

#### HTTP Verb

`POST`

#### Arguments

1. "hexdata"        (`String`, required): the hex-encoded block data to submit
2. "parameters"     (`String`, optional) object of optional parameters
    {
      "workid" : "id"    (`String`, optional) if the server provided a workid, it MUST be included with submissions
    }

#### Result

* None

## Network

### addnode

#### HTTP Verb

`POST`

#### Arguments

1. "node"     (`String`, required): The node (see getpeerinfo for nodes)
2. "command"  (`String`, required): 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

#### Result

* None

### clearbanned

#### HTTP Verb

`POST`

#### Arguments

#### Result

### disconnectnode "[address]" [nodeid]

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* None

### getaddednodeinfo

#### HTTP Verb

`POST`

#### Arguments

1. "node"   (`String`, optional) If provided, return information about this specific node, otherwise all nodes are returned.

#### Result

```js
[
  {
    "addednode" : "192.168.0.201",   (`String`) The node ip address or name (as provided to addnode)
    "connected" : true|false,          (`Boolean`) If connected
    "addresses" : [                    (list of objects) Only when connected = true
       {
         "address" : "192.168.0.201:8333",  (`String`) The bitcoin server IP and port were connected to
         "connected" : "outbound"           (`String`) connection, inbound or outbound
       }
     ]
  }
  ,...
]
```

### getconnectioncount

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

n          (`Numeric`) The connection count

### getexcessiveblock

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* excessiveBlockSize (`Integer`) block size in bytes

### getnettotals

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

```js
{
  "totalbytesrecv": n,   (`Numeric`) Total bytes received
  "totalbytessent": n,   (`Numeric`) Total bytes sent
  "timemillis": t,       (`Numeric`) Current UNIX time in milliseconds
  "uploadtarget":
  {
    "timeframe": n,                         (`Numeric`) Length of the measuring timeframe in seconds
    "target": n,                            (`Numeric`) Target in bytes
    "target_reached": true|false,           (`Boolean`) True if target is reached
    "serve_historical_blocks": true|false,  (`Boolean`) True if serving historical blocks
    "bytes_left_in_cycle": t,               (`Numeric`) Bytes left in current time cycle
    "time_left_in_cycle": t                 (`Numeric`) Seconds left in current time cycle
  }
}
```

### getnetworkinfo

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

```js
{
  "version": xxxxx,                      (`Numeric`) the server version
  "subversion": "/Satoshi:x.x.x/",     (`String`) the server subversion string
  "protocolversion": xxxxx,              (`Numeric`) the protocol version
  "localservices": "xxxxxxxxxxxxxxxx", (`String`) the services we offer to the network
  "localrelay": true|false,              (bool) true if transaction relay is requested from peers
  "timeoffset": xxxxx,                   (`Numeric`) the time offset
  "connections": xxxxx,                  (`Numeric`) the number of connections
  "networkactive": true|false,           (bool) whether p2p networking is enabled
  "networks": [                          (array) information per network
  {
    "name": "xxx",                     (`String`) network (ipv4, ipv6 or onion)
    "limited": true|false,               (`Boolean`) is the network limited using -onlynet?
    "reachable": true|false,             (`Boolean`) is the network reachable?
    "proxy": "host:port"               (`String`) the proxy that is used for this network, or empty if none
    "proxy_randomize_credentials": true|false,  (`String`) Whether randomized credentials are used
  }
  ,...
  ],
  "relayfee": x.xxxxxxxx,                (`Numeric`) minimum relay fee for non-free transactions in BCH/kB
  "excessutxocharge": x.xxxxxxxx,        (`Numeric`) minimum charge for excess utxos in BCH
  "incrementalfee": x.xxxxxxxx,          (`Numeric`) minimum fee increment for mempool limiting or BIP 125 replacement in BCH/kB
  "localaddresses": [                    (array) list of local addresses
  {
    "address": "xxxx",                 (`String`) network address
    "port": xxx,                         (`Numeric`) network port
    "score": xxx                         (`Numeric`) relative score
  }
  ,...
  ]
  "warnings": "..."                    (`String`) any network warnings
}
```

### getpeerinfo

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

```js
[
  {
    "id": n,                   (`Numeric`) Peer index
    "addr":"host:port",      (`String`) The ip address and port of the peer
    "addrlocal":"ip:port",   (`String`) local address
    "services":"xxxxxxxxxxxxxxxx",   (`String`) The services offered
    "relaytxes":true|false,    (`Boolean`) Whether peer has asked us to relay transactions to it
    "lastsend": ttt,           (`Numeric`) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    "lastrecv": ttt,           (`Numeric`) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    "bytessent": n,            (`Numeric`) The total bytes sent
    "bytesrecv": n,            (`Numeric`) The total bytes received
    "conntime": ttt,           (`Numeric`) The connection time in seconds since epoch (Jan 1 1970 GMT)
    "timeoffset": ttt,         (`Numeric`) The time offset in seconds
    "pingtime": n,             (`Numeric`) ping time (if available)
    "minping": n,              (`Numeric`) minimum observed ping time (if any at all)
    "pingwait": n,             (`Numeric`) ping wait (if non-zero)
    "version": v,              (`Numeric`) The peer version, such as 7001
    "subver": "/Satoshi:0.8.5/",  (`String`) The string version
    "inbound": true|false,     (`Boolean`) Inbound (true) or Outbound (false)
    "addnode": true|false,     (`Boolean`) Whether connection was due to addnode and is using an addnode slot
    "startingheight": n,       (`Numeric`) The starting height (block) of the peer
    "banscore": n,             (`Numeric`) The ban score
    "synced_headers": n,       (`Numeric`) The last header we have in common with this peer
    "synced_blocks": n,        (`Numeric`) The last block we have in common with this peer
    "inflight": [
       n,                        (`Numeric`) The heights of blocks were currently asking from this peer
       ...
    ],
    "whitelisted": true|false, (`Boolean`) Whether the peer is whitelisted
    "bytessent_per_msg": {
       "addr": n,              (`Numeric`) The total bytes sent aggregated by message type
       ...
    },
    "bytesrecv_per_msg": {
       "addr": n,              (`Numeric`) The total bytes received aggregated by message type
       ...
    }
  }
  ,...
]
```

### listbanned

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* None

### ping

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* None

### setban

#### HTTP Verb

`POST`

#### Arguments

1. subnet (`String`, required): The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
2. command (`String`, required): 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
3. bantime (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
4. absolute (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)

#### Result

* None

### setexcessiveblock

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

* blockSize (`Integer`) excessive block size in bytes

### setnetworkactive

#### HTTP Verb

`POST`

#### Arguments

1. state (`Boolean`, required) true to enable networking, false to disable

#### Result

* None

## Rawtransactions

### createrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. inputs (`Array`, required) A json array of json objects
     [
       {
         "txid":"id",    (`String`, required): The transaction id
         "vout":n,         (`Numeric`, required) The output number
         "sequence":n      (numeric, optional) The sequence number
       }
       ,...
     ]
2. outputs  (`Object`, required) a json object with outputs
    {
      "address": x.xxx,    (`Numeric` or `String`, required) The key is the bitcoin address, the numeric value (can be string) is the BCH amount
      "data": "hex"      (`String`, required): The key is "data", the value is hex encoded data
      ,...
    }
3. locktime (`Numeric`, optional, default=`0`) Raw locktime. Non-0 value also locktime-activates inputs

#### Result

transaction (`String`) hex string of the transaction

### decoderawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. hexstring (`String`, required): The transaction hex string

#### Result

```js
{
  "txid" : "id",        (`String`) The transaction id
  "hash" : "id",        (`String`) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (`Numeric`) The transaction size
  "version" : n,          (`Numeric`) The version
  "locktime" : ttt,       (`Numeric`) The lock time
  "vin" : [               (`Array` of json objects)
     {
       "txid": "id",    (`String`) The transaction id
       "vout": n,         (`Numeric`) The output number
       "scriptSig": {     (json `Object`) The script
         "asm": "asm",  (`String`) asm
         "hex": "hex"   (`String`) hex
       },
       "sequence": n     (`Numeric`) The script sequence number
     }
     ,...
  ],
  "vout" : [             (`Array` of json objects)
     {
       "value" : x.xxx,            (`Numeric`) The value in BCH
       "n" : n,                    (`Numeric`) index
       "scriptPubKey" : {          (json `Object`)
         "asm" : "asm",          (`String`) the asm
         "hex" : "hex",          (`String`) the hex
         "reqSigs" : n,            (`Numeric`) The required sigs
         "type" : "pubkeyhash",  (`String`) The type, eg 'pubkeyhash'
         "addresses" : [           (json `Array` of `String`)
           "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (`String`) bitcoin address
           ,...
         ]
       }
     }
     ,...
  ],
}
```

### decodescript

#### HTTP Verb

`POST`

#### Arguments

1. hexstring (`String`) the hex encoded script

#### Result

```js
{
  "asm":"asm",   (`String`) Script public key
  "hex":"hex",   (`String`) hex encoded public key
  "type":"type", (`String`) The output type
  "reqSigs": n,    (`Numeric`) The required signatures
  "addresses": [   (json `Array` of `String`)
     "address"     (`String`) bitcoin address
     ,...
  ],
  "p2sh","address" (`String`) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
}
```

### getrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. txid (`String`, required): The transaction id
2. verbose (`Boolean`, optional, default=`false`) If false, return a string, otherwise return a json object

#### Result

Result (if verbose is not set or set to false):

data (`String`) The serialized, hex-encoded data for 'txid'

Result (if verbose is set to true):
```js
{
  "hex" : "data",       (`String`) The serialized, hex-encoded data for 'txid'
  "txid" : "id",        (`String`) The transaction id (same as provided)
  "hash" : "id",        (`String`) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (`Numeric`) The serialized transaction size
  "version" : n,          (`Numeric`) The version
  "locktime" : ttt,       (`Numeric`) The lock time
  "vin" : [               (`Array` of json objects)
     {
       "txid": "id",    (`String`) The transaction id
       "vout": n,         (`Numeric`)
       "scriptSig": {     (json `Object`) The script
         "asm": "asm",  (`String`) asm
         "hex": "hex"   (`String`) hex
       },
       "sequence": n      (`Numeric`) The script sequence number
     }
     ,...
  ],
  "vout" : [              (`Array` of json objects)
     {
       "value" : x.xxx,            (`Numeric`) The value in BCH
       "n" : n,                    (`Numeric`) index
       "scriptPubKey" : {          (json `Object`)
         "asm" : "asm",          (`String`) the asm
         "hex" : "hex",          (`String`) the hex
         "reqSigs" : n,            (`Numeric`) The required sigs
         "type" : "pubkeyhash",  (`String`) The type, eg 'pubkeyhash'
         "addresses" : [           (json `Array` of `String`)
           "address"        (`String`) bitcoin address
           ,...
         ]
       }
     }
     ,...
  ],
  "blockhash" : "hash",   (`String`) the block hash
  "confirmations" : n,      (`Numeric`) The confirmations
  "time" : ttt,             (`Numeric`) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt         (`Numeric`) The block time in seconds since epoch (Jan 1 1970 GMT)
}
```

### sendrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. hexstring (`String`, required): The hex string of the raw transaction)
2. allowhighfees (`Boolean`, optional, default=`false`) Allow high fees

#### Result

hex (`String`) The transaction hash in hex

### signrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. hexstring (`String`, required): The transaction hex string
2. prevtxs (`String`, optional) An json array of previous dependent transaction outputs
     [               (json array of json objects, or 'null' if none provided)
       {
         "txid":"id",             (`String`, required): The transaction id
         "vout":n,                  (`Numeric`, required) The output number
         "scriptPubKey": "hex",   (`String`, required): script key
         "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
         "amount": value            (`Numeric`, required) The amount spent
       }
       ,...
    ]
3. privkeys (`String`, optional) A json array of base58-encoded private keys for signing
    [                  (json array of strings, or 'null' if none provided)
      "privatekey"   (`String`) private key in base58-encoding
      ,...
    ]
4. sighashtype (string, optional, default=ALL) The signature hash type. Must be one of
       "ALL"
       "NONE"
       "SINGLE"
       "ALL|ANYONECANPAY"
       "NONE|ANYONECANPAY"
       "SINGLE|ANYONECANPAY"
       "ALL|FORKID"
       "NONE|FORKID"
       "SINGLE|FORKID"
       "ALL|FORKID|ANYONECANPAY"
       "NONE|FORKID|ANYONECANPAY"
       "SINGLE|FORKID|ANYONECANPAY"

#### Result

```js
{
  "hex" : "value",           (`String`) The hex-encoded raw transaction with signature(s)
  "complete" : true|false,   (`Boolean`) If the transaction has a complete set of signatures
  "errors" : [                 (json array of objects) Script verification errors (if there are any)
    {
      "txid" : "hash",           (`String`) The hash of the referenced, previous transaction
      "vout" : n,                (`Numeric`) The index of the output to spent and used as input
      "scriptSig" : "hex",       (`String`) The hex-encoded signature script
      "sequence" : n,            (`Numeric`) Script sequence number
      "error" : "text"           (`String`) Verification or signing error related to the input
    }
    ,...
  ]
}
```

## Util

### createmultisig


#### HTTP Verb

`POST`

#### Arguments

1. nrequired (`Numeric`, required) The number of required signatures out of the n keys or addresses.
2. "keys"       (`String`, required): A json array of keys which are bitcoin addresses or hex-encoded public keys
     [
       "key"    (`String`) bitcoin address or hex-encoded public key
       ,...
     ]
#### Result

```js
{
  "address":"multisigaddress",  (`String`) The value of the new multisig address.
  "redeemScript":"script"       (`String`) The string value of the hex-encoded redemption script.
}
```

### estimatefee

#### HTTP Verb

`POST`

#### Arguments

1. nblocks (`Numeric`, required)

#### Result

n              (`Numeric`) estimated fee-per-kilobyte

### estimatepriority

#### HTTP Verb

`POST`

#### Arguments

1. nblocks (`Numeric`, required)

#### Result

n              (`Numeric`) estimated priority

### estimatesmartfee

#### HTTP Verb

`POST`

#### Arguments

1. nblocks (`Numeric`)

#### Result

```js
{
  "feerate" : x.x,     (`Numeric`) estimate fee-per-kilobyte (in BCH)
  "blocks" : n         (`Numeric`) block number where estimate was found
}
```

### estimatesmartpriority

#### HTTP Verb

`POST`

#### Arguments

1. nblocks (`Numeric`, required)

#### Result

```js
{
  "priority" : x.x,    (`Numeric`) estimated priority
  "blocks" : n         (`Numeric`) block number where estimate was found
}
```

### signmessagewithprivkey

#### HTTP Verb

`POST`

#### Arguments

1. privkey (`String`, required): The private key to sign the message with.
2. message (`String`, required): The message to create a signature of.

#### Result

signature (`String`) The signature of the message encoded in base 64

### validateaddress

#### HTTP Verb

`POST`

#### Arguments

1. address (`String`, required): The bitcoin address to validate

#### Result

```js
{
  "isvalid" : true|false,       (`Boolean`) If the address is valid or not. If not, this is the only property returned.
  "address" : "address", (`String`) The bitcoin address validated
  "scriptPubKey" : "hex",       (`String`) The hex encoded scriptPubKey generated by the address
  "ismine" : true|false,        (`Boolean`) If the address is yours or not
  "iswatchonly" : true|false,   (`Boolean`) If the address is watchonly
  "isscript" : true|false,      (`Boolean`) If the key is a script
  "pubkey" : "publickeyhex",    (`String`) The hex value of the raw public key
  "iscompressed" : true|false,  (`Boolean`) If the address is compressed
  "account" : "account"         (`String`) DEPRECATED. The account associated with the address, "" is the default account
  "timestamp" : timestamp,        (`Number`, optional) The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
  "hdkeypath" : "keypath"       (`String`, optional) The HD keypath if the key is HD and available
  "hdmasterkeyid" : "<hash160>" (`String`, optional) The Hash160 of the HD master pubkey
}
```

### verifymessage

#### HTTP Verb

`POST`

#### Arguments

1. address (`String`, required): The bitcoin address to use for the signature.
2. signature (`String`, required): The signature provided by the signer in base 64 encoding (see signmessage).
3. message (`String`, required): The message that was signed.

#### Result

`true`|`false` (`Boolean`) If the signature is verified or not.
