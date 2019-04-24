---
layout: specification
title: Client Side Filtering
category: spec
date: 2019-04-01
activation: N/A
version: 0.1
---

Client Side Filtering
===============

This is a spec for client side filtering as implemented in bchd and intended for use on the Bitcoin Cash network. 

The Bitcoin Cash implemention is compatible with BIPs [157](https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki) and [158](https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki) with the following exceptions:


### Basic Filter Construction

We have made two changes to the filter construction defined in BIP 158:

1. BIP 158 specifies that a basic filter contains all pkScripts in the block except OP_RETURN scripts. For the Bitcoin Cash network we have changed the basic filter construction to include OP_RETURN data. Specifically for each non-coinbase OP_RETURN output each data element in the OP_RETURN script is added to the filter. This only includes `OP_DATA_1` to `OP_PUSHDATA4` and excludes `OP_0` and `OP_1` through `OP_16`.

2. Serialized input outpoints are added to the filter *in place* of previous output scripts. The outpoint is serialized as 32-byte little endian hash followed by 4-byte little endian index.

The builder algorithm as implemented in bchd looks like this:

```go
// BuildBasicFilter builds a basic GCS filter from a block. A basic GCS filter
// will contain all the outpoints spent by inputs within a block, as well as
// the scriptPubKeys in each output in the block. Along with the data pushes
// for each OP_RETURN output.
func BuildBasicFilter(block *wire.MsgBlock) (*gcs.Filter, error) {
	blockHash := block.BlockHash()
	b := WithKeyHash(&blockHash)

	// If the filter had an issue with the specified key, then we force it
	// to bubble up here by calling the Key() function.
	_, err := b.Key()
	if err != nil {
		return nil, err
	}

	// In order to build a basic filter, we'll range over the entire block,
	// adding each whole script itself.
	for i, tx := range block.Transactions {

		// For each tx in excluding the coinbase, write the outpoint.
		for _, txIn := range tx.TxIn {
			if i == 0 {
				continue
			}
			var buf bytes.Buffer
			if err := txIn.PreviousOutPoint.Serialize(&buf); err != nil {
				continue
			}
			serializedOutpoint := buf.Bytes()
			if len(serializedOutpoint) > 0 {
				b.AddEntry(serializedOutpoint)
			}
		}

		// For each output in a transaction, we'll add each pkScript.
		for _, txOut := range tx.TxOut {
			if len(txOut.PkScript) == 0 {
				continue
			}

			// In order to allow the filters to later be committed
			// to within an OP_RETURN output, we ignore all OP_RETURNs
			// in the coinbase to avoid a circular dependency.
			if i == 0 && txOut.PkScript[0] == txscript.OP_RETURN {
				continue
			}

			// If this is a non-coinbase OP_RETURN output then add all
			// the data elements in the script.
			if txOut.PkScript[0] == txscript.OP_RETURN {
				dataElements, err := txscript.ExtractDataElements(txOut.PkScript)
				if err != nil {
					continue
				}
				b.AddEntries(dataElements)
				continue
			}

			b.AddEntry(txOut.PkScript)
		}
	}

	return b.Build()
}

// ExtractDataElements returns a slice of all the data elements in the
// given script.
func ExtractDataElements(script []byte) ([][]byte, error) {
	var dataElements [][]byte
	pops, err := parseScript(script)
	if err != nil {
		return nil, err
	}
	for _, pop := range pops {
		// The only opcodes which carry data are OP_DATA_1 to OP_PUSHDATA4.
		// OP_0 and OP_1 - OP_16 are ignored for the purpose of this function
		// even though they push data to the stack.
		if pop.opcode.value > OP_0 && pop.opcode.value <= OP_PUSHDATA4 {
			dataElements = append(dataElements, pop.data)
		}
	}
	return dataElements, nil
}
```

The rationale for ommitting OP_RETURN outputs in the coinbase is so we can commit the filter to the coinbase later on without creating a circular dependency.

The rationale for adding each data element in the OP_RETURN is so that lite clients which use an OP_RETURN based protocol can get filter matches and make use of client side filtering.

The rationale for using outpoints instead of previous scriptPubKeys is to allow clients to deterministically build a filter from a block a verify that the filter is correct without needing access to the UTXO set. 

### New Network Message

Nodes signaling `NodeCF` must also implement a new network message not defined in BIP 157. The new message command is `getcfmempool` and it has a single byte payload containing the filter type. As per BIP 158 the only supported filter type at present is 0x00.

Upon receiving a `getcfmempool` message a node must construct a `cfilter` using transactions in its mempool and respond with a `cfilter` message.

When constructing the mempool filter, the 128-bit `k` value is set to zero. When constructing the `cfilter` network message the "BlockHash" field is also set to zero (32 zero bytes). In code:

```go
// OnGetCFMemPool is invoked when a peer receives a getcfmempool bitcoin message.
// It creates a Cfilter of node's mempool and sends it to the requesting peer in a
// cfilter message.
func (sp *serverPeer) OnGetCFMemPool(_ *peer.Peer, msg *wire.MsgGetCFMempool) {
	// Only allow getcfmempool requests if the server has nodeCF enabled
	if sp.server.services&wire.SFNodeCF != wire.SFNodeCF {
		peerLog.Debugf("peer %v sent getcfmempool request with NodeCF "+
			"disabled -- disconnecting", sp)
		sp.Disconnect()
		return
	}

	// A decaying ban score increase is applied to prevent flooding.
	// The ban score accumulates and passes the ban threshold if a burst of
	// getcfmempool messages comes from a peer. The score decays each minute to
	// half of its value.
	sp.addBanScore(0, 33, "getcfmempool")

	switch msg.FilterType {
	case wire.GCSFilterRegular:
		break

	default:
		peerLog.Debugf("Mempool filter request for unknown filter: %v",
			msg.FilterType)
		return
	}

	var txs []*wire.MsgTx
	for _, txDesc := range sp.server.txMemPool.TxDescs() {
		txs = append(txs, txDesc.Tx.MsgTx())
	}

	filter, err := builder.BuildMempoolFilter(txs)
	if err != nil {
		return
	}

	filterBytes, err := filter.NBytes()
	if err != nil {
		return
	}
	zeroHash := &chainhash.Hash{}
	resp := wire.NewMsgCFilter(wire.GCSFilterRegular, zeroHash, filterBytes)
	sp.QueueMessage(resp, nil)
}
```

The rationale for adding the `getcfmempool` message is to allow lite clients which just joined the network to query to see if there are any transactions in the mempool relevant to their wallets. If the returned filter matches any scripts in the wallet they can they download the full mempool using the `mempool` network message.

Assuming most of the time the filter will not match their wallet this functionality will not be expected to use excessive bandwidth but it will prevent the remote peers from figuring out which specific transactions in the mempool they are interested in. 

Unlike block filters, the mempool filter can not be authenticated to verify accuracy. Hence, the lite client should treat the mempool filter as a best effort and understand that relevant transactions in the mempool may go missed. 

