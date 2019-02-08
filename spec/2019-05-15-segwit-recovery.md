In-Progress Segwit Recovery Draft Specification
===============================================

Prior to the [November 2018 upgrade](2018-nov-upgrade.md), miners were able to recover coins accidentally sent to segwit P2SH addresses. These P2SH addresses have a two-push redeem script that contains no signature checks, and they were thus spendable by any miner (though not spendable by normal users due to relay rules). In practice, such coins were sometimes recovered by the intended recipient with the help of miners, and sometimes recovered by anonymous miners who simply decided to assert ownership of these anyone-can-spend coins.

In November 2018, the CLEANSTACK consensus rule was activated, with the intent of reducing malleability mechanisms. This had the unfortunate side effect of also making these segwit scripts *unspendable*, since attempting to spend these coins would always leave two items on the stack.

Starting in May 2019, an exemption to the CLEANSTACK rule will be made:

<Details to be provided>
