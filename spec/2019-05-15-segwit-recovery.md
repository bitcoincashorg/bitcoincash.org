In-Progress Segwit Recovery Draft Specification
===============================================

## Motivation
Prior to the [November 2018 upgrade](2018-nov-upgrade.md), miners were able to recover coins accidentally sent to segwit P2SH addresses. These P2SH addresses have a two-push redeem script that contains no signature checks, and they were thus spendable by any miner (though not spendable by normal users due to relay rules). In practice, such coins were sometimes recovered by the intended recipient with the help of miners, and sometimes recovered by anonymous miners who simply decided to assert ownership of these anyone-can-spend coins.

In November 2018, the CLEANSTACK consensus rule was activated, with the intent of reducing malleability mechanisms. This had the unfortunate side effect of also making these segwit scripts *unspendable*, since attempting to spend these coins would always leave two items on the stack.

Starting in May 2019, an exemption to the CLEANSTACK rule will be made, allowing transactions spending segwit P2SH coins to be once again included in blocks.

## Requirement
A transaction input that:
1. spends a P2SH coin; and
2. the scriptSig only pushes the redeem script onto the stack; and
3. the redeem script is a valid witness program: a 1-byte push opcode (for 0 to 16) followed by a data push between 2 and 40 bytes in minimal form;

shall be exempted from the CLEANSTACK rule under the consensus rules to be activated in May 2019.

## Examples

Valid scriptSig recovering a P2SH-P2WPKH coin:

    scriptSig='160014fcf9969ce1c98a135ed293719721fb69f0b686cb'
 
Valid scriptSig recovering a P2SH-P2WSH coin:

    scriptSig='220020fc8b08ed636cb23afcb425ff260b3abd03380a2333b54cfa5d51ac52d803baf4'
