---
layout: specification
title: Address format for Bitcoin Cash
category: spec
date: 2017-10-13
activation: 1515888000
version: 1.1
---

## Abstract

This document describes CashAddr, a proposed address format to be used on Bitcoin Cash. It is a base 32 encoded format using BCH [[1]](#bch) codes as checksum and that can be used directly in links or QR codes.

This format reuses the work done for Bech32 [[2]](#bip173) and is similar in some aspects, but improves on others.

## Specification

The address is composed of
1. A prefix indicating the purpose or network of the address for compatibility reasons,
2. A separator, always `:`, and
3. A base 32 encoded payload with the destination of the address and a checksum.

### Prefix

The prefix indicates the purpose or network of the address. It guides users into choosing an application and allows applications to verify support. The following prefixes are reserved for the specified address types in the three Bitcoin Cash networks:
* `bitcoincash` for mainnet, 
* `bchtest` for testnet, and 
* `bchreg` for regtest.

The prefix is followed by the separator `:`.

When presented to users, the prefix may be omitted as it is part of the checksum computation. The checksum ensures that addresses on different networks will remain incompatible, even in the absence of an explicit prefix.

### <a name="payload"></a> Payload

The payload is a base 32 encoded stream of data composed of 3 elements:
1. A byte indicating the type of address.
2. A variable number of bytes with address data.
3. A 40 bits checksum.

The following table is used for the encoding.

|     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --: | - | - | - | - | - | - | - | - |
|  +0 | q | p | z | r | y | 9 | x | 8 |
|  +8 | g | f | 2 | t | v | d | w | 0 |
| +16 | s | 3 | j | n | 5 | 4 | k | h |
| +24 | c | e | 6 | m | u | a | 7 | l |

#### Type byte

The type byte's most significant bit is reserved and must be 0. The 4 next bits indicate the type of address (type bits) and the 3 least significant bits (size bits) specify how the data must be interpreted. Although the meaning of the 3 least significant bits depends on the type of address they should always allow the address to be checked for a correct length.

#### Data

The data part really deserves not much explanation as its meaning is dependent on the version field. To keep within the intended use cases, no more than 251 bytes should be encoded in the data component.

#### Checksum

The checksum is a 40 bits BCH codes defined over GF(2^5). It ensures the detection of up to 6 errors in the address and 8 in a row. Combined with the length check, this provides very strong guarantee against errors.

The checksum is computed per the code below:

````cpp
uint64_t PolyMod(const data &v) {
    uint64_t c = 1;
    for (uint8_t d : v) {
        uint8_t c0 = c >> 35;
        c = ((c & 0x07ffffffff) << 5) ^ d;
        
        if (c0 & 0x01) c ^= 0x98f2bc8e61;
        if (c0 & 0x02) c ^= 0x79b76d99e2;
        if (c0 & 0x04) c ^= 0xf33e5fb3c4;
        if (c0 & 0x08) c ^= 0xae2eabe2a8;
        if (c0 & 0x10) c ^= 0x1e4f43e470;
    }
    
    return c ^ 1;
}
````

The checksum is calculated over the following data (list of integers in range 0-31):
1. The lower 5 bits of each character of the prefix (e.g. "bit..." becomes 2, 9, 20, ...).
2. A zero for the separator (5 zero bits).
3. The data by chunks of 5 bits. If necessary, the data is padded to the right with zero bits to complete any unfinished chunk at the end.
4. Eight zeros as a "template" for the checksum.

The 40-bit number returned by PolyMod is split into eight 5-bit numbers (msb first). The payload and the checksum are then encoded according to the provided base 32 character table (see [Payload](#payload)).

To verify a base 32 formatted address, it is split at the colon ":" into prefix and payload. Input data (list of integers) for PolyMod function is assembled from these parts:
1. The lower 5 bits of each characters of the prefix.
2. A zero for the separator (5 zero bits).
3. Each base 32 char of the payload mapped to it's respective number.

If PolyMod returns non-zero, then the address was broken.

The following addresses can be used as test vectors for checksum computation since they have a valid checksum but purposely do not have a valid payload:
 - prefix:x64nx6hz
 - p:gpf8m4h7
 - bitcoincash:qpzry9x8gf2tvdw0s3jn54khce6mua7lcw20ayyn
 - bchtest:spectestnetaddressrealrealaddressqpan2k9lh
 - bchreg:555555555555555555555555555555555555555555555udxmlmrz

## Address types

### P2PKH and P2SH

The addresses for both the Pay-to-PubKey Hash (P2PKH) and Pay-To-Script Hash (P2SH) forms of payment are encoded in the same way. The following table specifies the most significant bits of the type byte, for each form of payment, and the resulting character for easy address recognition.

| Type bits | Character |      Meaning      |
| --------: | :-------: | :---------------: |
|         0 |     q     |       P2PKH       |
|         1 |     p     |       P2SH        |

To allow for more secure hashes, in the future, the size bits are used to specify the size of the hash in bits starting with the original size of 160 bits. The following table specifies how each value of the size bits must be interpreted and the resulting full byte value for each payment address type.

| Size bits | Hash size in bits | P2PKH byte value | P2SH byte value |
| --------: | ----------------: | ---------------: | --------------: |
|         0 |               160 |                0 |               8 |
|         1 |               192 |                1 |               9 |
|         2 |               224 |                2 |              10 |
|         3 |               256 |                3 |              11 |
|         4 |               320 |                4 |              12 |
|         5 |               384 |                5 |              13 |
|         6 |               448 |                6 |              14 |
|         7 |               512 |                7 |              15 |

Encoding the size of the hash in the version field ensures that it is possible to check that the length of the address is correct.

## Error correction

BCH codes allows for error correction. However, it is strongly advised that error correction is not done in an automatic manner as it may cause funds to be lost irrecoverably, if done incorrectly. It may however be used to hint a user at a possible error.

## Uppercase/lowercase

CashAddr addresses should be displayed in lowercase, but uppercase is accepted. A mixture of lowercase and uppercase must be rejected.

Allowing for uppercase ensures that the address can be encoded efficiently in QR codes using the alphanumeric mode [[3]](#alphanumqr).

## Double prefix

In some contexts, such as payment URLs or QR codes, the addresses are currently prefixed with `bitcoincash:`. In these contexts, the address must not be double prefixed.

## Test vectors

### Examples of address translation

The following addresses are given in the legacy and new format.

| Legacy                             | CashAddr                                               |
| :--------------------------------- | :----------------------------------------------------- |
| 1BpEi6DfDAUFd7GtittLSdBeYJvcoaVggu | bitcoincash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a |
| 1KXrWXciRDZUpQwQmuM1DbwsKDLYAYsVLR | bitcoincash:qr95sy3j9xwd2ap32xkykttr4cvcu7as4y0qverfuy |
| 16w1D5WRVKJuZUsSRzdLp9w3YGcgoxDXb  | bitcoincash:qqq3728yw0y47sqn6l2na30mcw6zm78dzqre909m2r |
| 3CWFddi6m4ndiGyKqzYvsFYagqDLPVMTzC | bitcoincash:ppm2qsznhks23z7629mms6s4cwef74vcwvn0h829pq |
| 3LDsS579y7sruadqu11beEJoTjdFiFCdX4 | bitcoincash:pr95sy3j9xwd2ap32xkykttr4cvcu7as4yc93ky28e |
| 31nwvkZwyPdgzjBJZXfDmSWsC4ZLKpYyUw | bitcoincash:pqq3728yw0y47sqn6l2na30mcw6zm78dzq5ucqzc37 |

### Larger test vectors

This table defines test vectors for various addresses with hashes of sizes between 160-512 bits and various prefixes. These test vectors aren't given in legacy address format because the legacy format is limited to payloads of 160 bits.

| Data Size (bytes) | Type | CashAddr | Data (hex) |
| :---------------- | :--- | :------- | :--------- |
|20|0|bitcoincash:qr6m7j9njldwwzlg9v7v53unlr4jkmx6eylep8ekg2|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|20|1|bchtest:pr6m7j9njldwwzlg9v7v53unlr4jkmx6eyvwc0uz5t|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|20|1|pref:pr6m7j9njldwwzlg9v7v53unlr4jkmx6ey65nvtks5|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|24|0|bitcoincash:q9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2ws4mr9g0|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|24|1|bchtest:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2u94tsynr|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|24|1|pref:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2khlwwk5v|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|28|0|bitcoincash:qgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcw59jxxuz|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|28|1|bchtest:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcvs7md7wt|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|28|1|pref:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcrsr6gzkn|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|32|0|bitcoincash:qvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq5nlegake|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|32|1|bchtest:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq7fqng6m6|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|32|1|pref:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq4k9m7qf9|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|40|0|bitcoincash:qnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklv39gr3uvz|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|40|1|bchtest:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklvmgm6ynej|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|40|1|pref:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklv0vx5z0w3|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|48|0|bitcoincash:qh3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqex2w82sl|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|48|1|bchtest:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqnzf7mt6x|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|48|1|pref:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqjntdfcwg|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|56|0|bitcoincash:qmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqscw8jd03f|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|56|1|bchtest:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqs6kgdsg2g|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|56|1|pref:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqsammyqffl|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|64|0|bitcoincash:qlg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mtky5sv5w|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|
|64|1|bchtest:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mc773cwez|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|
|64|1|pref:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mg7pj3lh8|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|

### Undefined types

The following table defines test vectors for various addresses with an undefined type and a payload ranging from 0 to 224 bytes. These test vectors can be used to verify the handling of addresses with unspecified types or assumptions about the address length as it cannot be verified from the type byte.

| Data Size (bytes) | Type | Size | CashAddr | Data (hex) |
| :---------------- | :--- | :--- | :------- | :--------- |
|0|15|0|prefix:0qxsg0rgpa||
|0|15|7|prefix:0uwa85v9fp||
|32|15|0|prefix:0zeuqqwwk0xjclsv4lzljpye09m74gv4darmzluu6g4yxxk5eja92nup8dp7p|B3C001CEB3CD2C7E0CAFC5F904997977EAA1956F47B17F9CD22A431AD4CCBA55|
|32|15|7|prefix:07euqqwwk0xjclsv4lzljpye09m74gv4darmzluu6g4yxxk5eja922n8zkmjh|B3C001CEB3CD2C7E0CAFC5F904997977EAA1956F47B17F9CD22A431AD4CCBA55|
|64|15|0|prefix:0p9l93rdpjunztm99mne67xhtejj5a2eanlj83mg0a7njunwf0ka0raa6ct6f6w42aw23a067gmaa45xwxc5q85tz8p3rhderusc62vp4atp3rk5|4BF2C46D0CB9312F652EE79D78D75E652A7559ECFF23C7687F7D39726E4BEDD78FBDD617A4E9D5575CA8F5FAF237DED68671B1401E8B11C311DDB91F218D2981|
|64|15|7|prefix:0a9l93rdpjunztm99mne67xhtejj5a2eanlj83mg0a7njunwf0ka0raa6ct6f6w42aw23a067gmaa45xwxc5q85tz8p3rhderusc62vpf9plewfm|4BF2C46D0CB9312F652EE79D78D75E652A7559ECFF23C7687F7D39726E4BEDD78FBDD617A4E9D5575CA8F5FAF237DED68671B1401E8B11C311DDB91F218D2981|
|96|15|0|prefix:0z06ttpztfp6ume9d83ppl004mz2mlz6sqp9pmhhds5n248h9fls8t93h4xppaf2kyp29x5fnftldan0m40yw2udjk4ytu0kxjq8t9zanwh5mchjpvzae45m70xc9kw6pfj55376jvj4h6dmt257lvaar5gs3y97wet6|9FA5AC225A43AE6F2569E210FDEFAEC4ADFC5A800250EEF76C293554F72A7F03ACB1BD4C10F52AB102A29A899A57F6F66FDD5E472B8D95AA45F1F6348075945D9BAF4DE2F20B05DCD69BF3CD82D9DA0A654A47DA93255BE9BB5AA9EFB3BD1D11|
|96|15|7|prefix:0706ttpztfp6ume9d83ppl004mz2mlz6sqp9pmhhds5n248h9fls8t93h4xppaf2kyp29x5fnftldan0m40yw2udjk4ytu0kxjq8t9zanwh5mchjpvzae45m70xc9kw6pfj55376jvj4h6dmt257lvaar5gsq7lehjd3|9FA5AC225A43AE6F2569E210FDEFAEC4ADFC5A800250EEF76C293554F72A7F03ACB1BD4C10F52AB102A29A899A57F6F66FDD5E472B8D95AA45F1F6348075945D9BAF4DE2F20B05DCD69BF3CD82D9DA0A654A47DA93255BE9BB5AA9EFB3BD1D11|
|128|15|0|prefix:0p3hj0ygup9txk5nd4dvkr6me839cr44wy5kzpcsgarrqlks4dsysaeup5zvf90e7jfhr8uux7ztcruws04rsvjzvg73x9t5gwyl9sc2htyl8qdzz96mutcjuufmnh54dvh2nfr3kcysn0u65qz75cf9ecqcvk65r9fnj65fy93yem57575lht3gykrp52zx565cmzd5xh4vvfsr769jn3q|63793C88E04AB35A936D5ACB0F5BC9E25C0EB571296107104746307ED0AB6048773C0D04C495F9F493719F9C3784BC0F8E83EA383242623D1315744389F2C30ABAC9F381A21175BE2F12E713B9DE956B2EA9A471B60909BF9AA005EA6125CE01865B541953396A8921624CEE9EA7A9FBAE2825861A2846A6A98D89B435EAC626|
|128|15|7|prefix:0a3hj0ygup9txk5nd4dvkr6me839cr44wy5kzpcsgarrqlks4dsysaeup5zvf90e7jfhr8uux7ztcruws04rsvjzvg73x9t5gwyl9sc2htyl8qdzz96mutcjuufmnh54dvh2nfr3kcysn0u65qz75cf9ecqcvk65r9fnj65fy93yem57575lht3gykrp52zx565cmzd5xh4vvfsxqnxxshr|63793C88E04AB35A936D5ACB0F5BC9E25C0EB571296107104746307ED0AB6048773C0D04C495F9F493719F9C3784BC0F8E83EA383242623D1315744389F2C30ABAC9F381A21175BE2F12E713B9DE956B2EA9A471B60909BF9AA005EA6125CE01865B541953396A8921624CEE9EA7A9FBAE2825861A2846A6A98D89B435EAC626|
|160|15|0|prefix:0p4xy8n9zp62vs767wwwwvu2lumcpfa5a9m5mp7xpevqtzn0vvvw5z6cvyha28dffua2zaj0ekp8l4wp9va3f5j5hn2j5kt803e9srxrkeg0qy9w6p6nfgxh5t76gdlxltsjln69r5ptwd4e894m24k4wp7s6juu9uslym9yltz8cans2zlasq0umkkykcz97v0wdm8f95ffsf6szzf6xxtpju7fnchjjtzfy7dztvpx8xxvy499pfxs2q2ptrrr0gh2p2l0t4|6A621E651074A643DAF39CE7338AFF3780A7B4E9774D87C60E58058A6F6318EA0B58612FD51DA94F3AA1764FCD827FD5C12B3B14D254BCD52A59677C72580CC3B650F010AED07534A0D7A2FDA437E6FAE12FCF451D02B736B9396BB556D5707D0D4B9C2F21F26CA4FAC47C767050BFD801FCDDAC4B6045F31EE6ECE92D129827501093A31961973C99E2F292C49279A25B026398CC254A50A4D05014158C637A|
|160|15|7|prefix:0a4xy8n9zp62vs767wwwwvu2lumcpfa5a9m5mp7xpevqtzn0vvvw5z6cvyha28dffua2zaj0ekp8l4wp9va3f5j5hn2j5kt803e9srxrkeg0qy9w6p6nfgxh5t76gdlxltsjln69r5ptwd4e894m24k4wp7s6juu9uslym9yltz8cans2zlasq0umkkykcz97v0wdm8f95ffsf6szzf6xxtpju7fnchjjtzfy7dztvpx8xxvy499pfxs2q2ptrrr0gdwzg26z3|6A621E651074A643DAF39CE7338AFF3780A7B4E9774D87C60E58058A6F6318EA0B58612FD51DA94F3AA1764FCD827FD5C12B3B14D254BCD52A59677C72580CC3B650F010AED07534A0D7A2FDA437E6FAE12FCF451D02B736B9396BB556D5707D0D4B9C2F21F26CA4FAC47C767050BFD801FCDDAC4B6045F31EE6ECE92D129827501093A31961973C99E2F292C49279A25B026398CC254A50A4D05014158C637A|
|192|15|0|prefix:0p904fe2mf7rdc26x5w7anqaagkgza8dewrzkhhgmpxapl3e3eaymg93me09a9xa5a66nvyentphtdclutq2nlk0dmewun0uq6y0wu8ru2e0d6x8d86mfg5z6j5e42vp33027q0eqn30fs0vwtvwn2rqhm57rcmnjfycw6fn6r535vcqs772qg3dzet79lq0335xh22ddt3dl5zh9gd6gzfqx42sgly7nsvcl75lv6uelt8hzgh72gc7p4qjqks7ukz68af0jkp5lzsukmy3tqt4y0x9w6pfd3dc2vcy80wjpras3gszvkahludu7|4AFAA72ADA7C36E15A351DEECC1DEA2C8174EDCB862B5EE8D84DD0FE398E7A4DA0B1DE5E5E94DDA775A9B0999AC375B71FE2C0A9FECF6EF2EE4DFC0688F770E3E2B2F6E8C769F5B4A282D4A99AA9818C5EAF01F904E2F4C1EC72D8E9A860BEE9E1E3739249876933D0E91A330087BCA0222D1657E2FC0F8C686BA94D6AE2DFD0572A1BA409203555047C9E9C198FFA9F66B99FACF7122FE5231E0D41205A1EE585A3F52F95834F8A1CB6C915817523CC5768296C5B8533043BDD208FB08A2026|
|192|15|7|prefix:0a904fe2mf7rdc26x5w7anqaagkgza8dewrzkhhgmpxapl3e3eaymg93me09a9xa5a66nvyentphtdclutq2nlk0dmewun0uq6y0wu8ru2e0d6x8d86mfg5z6j5e42vp33027q0eqn30fs0vwtvwn2rqhm57rcmnjfycw6fn6r535vcqs772qg3dzet79lq0335xh22ddt3dl5zh9gd6gzfqx42sgly7nsvcl75lv6uelt8hzgh72gc7p4qjqks7ukz68af0jkp5lzsukmy3tqt4y0x9w6pfd3dc2vcy80wjpras3gszv3d6nzg9c|4AFAA72ADA7C36E15A351DEECC1DEA2C8174EDCB862B5EE8D84DD0FE398E7A4DA0B1DE5E5E94DDA775A9B0999AC375B71FE2C0A9FECF6EF2EE4DFC0688F770E3E2B2F6E8C769F5B4A282D4A99AA9818C5EAF01F904E2F4C1EC72D8E9A860BEE9E1E3739249876933D0E91A330087BCA0222D1657E2FC0F8C686BA94D6AE2DFD0572A1BA409203555047C9E9C198FFA9F66B99FACF7122FE5231E0D41205A1EE585A3F52F95834F8A1CB6C915817523CC5768296C5B8533043BDD208FB08A2026|
|224|15|0|prefix:0rgc7srrr5hswp4y250drsxyvxm2ru6yteyxjkg938e8gxwaqxktrr5pup390udy69g82c608n53ly4rs9cvmyaewt77xl320ygurqdc02qmq9nlgvceq7ppde035478szfs446yj4m9x3rf57nzuv0qs0cgvnkudnhylenpe3r0p0ffq0u9cr77usf7d6uh0zlx2ycaw4l2a90l5h9n8ggwpnvrxj23j8elygs0gzf70gw2verzjrpr0h438rlqsccqd6kcfq5m6h5tmw9qdup2fsg3m29tfvp2528qy5ryg4msekfn7jefwcvghqj652jl69j3u3jtk6ne4wwae8209yyjvgnudaar83agjv8k8m8g|D18F40631D2F0706A4551ED1C0C461B6A1F3445E4869590589F27419DD01ACB18E81E06257F1A4D15075634F3CE91F92A38170CD93B972FDE37E2A7911C181B87A81B0167F43319078216E5F1A57C780930AD7449576534469A7A62E31E083F0864EDC6CEE4FE661CC46F0BD2903F85C0FDEE413E6EB9778BE65131D757EAE95FFA5CB33A10E0CD833495191F3F2220F4093E7A1CA6646290C237DEB138FE0863006EAD84829BD5E8BDB8A06F02A4C111DA8AB4B02AA28E02506445770CD933F4B2976188B825AA2A5FD1651E464BB6A79AB9DDC9D4F290926227C6F7A33C7A8|
|224|15|7|prefix:0lgc7srrr5hswp4y250drsxyvxm2ru6yteyxjkg938e8gxwaqxktrr5pup390udy69g82c608n53ly4rs9cvmyaewt77xl320ygurqdc02qmq9nlgvceq7ppde035478szfs446yj4m9x3rf57nzuv0qs0cgvnkudnhylenpe3r0p0ffq0u9cr77usf7d6uh0zlx2ycaw4l2a90l5h9n8ggwpnvrxj23j8elygs0gzf70gw2verzjrpr0h438rlqsccqd6kcfq5m6h5tmw9qdup2fsg3m29tfvp2528qy5ryg4msekfn7jefwcvghqj652jl69j3u3jtk6ne4wwae8209yyjvgnudaar83ag3w3lql4v|D18F40631D2F0706A4551ED1C0C461B6A1F3445E4869590589F27419DD01ACB18E81E06257F1A4D15075634F3CE91F92A38170CD93B972FDE37E2A7911C181B87A81B0167F43319078216E5F1A57C780930AD7449576534469A7A62E31E083F0864EDC6CEE4FE661CC46F0BD2903F85C0FDEE413E6EB9778BE65131D757EAE95FFA5CB33A10E0CD833495191F3F2220F4093E7A1CA6646290C237DEB138FE0863006EAD84829BD5E8BDB8A06F02A4C111DA8AB4B02AA28E02506445770CD933F4B2976188B825AA2A5FD1651E464BB6A79AB9DDC9D4F290926227C6F7A33C7A8|

## References

<a name="bch">[1]</a> https://en.wikipedia.org/wiki/BCH_code

<a name="bip173">[2]</a> https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki

<a name="alphanumqr">[3]</a> http://www.thonky.com/qr-code-tutorial/alphanumeric-mode-encoding
