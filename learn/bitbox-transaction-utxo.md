---
layout: specification
title: "Create Transactions w/ BITBOX"
description: Create mnemonics, root seeds, master hd nodes, BIP44 accounts, external change addresss, generate cash addresses, get list of spendable utxo, create tx and send them.
date:   2018-05-13
activation: 1515888001
version: 1.0
group: learn
---


Sending transactions is at the heart of BCH. BITBOX has been able to send transactions for a while but w/ BITBOX Cloud and [REST](https://rest.bitbox.earth/) taking shape we wanted to revisit the steps for sending transactions to show how to best leverage the new functionality.

## Setup

Before we get started let's create an HDNode and send it some satohis.

### Mnemonic

First we generate a random 256 bit mnemonic.

```js
let mnemonic = BITBOX.Mnemonic.generate(256)
// slam tag city glass asthma mention rich leader snake prevent fatal trick typical gallery scare sort clip wolf strike float dwarf just clip mail
```

### Root seed

From that mnemonic we create a root seed buffer.

```js
// root seed buffer
let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);
```

### Master HD Node

With our root seed we can create a [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) master hd node. The 2nd argument is the network. Pass in `'bitcoincash'` for mainnet and `'testnet'` for testnet.

```js
// master HDNode
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, 'bitcoincash');
```

### Account

Next create a [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) account. The 2nd argument is the BIP44 HD path.

```js
// HDNode of BIP44 account
let account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");
```

### Change

Create the first external change address per BIP44.

```js
// derive the first external change address HDNode which is going to spend utxo
let change = BITBOX.HDNode.derivePath(account, "0/0");
```

### Cash Address

```js
// get the cash address
let cashAddress = BITBOX.HDNode.toCashAddress(change);
// bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga
```

### Send some satoshis

Now we send a few satoshis to `bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga`. You can see that at [aeaadaa9e952bf9fe02db6f261f31db2ab42224c9c8da73d78e2978eca372594](https://explore.bitbox.earth/transaction/aeaadaa9e952bf9fe02db6f261f31db2ab42224c9c8da73d78e2978eca372594?output=0)

With that all set up lets now look at leveraging BITBOX Cloud.

## BITBOX Cloud

BITBOX Cloud is your 'Blockchain as a Service.' We recently started integrating w/ `bitbox-cli` so you can leverage BITBOX Cloud w/out any additional setup.

You can use [Address.utxo](https://www.bitbox.earth/bitboxcli/address#utxo) to get back a list of uxto for an address

```js
BITBOX.Address.utxo('bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga').then((result) => {
  console.log(result);
  // [ { txid: 'aeaadaa9e952bf9fe02db6f261f31db2ab42224c9c8da73d78e2978eca372594',
  //   vout: 0,
  //   scriptPubKey: '76a91426a2269210eee1c77d44830a6f828bfb600110dd88ac',
  //   amount: 0.00006893,
  //   satoshis: 6893,
  //   height: 530048,
  //   confirmations: 1,
  //   legacyAddress: '14XGviVV31TudFn8TEkBduLFyLa8fwPE5G',
  //   cashAddress: 'bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga' } ]

}, (err) => { console.log(err);
});
```

Now lets spend the utxo.

### TransactionBuilder instance

First create an instance of `TransactionBuilder`. Note the `'bitcoincash'` argument is optionnal and it will default to mainnet if you pass nothing in. Pass in `'testnet'` to create testnet transactions. For this example we'll use the mainnet.

```js
// instance of transaction builder
let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
```

### Original amount

Now get the original amount of satoshis from the utxo. This is returned from the call to `BITBOX.Address.utxo`.

```js
// original amount of satoshis in vin
let originalAmount = result[0].satoshis;
```

### And the index

Get the index of the vout which you want to spend.

```js
// index of vout
let vout = result[0].vout;
```

### Get the txid

Next get the txid of the uxto you want to spend

```js
// txid of vout
let txid = result[0].txid;
```

### Add the inputs

Now we're ready to add the input to our `transactionBuilder` instance. First pass in the `txid` and next the `vout` index.

```js
// add input with txid and index of vout
transactionBuilder.addInput(txid, vout);
```

### Calculate the fee

Next use [BitcoinCash.getByteCount](https://www.bitbox.earth/bitboxcli/bitcoincash#getByteCount) to calculate the fee. Here we pass in 2 objects describing the type and number of inputs/outputs. For this example we have 1 `P2PKH` input and 1 `P2PKH` output.

```js
// get byte count to calculate fee. paying 1 sat/byte
let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
// 192
```

### Calculate the fee

A transaction w/ 1 `P2PKH` input and 1 `P2PKH` output is 192 bytes. We subtract that from the original amount of satoshis to get a fee of 1 satoshi per byte.

```js
// amount to send to receiver. It's the original amount - 1 sat/byte for tx size
let sendAmount = originalAmount - byteCount;
```

### Add the output

Add the address where you want to send the satoshis and the send amount which is the original amount minus the 1 satoshi per byte.

```js
// add output w/ address and amount to send
transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);
```

### Get the node's keypair

Now get the change node's keypair to sign the transaction.

```js
// keypair
let keyPair = BITBOX.HDNode.toKeyPair(change);
```

### Sign input

Sign the input. Pass in the index of the input you're signing. In this case we only have 1 input so the index is `0`. Next pass in the node's keypair to sign the tx, a placeholder `redeemScript` var which isn't needed here, the hash type which is `SIGHASH_ALL` and lastly the original amount of satoshis in the utxo which we're spending.

```js
// sign w/ HDNode
let redeemScript;
transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
```

### Build and get raw hex

Now build the transaction and get the raw hex.

```js
// build tx
let tx = transactionBuilder.build();
// output rawhex
let hex = tx.toHex();
BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
```

### POST the transaction

Finally we're ready to send our transaction to the BCH network.

```js
// sendRawTransaction to running BCH node
BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
```

### All together now

```js
// include BITBOX
let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;

// Instantiate BITBOX and pass in creds for a full node.
let BITBOX = new BITBOXCli({
  protocol: "http",
  host: "138.68.54.100",
  port: "8332",
  username: "bitcoin",
  password: "xhFjluMJMyOXcYvF",
  corsproxy: "remote"
});

// create mnemonic
let mnemonic = 'slam tag city glass asthma mention rich leader snake prevent fatal trick typical gallery scare sort clip wolf strike float dwarf just clip mail';

// root seed buffer
let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

// master HDNode
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, 'bitcoincash');

// HDNode of BIP44 account
let account = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'");

// derive the first external change address HDNode which is going to spend utxo
let change = BITBOX.HDNode.derivePath(account, "0/0");

// get the cash address
let cashAddress = BITBOX.HDNode.toCashAddress(change);
// bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga

BITBOX.Address.utxo('bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga').then((result) => {
  console.log(result);
  // [ { txid: 'aeaadaa9e952bf9fe02db6f261f31db2ab42224c9c8da73d78e2978eca372594',
  //   vout: 0,
  //   scriptPubKey: '76a91426a2269210eee1c77d44830a6f828bfb600110dd88ac',
  //   amount: 0.00006893,
  //   satoshis: 6893,
  //   height: 530048,
  //   confirmations: 1,
  //   legacyAddress: '14XGviVV31TudFn8TEkBduLFyLa8fwPE5G',
  //   cashAddress: 'bitcoincash:qqn2yf5jzrhwr3magjps5muz30akqqgsm5q7wcgkga' } ]

  // instance of transaction builder
  let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
  // original amount of satoshis in vin

  let originalAmount = result[0].satoshis;

  // index of vout
  let vout = result[0].vout;

  // txid of vout
  let txid = result[0].txid;

  // add input with txid and index of vout
  transactionBuilder.addInput(txid, vout);

  // get byte count to calculate fee. paying 1 sat/byte
  let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
  // 192

  // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
  let sendAmount = originalAmount - byteCount;

  // add output w/ address and amount to send
  transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);

  // keypair
  let keyPair = BITBOX.HDNode.toKeyPair(change);

  // sign w/ HDNode
  let redeemScript;
  transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);

  // build tx
  let tx = transactionBuilder.build();
  // output rawhex
  let hex = tx.toHex();

  // sendRawTransaction to running BCH node
  BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });
}, (err) => { console.log(err);
});
```

### Success

If we did that correct we should get back a txid [b1af7ddb049d39d34df938f3ac22248cfc3c845dc2d6381a718e971e3e12d8d5](https://explore.bitbox.earth/transaction/b1af7ddb049d39d34df938f3ac22248cfc3c845dc2d6381a718e971e3e12d8d5).

## Summary

This was to show step by step how to create a mnemonic, root seed, master node, bip44 account and bip44 change node. It showed how to create a cash address.

Once you have utxo which are spendable it showed how to call BITBOX Cloud via `BITBOX.Address.utxo` to get back a list of spendable utxo.

It next showed how to build a transaction, sign it and `POST` it to the BCH network.

If your app needs to send BCH transactions BITBOX is the tool and this tutorial shows you how to make it happen.
