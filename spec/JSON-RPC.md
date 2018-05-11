# BCH JSON RPC

Version 0.1, 2018-05-10

## Summary

Documenting the BCH JSON RPC HTTP verbs, methods and arguments

## Blockchain

### getbestblockhash

#### HTTP Verb

`POST`

#### Arguments

 * None

#### Result

* "hex"      (string) the block hash hex encoded

### getblock

#### HTTP Verb

`POST`

#### Arguments

1. "blockhash"          (string, required) The block hash
2. verbose                (boolean, optional, default=true) true for a json object, false for the hex encoded data


#### Result

* Result (for verbose = true): object

```js
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}
```

* Result (for verbose = false):

"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

### getblockchaininfo

#### HTTP Verb

`POST`

#### Arguments

 * None

#### Result

```js
{
  "chain": "xxxx",        (string) current network name as defined in BIP70 (main, test, regtest)
  "blocks": xxxxxx,         (numeric) the current number of blocks processed in the server
  "headers": xxxxxx,        (numeric) the current number of headers we have validated
  "bestblockhash": "...", (string) the hash of the currently best block
  "difficulty": xxxxxx,     (numeric) the current difficulty
  "mediantime": xxxxxx,     (numeric) median time for the current best block
  "verificationprogress": xxxx, (numeric) estimate of verification progress [0..1]
  "chainwork": "xxxx"     (string) total amount of work in active chain, in hexadecimal
  "pruned": xx,             (boolean) if the blocks are subject to pruning
  "pruneheight": xxxxxx,    (numeric) lowest-height complete block stored
  "softforks": [            (array) status of softforks in progress
     {
        "id": "xxxx",        (string) name of softfork
        "version": xx,         (numeric) block version
        "reject": {            (object) progress toward rejecting pre-softfork blocks
           "status": xx,       (boolean) true if threshold reached
        },
     }, ...
  ],
  "bip9_softforks": {          (object) status of BIP9 softforks in progress
     "xxxx" : {                (string) name of the softfork
        "status": "xxxx",    (string) one of "defined", "started", "locked_in", "active", "failed"
        "bit": xx,             (numeric) the bit (0-28) in the block version field used to signal this softfork (only for "started" status)
        "startTime": xx,       (numeric) the minimum median time past of a block at which the bit gains its meaning
        "timeout": xx,         (numeric) the median time past of a block at which the deployment is considered failed if not yet locked in
        "since": xx            (numeric) height of the first block to which the status applies
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

* n    (numeric) The current block count

### getblockhash

#### HTTP Verb

`POST`
#### Arguments

1. height         (numeric, required) The height index

#### Result

"hash"         (string) The block hash

### getblockheader

#### HTTP Verb

`POST`

#### Arguments

1. "hash"          (string, required) The block hash
2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data

#### Result

```js
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "0000...1f3"     (string) Expected number of hashes required to produce the current chain (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash",      (string) The hash of the next block
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
    "height": xxxx,         (numeric) height of the chain tip
    "hash": "xxxx",         (string) block hash of the tip
    "branchlen": 0          (numeric) zero for main chain
    "status": "active"      (string) "active" for the main chain
  },
  {
    "height": xxxx,
    "hash": "xxxx",
    "branchlen": 1          (numeric) length of branch connecting the tip to the main chain
    "status": "xxxx"        (string) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
  }
]
```

### getchaintxstats

#### HTTP Verb

`POST`

#### Arguments

1. nblocks      (numeric, optional) Size of the window in number of blocks (default: one month).
2. "blockhash"  (string, optional) The hash of the block that ends the window.

#### Result

```js
{
  "time": xxxxx,                (numeric) The timestamp for the final block in the window in UNIX format.
  "txcount": xxxxx,             (numeric) The total number of transactions in the chain up to that point.
  "window_block_count": xxxxx,  (numeric) Size of the window in number of blocks.
  "window_tx_count": xxxxx,     (numeric) The number of transactions in the window. Only returned if "window_block_count" is > 0.
  "window_interval": xxxxx,     (numeric) The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0.
  "txrate": x.xx,               (numeric) The average rate of transactions per second in the window. Only returned if "window_interval" is > 0.
}
```

### getdifficulty

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

* n.nnn       (numeric) the proof-of-work difficulty as a multiple of the minimum difficulty.

### getmempoolancestors

#### HTTP Verb

`POST`
#### Arguments

1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

#### Result

Result (for verbose=false):
```js
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool ancestor transaction
  ,...
]
```

Result (for verbose=true):
```js
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in BCH
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}
```

### getmempooldescendants

#### HTTP Verb

`POST`

#### Arguments

1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

#### Result

Result (for verbose=false):
```js
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool descendant transaction
  ,...
]
```

Result (for verbose=true):
```js
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in BCH
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}
```

### getmempoolentry txid

#### HTTP Verb

`POST`

#### Arguments

1. "txid"                   (string, required) The transaction id (must be in mempool)

#### Result

```js
Result:
{                           (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in BCH
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
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
  "size": xxxxx,               (numeric) Current tx count
  "bytes": xxxxx,              (numeric) Transaction size.
  "usage": xxxxx,              (numeric) Total memory usage for the mempool
  "maxmempool": xxxxx,         (numeric) Maximum memory usage for the mempool
  "mempoolminfee": xxxxx       (numeric) Minimum fee for tx to be accepted
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
[                     (json array of string)
  "transactionid"     (string) The transaction id
  ,...
]
```

Result: (for verbose = true):
```js
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in BCH
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
    "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
    "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
    "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
    "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
    "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
    "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
    "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}
```

### gettxout

#### HTTP Verb

`POST`

#### Arguments

1. "txid"             (string, required) The transaction id
2. "n"                (numeric, required) vout number
3. "include_mempool"  (boolean, optional) Whether to include the mempool. Default: true.     Note that an unspent output that is spent in the mempool won't appear.

#### Result

```js
{
  "bestblock" : "hash",    (string) the block hash
  "confirmations" : n,       (numeric) The number of confirmations
  "value" : x.xxx,           (numeric) The transaction value in BCH
  "scriptPubKey" : {         (json object)
     "asm" : "code",       (string)
     "hex" : "hex",        (string)
     "reqSigs" : n,          (numeric) Number of required signatures
     "type" : "pubkeyhash", (string) The type, eg pubkeyhash
     "addresses" : [          (array of string) array of bitcoin addresses
        "address"     (string) bitcoin address
        ,...
     ]
  },
  "coinbase" : true|false   (boolean) Coinbase or not
}
```

### gettxoutproof

#### HTTP Verb

`POST`

#### Arguments

1. "txids"       (string) A json array of txids to filter
    [
      "txid"     (string) A transaction hash
      ,...
    ]
2. "blockhash"   (string, optional) If specified, looks for txid in the block with this hash

#### Result

"data"           (string) A string that is a serialized, hex-encoded data for the proof.

### gettxoutsetinfo

#### HTTP Verb

`POST`
#### Arguments

* none

#### Result

```js
{
  "height":n,     (numeric) The current block height (index)
  "bestblock": "hex",   (string) the best block hash hex
  "transactions": n,      (numeric) The number of transactions
  "txouts": n,            (numeric) The number of output transactions
  "bogosize": n,          (numeric) A database-independent metric for UTXO set size
  "hash_serialized": "hash",   (string) The serialized hash
  "disk_size": n,         (numeric) The estimated size of the chainstate on disk
  "total_amount": x.xxx          (numeric) The total amount
}
```

### preciousblock

#### HTTP Verb

`POST`

#### Arguments

1. "blockhash"   (string, required) the hash of the block to mark as precious

#### Result

* none

### pruneblockchain

#### HTTP Verb

`POST`

#### Arguments

1. "height"       (numeric, required) The block height to prune up to. May be set to a discrete height, or a unix timestamp
                  to prune blocks whose block time is at least 2 hours older than the provided timestamp.
#### Result

n    (numeric) Height of the last block pruned.

### verifychain

#### HTTP Verb

`POST`
#### Arguments

1. checklevel   (numeric, optional, 0-4, default=3) How thorough the block verification is.
2. nblocks      (numeric, optional, default=6, 0=all) The number of blocks to check.

#### Result

true|false       (boolean) Verified or not

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
  "version": xxxxx,           (numeric) the server version
  "protocolversion": xxxxx,   (numeric) the protocol version
  "walletversion": xxxxx,     (numeric) the wallet version
  "balance": xxxxxxx,         (numeric) the total bitcoin balance of the wallet
  "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
  "timeoffset": xxxxx,        (numeric) the time offset
  "connections": xxxxx,       (numeric) the number of connections
  "proxy": "host:port",     (string, optional) the proxy used by the server
  "difficulty": xxxxxx,       (numeric) the current difficulty
  "testnet": true|false,      (boolean) if the server is using testnet or not
  "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
  "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,         (numeric) the transaction fee set in BCH/kB
  "relayfee": x.xxxx,         (numeric) minimum relay fee for non-free transactions in BCH/kB
  "errors": "..."           (string) any error messages
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
  "locked": {               (json object) Information about locked memory manager
    "used": xxxxx,          (numeric) Number of bytes used
    "free": xxxxx,          (numeric) Number of bytes available in current arenas
    "total": xxxxxxx,       (numeric) Total number of bytes managed
    "locked": xxxxxx,       (numeric) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    "chunks_used": xxxxx,   (numeric) Number allocated chunks
    "chunks_free": xxxxx,   (numeric) Number unused chunks
  }
}
```

### help

#### HTTP Verb

`POST`
#### Arguments

1. "command"     (string, optional) The command to get help on

#### Result

"text"     (string) The help text

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

ttt        (numeric) The number of seconds that the server has been running

## Generating

### generatetoaddress

#### HTTP Verb

`POST`
#### Arguments

1. nblocks      (numeric, required) How many blocks are generated immediately.
2. address      (string, required) The address to send the newly generated bitcoin to.
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
       "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
       "capabilities":[     (array, optional) A list of strings
           "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
           ,...
       ],
       "rules":[            (array, optional) A list of strings
           "support"          (string) client side supported softfork deployment
           ,...
       ]
     }
```

#### Result

```js
{
  "version" : n,                    (numeric) The preferred block version
  "rules" : [ "rulename", ... ],    (array of strings) specific block rules that are to be enforced
  "vbavailable" : {                 (json object) set of pending, supported versionbit (BIP 9) softfork deployments
      "rulename" : bitnumber          (numeric) identifies the bit number as indicating acceptance and readiness for the named softfork rule
      ,...
  },
  "vbrequired" : n,                 (numeric) bit mask of versionbits the server requires set in submissions
  "previousblockhash" : "xxxx",     (string) The hash of current highest block
  "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
      {
         "data" : "xxxx",             (string) transaction data encoded in hexadecimal (byte-for-byte)
         "txid" : "xxxx",             (string) transaction id encoded in little-endian hexadecimal
         "hash" : "xxxx",             (string) hash encoded in little-endian hexadecimal (including witness data)
         "depends" : [                (array) array of numbers
             n                          (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
             ,...
         ],
         "fee": n,                    (numeric) difference in value between transaction inputs and outputs (in Satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
         "sigops" : n,                (numeric) total SigOps cost, as counted for purposes of block limits; if key is not present, sigop cost is unknown and clients MUST NOT assume it is zero
         "required" : true|false      (boolean) if provided and true, this transaction must be in the final block
      }
      ,...
  ],
  "coinbaseaux" : {                 (json object) data that should be included in the coinbase's scriptSig content
      "flags" : "xx"                  (string) key name is to be ignored, and value included in scriptSig
  },
  "coinbasevalue" : n,              (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in Satoshis)
  "coinbasetxn" : { ... },          (json object) information for coinbase transaction
  "target" : "xxxx",                (string) The hash target
  "mintime" : xxx,                  (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  "mutable" : [                     (array of string) list of ways the block template may be changed
     "value"                          (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
     ,...
  ],
  "noncerange" : "00000000ffffffff",(string) A range of valid nonces
  "sigoplimit" : n,                 (numeric) limit of sigops in blocks
  "sizelimit" : n,                  (numeric) limit of block size
  "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
  "bits" : "xxxxxxxx",              (string) compressed target of next block
  "height" : n                      (numeric) The height of the next block
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
  "blocks": nnn,             (numeric) The current block
  "currentblocksize": nnn,   (numeric) The last block size
  "currentblocktx": nnn,     (numeric) The last block transaction
  "difficulty": xxx.xxxxx    (numeric) The current difficulty
  "errors": "..."            (string) Current errors
  "networkhashps": nnn,      (numeric) The network hashes per second
  "pooledtx": n              (numeric) The size of the mempool
  "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
}
```

### getnetworkhashps

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
2. height      (numeric, optional, default=-1) To estimate at the time of the given height.

#### Result

x             (numeric) Hashes per second estimated

### prioritisetransaction

#### HTTP Verb

`POST`

#### Arguments

1. "txid"       (string, required) The transaction id.
2. priority_delta (numeric, required) The priority to add or subtract.
                  The transaction selection algorithm considers the tx as it would have a higher priority.
                  (priority of a transaction is calculated: coinage * value_in_satoshis / txsize)
3. fee_delta      (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).
                  The fee is not actually paid, only the algorithm for selecting transactions into a block
                  considers the transaction as it would have paid a higher (or lower) fee.

#### Result

true              (boolean) Returns true

### submitblock

#### HTTP Verb

`POST`

#### Arguments

1. "hexdata"        (string, required) the hex-encoded block data to submit
2. "parameters"     (string, optional) object of optional parameters
    {
      "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
    }

#### Result

* None

## Network

### addnode

#### HTTP Verb

`POST`

#### Arguments

1. "node"     (string, required) The node (see getpeerinfo for nodes)
2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

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

1. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.

#### Result

```js
[
  {
    "addednode" : "192.168.0.201",   (string) The node ip address or name (as provided to addnode)
    "connected" : true|false,          (boolean) If connected
    "addresses" : [                    (list of objects) Only when connected = true
       {
         "address" : "192.168.0.201:8333",  (string) The bitcoin server IP and port were connected to
         "connected" : "outbound"           (string) connection, inbound or outbound
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

n          (numeric) The connection count

### getexcessiveblock

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

* excessiveBlockSize (integer) block size in bytes

### getnettotals

#### HTTP Verb

`POST`

#### Arguments

* None

#### Result

```js
{
  "totalbytesrecv": n,   (numeric) Total bytes received
  "totalbytessent": n,   (numeric) Total bytes sent
  "timemillis": t,       (numeric) Current UNIX time in milliseconds
  "uploadtarget":
  {
    "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
    "target": n,                            (numeric) Target in bytes
    "target_reached": true|false,           (boolean) True if target is reached
    "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
    "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
    "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
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
  "version": xxxxx,                      (numeric) the server version
  "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
  "protocolversion": xxxxx,              (numeric) the protocol version
  "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
  "localrelay": true|false,              (bool) true if transaction relay is requested from peers
  "timeoffset": xxxxx,                   (numeric) the time offset
  "connections": xxxxx,                  (numeric) the number of connections
  "networkactive": true|false,           (bool) whether p2p networking is enabled
  "networks": [                          (array) information per network
  {
    "name": "xxx",                     (string) network (ipv4, ipv6 or onion)
    "limited": true|false,               (boolean) is the network limited using -onlynet?
    "reachable": true|false,             (boolean) is the network reachable?
    "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
    "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
  }
  ,...
  ],
  "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for non-free transactions in BCH/kB
  "excessutxocharge": x.xxxxxxxx,        (numeric) minimum charge for excess utxos in BCH
  "incrementalfee": x.xxxxxxxx,          (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in BCH/kB
  "localaddresses": [                    (array) list of local addresses
  {
    "address": "xxxx",                 (string) network address
    "port": xxx,                         (numeric) network port
    "score": xxx                         (numeric) relative score
  }
  ,...
  ]
  "warnings": "..."                    (string) any network warnings
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
    "id": n,                   (numeric) Peer index
    "addr":"host:port",      (string) The ip address and port of the peer
    "addrlocal":"ip:port",   (string) local address
    "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
    "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
    "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    "bytessent": n,            (numeric) The total bytes sent
    "bytesrecv": n,            (numeric) The total bytes received
    "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    "timeoffset": ttt,         (numeric) The time offset in seconds
    "pingtime": n,             (numeric) ping time (if available)
    "minping": n,              (numeric) minimum observed ping time (if any at all)
    "pingwait": n,             (numeric) ping wait (if non-zero)
    "version": v,              (numeric) The peer version, such as 7001
    "subver": "/Satoshi:0.8.5/",  (string) The string version
    "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    "addnode": true|false,     (boolean) Whether connection was due to addnode and is using an addnode slot
    "startingheight": n,       (numeric) The starting height (block) of the peer
    "banscore": n,             (numeric) The ban score
    "synced_headers": n,       (numeric) The last header we have in common with this peer
    "synced_blocks": n,        (numeric) The last block we have in common with this peer
    "inflight": [
       n,                        (numeric) The heights of blocks were currently asking from this peer
       ...
    ],
    "whitelisted": true|false, (boolean) Whether the peer is whitelisted
    "bytessent_per_msg": {
       "addr": n,              (numeric) The total bytes sent aggregated by message type
       ...
    },
    "bytesrecv_per_msg": {
       "addr": n,              (numeric) The total bytes received aggregated by message type
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

1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
2. "command"      (string, required) 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
4. "absolute"     (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)

#### Result

* None

### setexcessiveblock

#### HTTP Verb

`POST`

#### Arguments

* none

#### Result

* blockSize (integer) excessive block size in bytes

### setnetworkactive

#### HTTP Verb

`POST`

#### Arguments

1. "state"        (boolean, required) true to enable networking, false to disable

#### Result

* None

## Rawtransactions

### createrawtransaction

#### HTTP Verb

`POST`
#### Arguments

1. "inputs"                (array, required) A json array of json objects
     [
       {
         "txid":"id",    (string, required) The transaction id
         "vout":n,         (numeric, required) The output number
         "sequence":n      (numeric, optional) The sequence number
       }
       ,...
     ]
2. "outputs"               (object, required) a json object with outputs
    {
      "address": x.xxx,    (numeric or string, required) The key is the bitcoin address, the numeric value (can be string) is the BCH amount
      "data": "hex"      (string, required) The key is "data", the value is hex encoded data
      ,...
    }
3. locktime                  (numeric, optional, default=0) Raw locktime. Non-0 value also locktime-activates inputs

#### Result

"transaction"              (string) hex string of the transaction

### decoderawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. "hexstring"      (string, required) The transaction hex string

#### Result

```js
{
  "txid" : "id",        (string) The transaction id
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The transaction size
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric) The output number
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "sequence": n     (numeric) The script sequence number
     }
     ,...
  ],
  "vout" : [             (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in BCH
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "addresses" : [           (json array of string)
           "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (string) bitcoin address
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

1. "hexstring"     (string) the hex encoded script

#### Result

```js
{
  "asm":"asm",   (string) Script public key
  "hex":"hex",   (string) hex encoded public key
  "type":"type", (string) The output type
  "reqSigs": n,    (numeric) The required signatures
  "addresses": [   (json array of string)
     "address"     (string) bitcoin address
     ,...
  ],
  "p2sh","address" (string) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
}
```

### getrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. "txid"      (string, required) The transaction id
2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object

#### Result

Result (if verbose is not set or set to false):

"data"      (string) The serialized, hex-encoded data for 'txid'

Result (if verbose is set to true):
```js
{
  "hex" : "data",       (string) The serialized, hex-encoded data for 'txid'
  "txid" : "id",        (string) The transaction id (same as provided)
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The serialized transaction size
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric)
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "sequence": n      (numeric) The script sequence number
     }
     ,...
  ],
  "vout" : [              (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in BCH
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "addresses" : [           (json array of string)
           "address"        (string) bitcoin address
           ,...
         ]
       }
     }
     ,...
  ],
  "blockhash" : "hash",   (string) the block hash
  "confirmations" : n,      (numeric) The confirmations
  "time" : ttt,             (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt         (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
}
```

### sendrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. "hexstring"    (string, required) The hex string of the raw transaction)
2. allowhighfees    (boolean, optional, default=false) Allow high fees

#### Result

"hex"             (string) The transaction hash in hex

### signrawtransaction

#### HTTP Verb

`POST`

#### Arguments

1. "hexstring"     (string, required) The transaction hex string
2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
     [               (json array of json objects, or 'null' if none provided)
       {
         "txid":"id",             (string, required) The transaction id
         "vout":n,                  (numeric, required) The output number
         "scriptPubKey": "hex",   (string, required) script key
         "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
         "amount": value            (numeric, required) The amount spent
       }
       ,...
    ]
3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
    [                  (json array of strings, or 'null' if none provided)
      "privatekey"   (string) private key in base58-encoding
      ,...
    ]
4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
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
  "hex" : "value",           (string) The hex-encoded raw transaction with signature(s)
  "complete" : true|false,   (boolean) If the transaction has a complete set of signatures
  "errors" : [                 (json array of objects) Script verification errors (if there are any)
    {
      "txid" : "hash",           (string) The hash of the referenced, previous transaction
      "vout" : n,                (numeric) The index of the output to spent and used as input
      "scriptSig" : "hex",       (string) The hex-encoded signature script
      "sequence" : n,            (numeric) Script sequence number
      "error" : "text"           (string) Verification or signing error related to the input
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

1. nrequired      (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keys"       (string, required) A json array of keys which are bitcoin addresses or hex-encoded public keys
     [
       "key"    (string) bitcoin address or hex-encoded public key
       ,...
     ]
#### Result

```js
{
  "address":"multisigaddress",  (string) The value of the new multisig address.
  "redeemScript":"script"       (string) The string value of the hex-encoded redemption script.
}
```

### estimatefee

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric, required)

#### Result

n              (numeric) estimated fee-per-kilobyte

### estimatepriority

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric, required)

#### Result

n              (numeric) estimated priority

### estimatesmartfee

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric)

#### Result

```js
{
  "feerate" : x.x,     (numeric) estimate fee-per-kilobyte (in BCH)
  "blocks" : n         (numeric) block number where estimate was found
}
```

### estimatesmartpriority

#### HTTP Verb

`POST`

#### Arguments

1. nblocks     (numeric, required)

#### Result

```js
{
  "priority" : x.x,    (numeric) estimated priority
  "blocks" : n         (numeric) block number where estimate was found
}
```

### signmessagewithprivkey

#### HTTP Verb

`POST`

#### Arguments

1. "privkey"         (string, required) The private key to sign the message with.
2. "message"         (string, required) The message to create a signature of.

#### Result

"signature"          (string) The signature of the message encoded in base 64

### validateaddress

#### HTTP Verb

`POST`

#### Arguments

1. "address"     (string, required) The bitcoin address to validate

#### Result

```js
{
  "isvalid" : true|false,       (boolean) If the address is valid or not. If not, this is the only property returned.
  "address" : "address", (string) The bitcoin address validated
  "scriptPubKey" : "hex",       (string) The hex encoded scriptPubKey generated by the address
  "ismine" : true|false,        (boolean) If the address is yours or not
  "iswatchonly" : true|false,   (boolean) If the address is watchonly
  "isscript" : true|false,      (boolean) If the key is a script
  "pubkey" : "publickeyhex",    (string) The hex value of the raw public key
  "iscompressed" : true|false,  (boolean) If the address is compressed
  "account" : "account"         (string) DEPRECATED. The account associated with the address, "" is the default account
  "timestamp" : timestamp,        (number, optional) The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
  "hdkeypath" : "keypath"       (string, optional) The HD keypath if the key is HD and available
  "hdmasterkeyid" : "<hash160>" (string, optional) The Hash160 of the HD master pubkey
}
```

### verifymessage

#### HTTP Verb

`POST`

#### Arguments

1. "address"         (string, required) The bitcoin address to use for the signature.
2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
3. "message"         (string, required) The message that was signed.

#### Result

true|false   (boolean) If the signature is verified or not.
