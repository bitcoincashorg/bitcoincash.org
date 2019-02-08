Bitcoin Cash Avalanche Workgroup Agenda
=======================================

The purpose of this document is to describe the aim of the workgroup, and gather reference materials and links that may be useful.

Aim
---

The aim of the workgroup is to develop specifications, and implementations of Avalanche for both post-consensus and pre-consensus for Bitcoin Cash.

References
----------

BCHD Draft Specification: [Avalanche Pre-consensus Spec](https://github.com/gcash/bchd/blob/avalanche/avalanche/spec.md)

[Avalanche Paper](https://ipfs.io/ipfs/QmUy4jh5mGNZvLkjies1RWM4YuvJh5o2FYopNPVYwrRVGV)

[Surprise Announcement with Emin Gün Sirer - Token Summit III NYC 2018](https://youtu.be/UvJgFaoQs_A)

[Avalanche Consensus Simply Explained](https://youtu.be/3TAgLJHTYRg) by Decentralized Thought

Chris Pacia Avalanche overview article: [The Problems Solved By Avalanche](https://medium.com/@chrispacia/the-problems-solved-by-avalanche-5575a1b0d7bc)

Chris Pacia article on Avalanche for pre-consensus: [Avalanche Pre-Consensus: Making Zeroconf Secure](https://medium.com/@chrispacia/avalanche-pre-consensus-making-zeroconf-secure-ddedec254339)

Antony Zegers article on Avalanche for post-consensus: [Avalanche Post-Consensus: Making Bitcoin Cash Indestructible](https://medium.com/@Mengerian/avalanche-post-consensus-making-bitcoin-cash-indestructible-2464b1ae0382)

Avalanche proof-of-concept demonstration: https://avalanche.bchd.cash/

List of Bitcoin ABC Diffs implementing Avalanche:

- [[avalanche] Create a structure to accumulate avalanche votes](https://reviews.bitcoinabc.org/D2040)
- [[avalanche] Add a block registry and facility to register votes on these blocks.](https://reviews.bitcoinabc.org/D2042)
- [[avalanche] Create an event loop facility.](https://reviews.bitcoinabc.org/D2043)
- [[avalanche] Add a facility to select invs to poll](https://reviews.bitcoinabc.org/D2044)
- [[avalanche] Add support to poll multiple block at once.](https://reviews.bitcoinabc.org/D2121)
- [[avalanche] Report the list of finalized blocks when votes](https://reviews.bitcoinabc.org/D2045)
- [[avalanche] Implement the challenge/response protocol](https://reviews.bitcoinabc.org/D2046)
- [[avalanche] consistently use avanodeid in avalanche's test.](https://reviews.bitcoinabc.org/D2142)
- [[avalanche] Ensure block added to avalanche have the proper acceptance.](https://reviews.bitcoinabc.org/D2117)
- [[avalanche] Enforce cooldown request present in AvalancheResponse](https://reviews.bitcoinabc.org/D2122)
- [[avalanche] Use a multi_index to track request so it is easy to determine which timed out.](https://reviews.bitcoinabc.org/D2137)
- [[avalanche] Make sure the round variable is initialized properly](https://reviews.bitcoinabc.org/D2147)
- [[avalanche] Delegate node management to caller](https://reviews.bitcoinabc.org/D2140)
- [[avalanche] Expire queries once they reached their timeout.](https://reviews.bitcoinabc.org/D2143)
- [[avalanche] Make sure we keep the read lock when reading from VoteRecord](https://reviews.bitcoinabc.org/D2470)
- [[avalanche] Make constant constant](https://reviews.bitcoinabc.org/D2485)
- [[avalanche] Refactor test.](https://reviews.bitcoinabc.org/D2484)
- [[avalanche] Use initializer for VoteRecord](https://reviews.bitcoinabc.org/D2474)
- [[avalanche] Refactor the clearing of timed out requests in its own function](https://reviews.bitcoinabc.org/D2473)
- [[avalanche] Group constants definition together](https://reviews.bitcoinabc.org/D2471)
- [[avalanche] refactor getInvsForNextPoll to limit the scope of cs_main](https://reviews.bitcoinabc.org/D2472)
- [[avalanche] Limit the number of in flight request per item.](https://reviews.bitcoinabc.org/D2486)

BCHD commits implementing Avalanche: https://github.com/gcash/bchd/commits/avalanche
