#Abstract

This proposal describes a new 'standard' transaction type that specifies an address
format for future "non-standard" smart contract transaction addressses.

#Motivation

The current "standard" address formats, p2sh and p2pkh each specifiy exactly one
immutable template for the scriptPubKey of that particular address.  p2pkh address formats can only be used for 'standard' simple public-key
economic transactions.  p2sh address formats have a templated scriptPubKey but allow custom scripts (up to 520 bytes in length) for the redeemScript, which allows the reciever
to specify contract terms (such as multisig) for an address, without requiring complex wallet support to recieve coins.

However, several important current and future use cases require the ability to create outputs with custom scriptPubKey contract terms created and validated by the *sender*.

Examples of these use cases include:

* Unredeemable OP_RETURN outputs for embedding metadata into the blockchain, which have a
		
	OP_RETURN OP_DATA <data>

* Colored coin transactions using OP_GROUP
	
	OP_DATA <group address> OP_GROUP OP_DROP OP_DUP OP_HASH160 OP_DATA <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG

* CheckLockTime transactions

	<expiry time> OP_CHECKLOCKTIMEVERIFY OP_DROP OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

* Transaction puzzles

	scriptPubKey: OP_HASH256 <OP_DATA> OP_EQUAL


These use cases cannot be created by standard wallet software, because they do not have a standard address format created that can create the required scriptPubKey outputs.  

This standard creates an address type that directly serializes the scriptPublicKey.  
This allows any wallet that implements this standard to be able send coins to any user created smart contract for all current and future smart contracts, without requiring special logic in the wallet to handle that kind of contract. 

This allows, for example, all colored coin addresses to be automatically be tagged with a corresponding prefix and spent to/from standard wallets without generating a new address serialization format for all colored coins.  

It also allows users to send coins to smart contracts without needing wallet support for that specific smart contract.

* Specification

This builds on the *cashaddr* format.

The version 'type' '2' is allocated in the cashaddr standard to mean a new kind of address that means 'Pay to Public Script'.  When used as an output, the payload *must* be directly used verbatim as the scriptPubKey in the corresponding

scriptPubKeys that match to any other existing 'standard' cashaddr address type (such as p2sh or p2pkh), *MUST NOT* be generated or displayed as a p2ps addresss.  Instead, the appropriate other address type must be generated and displayed to the user.

* Validation and UX

  A CashAddr conforming wallet  *must* allow the user to send to any p2ps address.  However, it is allowed to warn about the non-standard nature of the address.   
Wallets must not modify the provided scriptPubKey in any way.  Wallets can warn if it does not conform to an expected format, such as a colored-coin wallet that expects an OP_GROUP coin address can warn that the destination does not conform.

Additionally This format creates valid p2ps addresses for existing p2sh and p2pkh addresses, which could cause user confusion.  To prevent that, it is *against this spec* to represent or present standard addresses in p2ps form.  
However, if they are input by the user as an output destination the payment should still go through.

* Limitations and future work

  Due to the size limitations of cashaddr, these scripts are limited to 64 bytes.  This is plenty of space to enable a wide range of use cases.  However, it's still much less than p2sh's maximum length of 520 bytes.  
  After there is a specified future cashaddr extension for more types and lengths, we intend to create another type 'p2xps' (Pay 2 eXtended Public Script) that takes advantage of the length-extension.

* Test Vectors

<todo>
