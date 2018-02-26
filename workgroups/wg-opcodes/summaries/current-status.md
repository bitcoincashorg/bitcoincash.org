# Metadata

Title:            Current Status of OpCodes Workgroup
Workgroup:        OpCodes
Document Version: 1.0

# Document Purpose

This document is intended to provide a single source of truth of the status of ongoing op codes
discussions relative to the upcoming hardfork. Any discussions not related to the latest upcoming
fork will be referenced and postponed until the next hardfork or removed entirely if the discussion
is in a complete form and no spec is planned to be proposed. Implementation details or specs of
particular op codes is out of scope of this document, however they will be referenced.

# Current Status of OpCodes

## OpCodes agreed upon for the next upcoming hard fork (May 2018)

May 2018 hard fork spec proposal (for reference): https://github.com/bitcoincashorg/spec/pull/53/files

OP_AND
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_BIN2NUM
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_CAT
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_DIV
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_MOD
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_NUM2BIN
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_OR
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_SPLIT
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files
OP_XOR
 * Spec proposed: https://github.com/bitcoincashorg/spec/pull/54/files

## OpCodes Under Discussion or Previously Discussed

OP_DATASIGVERIFY
 * Spec and implementation proposed, but not agreed upon.  See: https://github.com/shadders/uahf-spec/pull/6/files
OP_GROUP
 * Original proposal: https://medium.com/@g.andrew.stone/bitcoin-scripting-applications-representative-tokens-ece42de81285
 * BUIP 077: https://github.com/BitcoinUnlimited/BUIP/blob/cd0763223fb79b0388b7d307bf4b2acdb9fc9a56/077.mediawiki
 * Requirements proposed: https://www.yours.org/content/on-representative-tokens--colored-coins--bb7a829b965c/
 * Consensus-only implementation proposed: https://github.com/gandrewstone/BitcoinUnlimited/commits/opgroup_consensus
 * Full implementation proposed: https://github.com/gandrewstone/BitcoinUnlimited/commits/opgroup_fullnode
 * Discussion regarding the proposed implementation and requirements: https://www.yours.org/content/response-to-op_group-criticism-d088a7f1e6ad/
OP_INVERT
 * Discussion differed to Nov 2018 hard fork to limit the May 2018 hard fork scope.
OP_MUL
 * Discussion differed to Nov 2018 hard fork to limit the May 2018 hard fork scope.
OP_REPEAT
 * No present use case.  Might consider in the future if required.
 * Meeting notes: https://github.com/bitcoincashorg/workgroups/blob/master/wg-opcodes/summaries/20180207%20-%20Meeting%20Summary.md
OP_ZEROES, OP_PADLEFT, OP_PADRIGHT, and similar
 * Not needed, as it can be achieved by using OP_REPEAT or OP_NUM2BIN
 * Meeting notes: https://github.com/bitcoincashorg/workgroups/blob/master/wg-opcodes/summaries/20180207%20-%20Meeting%20Summary.md

