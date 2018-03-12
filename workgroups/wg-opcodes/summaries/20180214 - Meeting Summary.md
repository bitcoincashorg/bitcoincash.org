---
layout: meeting-summary
title: Discussion of OP_GROUP
group: opcodes
category: summary
time: 20180214 1500 (UTC)
version: 1.0
chair: JVP
participants: [
    Amaury Sechét of Bitcoin ABC,
    Andrea Suisani of Bitcoin Unlimited and ABC,
    Jason B Cox of Bitcoin ABC,
    Steve Shadders of nChain,
    Gavin Andresen,
    Shammah Chancellor of Bitcoin ABC,
    Andrew Stone of Bitcoin Unlimited
]
---

# Discussion Topic

To discuss the viability of OP_GROUP in regards to use case, safety, and the future of Bitcoin Cash.

# Brief overview of discussion

 * Rundown of the process to mint coloured coins
     * Create a new address and send it some BCH with a normal P2SH or P2PKH transaction (This is your group address and a valid Bitcoin Cash address).  At that point you can send the BCH to any address and annotate that address with your group address. 
     * Any unspent transaction output could be used to mint coloured coins. You do require a wallet that understands OP_GROUP to spend the UTXO
     * The owner of the tokens retains control over the complete supply and can mint as required or they see fit.
     * Proposal as it stands does not include a way to prevent the owner of a token “printing” more tokens.
         * Chris Pacia has a proposal on how to do this using OP_CHAINHEIGHT (https://www.yours.org/content/colored-coins-in-bitcoin-cash-b26804e05964/ ) 
 * Discussion on the possibility of putting out “half transactions” on the blockchain as a means to auction tokens on the blockchain, ( in relation to OP_GROUP use cases ).
     * Questions regarding how the chosen “filler” of the transaction is decided.
     * As the vendor of the “half transaction” you would wait and chose the most appealing “fill”
     * The vendor signs the output, and waits for the input to be signed.
     * Miners cant take the transaction because the OP_GROUP would not be balanced
     * Using SIGHASH_SINGLE you have to ensure you don’t need a change address.
     * Not an important use case for adoption, just an interesting and anonymous “auction” method

 * Discussion on how OP_GROUP changes the way transactions are interpreted. 
     * Inside the interpreter the OP_GROUP op code is a NO_OP.
     * Clashes with the idea that script should be script and data is data
 * Discussion on the Bitcoin Cash philosophy
     * Thoughts on delaying features in favor of future code reorganization for the purpose of driving adoption  
     * You have to support old transaction formats forever.
 * Should OP_GROUP be a new transaction version?
     * Requires more changes which need to be sold with the implementation
     * Requires wallet support
         * Cannot be tested without a wallet - BU has a full node + wallet available.
             * https://github.com/gandrewstone/BitcoinUnlimited/tree/opgroup_fullnode
             * https://github.com/gandrewstone/BitcoinUnlimited/tree/opgroup_consensus 
         * 3 Months till Fork Date and 2 months to be fully tested
     * Discussion about other aspects around changing the transaction version
         * Is it limited to OP_GROUP
         * Does it extend to other bugs than could be done with a TX version
         * Do we bump the TX version with the reenabling of old OP_CODES
             * Are there downsides to bump the TX version?
                 * Can’t allow people to use an old TX version that allows the spends of token inputs - OP_GROUP should be a Hard Fork to do this.
             * Advantage is that wallets who do not understand the new version won’t even try vs trying and running into unexpected outcomes
 * Design Policy Discussion regarding the viability of a feature and the work required against its proposed usage (aka, why do the work of adding a feature if no one’s going to use it)
     * Other policies could include explicitly stating we never make a change that could cause the loss of coins.
 * Points raised about new features should always be a Hard Fork
     * Prevents against ability to craft a tx that uses a repurposed NO_OP sent to a wallet that has not been updated, so it understands the output and NO_OPs the input -- Looks like a 0 conf and the wallet accepts it and will never confirm on the blockchain.
 * Discussion around not allowing the repurposing of old op codes especially NO_OPs in future.
     * Ties in with the development design policy discussion.
     * Ties in with the proposal to bump tx version on all Feature adds/Hard Forks
 * How can OP_GROUP interact with smart contracts
     * Compared with Ethereum's address based systems
     * Talk about Bitcoin Covenants
         * Require that an output of an input must follow a set script template
         * Has problems where it can only constrain 1 output
     * The effects OP_GROUP has on the UTXO for all future transactions and smart contracts. It must be accounted for in the future at every step.
 * Talk around the use cases of tokens (Namely OP_GROUP) and their relevance outside of smart contracts
     * Defining ownership
     * Securities
     * Stock Options
     * Tickets to events
     * Teather / Other currencies
     * Mortgages

**( the above are talked about briefly, they are not confirmed one way or the other )**

 * Viability of OP_GROUP tokens for use in ICO’s
 * Idea’s around tokens that
     * Are released over time
     * Can only be issued once
     * Based on a meantime
 * If a version 2 to include the above, consideration needs to be made about the version of OP_GROUP we propose today and how that may change.
 * Comparisons made to the workflow about the old op codes and OP_GROUP.
      * Meeting has become a Question & Answer Session rather than peer review of a specification and code.
      * Concerns the community are not ready to fully understand the changes OP_GROUP would impose.
      * Concerns raised that the understanding needed to deploy OP_GROUP vs provide peer review is not equal and that more parties need provide educated review.
 * Concerns raised about the road map of OP_GROUP moving forward post activation.
     * Discussion on legal concerns
     * Discussion on current & future use cases / edge cases / unforeseen changes
     * Discussion on how OP_GROUP is made functional for the proposed uses today
     * Discussion on how MultiSig will play a role in many use cases
 * Q&A regarding HTLC (Hashed Time Locked Contracts) with 2-2 MultiSig & OP_GROUP state management.
	

# Resolution Proposal


 * Compile a list(s) of workable use cases for OP_GROUP and how they would be implemented with the proposal as it stands to date. 
 * The group needs to be well-informed to curate a viable peer review

# Suggested Further Actions

 * Design Policy Discussion to be taken to the QA workgroup and made an ajenda item