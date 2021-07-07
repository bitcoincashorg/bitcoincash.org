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

The prefix indicates the purpose and network of the address. It guides users into choosing an application and allows applications to ensure compatibility. The following prefixes are reserved for the specified address types in the three Bitcoin Cash networks:
* `bitcoincash` for mainnet, 
* `bchtest` for testnet, and 
* `bchreg` for regtest.

The prefix is followed by the separator `:`.

When presented to users, the prefix may be omitted as it is part of the checksum computation. The checksum ensures that addresses on different networks will remain incompatible, even in the absence of an explicit prefix.

### <a name="payload"></a>Payload

The payload is a base 32 encoded stream of data composed of 2 elements:
1. A variable number of bytes with address data.
2. A 40 bits checksum.

<pre>
 data             padding  checksum
+------ ~ -------+--------+---------+
|    N bytes     | P bits | 40 bits |
+------ ~ -------+--------+---------+
</pre>

Since the data is base 32 encoded, the last group of 5 bits may not be complete. In that case a padding of `P` zeros is used. For example, if 2 bytes of data are encoded, 4 bits of padding are added to complete the last group. The data part would be represented by 4 characters and the last character would necessarily be either _q_ or _s_.

The following table is used for the encoding.

|     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --: | - | - | - | - | - | - | - | - |
|  +0 | q | p | z | r | y | 9 | x | 8 |
|  +8 | g | f | 2 | t | v | d | w | 0 |
| +16 | s | 3 | j | n | 5 | 4 | k | h |
| +24 | c | e | 6 | m | u | a | 7 | l |

#### Data

For the three reserved prefixes, the data must encode an output hash has defined bellow (see [Address Types](#addresstypes)). For any other prefix the data component is unspecified. 

To keep within the intended use cases,
* Wallets should always be able to produce an address for one of the specified types, from the encoded data, and
* No more than 251 bytes of data should be encoded.

#### Checksum

The checksum is a 40 bits BCH code defined over GF(2^5). It ensures the detection of up to 6 errors in the address and 8 in a row. Combined with the length check, this provides very strong guarantee against errors.

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

The 40-bit number returned by PolyMod is split into eight 5-bit numbers (msb first). The data and the checksum are then encoded according to the provided base 32 character table (see [Payload](#payload)).

To verify a base 32 formatted address, it is split at the colon ":" into prefix and payload. Input data (list of integers) for PolyMod function is assembled from these parts:
1. The lower 5 bits of each characters of the prefix.
2. A zero for the separator (5 zero bits).
3. Each base 32 char of the payload mapped to it's respective number.

If PolyMod returns non-zero, then the address was broken.

The following addresses can be used as test vectors for checksum computation since they have a valid checksum but purposely do not have a valid payload:
 - bitcoincash:a5a8yrhz
 - bitcoincash:qpzry9x8gf2tvdw0s3jn54khce6mua7lcw20ayyn
 - bchtest:testnetaddress4d6njnut
 - bchreg:555555555555555555555555555555555555555555555udxmlmrz

## <a name="addresstypes"></a>Address types

The first byte of the payload's data is a type byte, identifying both the type of output and the hash size. The remaining data is the hash of the public key, for P2KH, or the hash of the redeem script, for P2SH.

<pre>
 data
+----------------- ~ -------+
 type       hash
+----------+------ ~ -------+
|  1 byte  |    H bits      |
| 0TTTTSSS |                |
+----------+------ ~ -------+

</pre>

The type byte's most significant bit is reserved and must be 0. The 4 next bits indicate the type of address (type bits, `TTTT`) and the 3 least significant bits (size bits, `SSS`) specify the hash size (`H`).

### P2PKH and P2SH

The following table specifies the most significant bits of the type byte, for each form of payment, and the resulting character for easy address recognition.

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

## Application handling

### Error correction

BCH codes allows for error correction. However, it is strongly advised that error correction is not done in an automatic manner as it may cause funds to be lost irrecoverably, if done incorrectly. It may however be used to hint a user at a possible error.

### Uppercase/lowercase

CashAddr addresses should be displayed in lowercase, but uppercase is accepted. A mixture of lowercase and uppercase must be rejected.

Allowing for uppercase ensures that the address can be encoded efficiently in QR codes using the alphanumeric mode [[3]](#alphanumqr).

### Double prefix

In some contexts, such as payment URLs or QR codes, the addresses are currently prefixed with a protocol like `bitcoincash:`. In these contexts, the address must not be double prefixed. Note that the protocol prefix may be different from the address prefix.

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

This table defines test vectors for various addresses with hashes of sizes between 160-512 bits and various prefixes. These test vectors aren't given in legacy address format because the legacy format is limited to _payloads_ of 160 bits.

| Data Size (bytes) | Type | CashAddr | Data (hex) |
| :---------------- | :--- | :------- | :--------- |
|20|0|bitcoincash:qr6m7j9njldwwzlg9v7v53unlr4jkmx6eylep8ekg2|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|20|1|bchtest:pr6m7j9njldwwzlg9v7v53unlr4jkmx6eyvwc0uz5t|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|20|1|bchreg:pr6m7j9njldwwzlg9v7v53unlr4jkmx6eykjwwl3hd|F5BF48B397DAE70BE82B3CCA4793F8EB2B6CDAC9|
|24|0|bitcoincash:q9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2ws4mr9g0|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|24|1|bchtest:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2u94tsynr|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|24|1|bchreg:p9adhakpwzztepkpwp5z0dq62m6u5v5xtyj7j3h2r0sl97am|7ADBF6C17084BC86C1706827B41A56F5CA32865925E946EA|
|28|0|bitcoincash:qgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcw59jxxuz|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|28|1|bchtest:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkcvs7md7wt|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|28|1|bchreg:pgagf7w02x4wnz3mkwnchut2vxphjzccwxgjvvjmlsxqwkc2gykpltt|3A84F9CF51AAE98A3BB3A78BF16A6183790B18719126325BFC0C075B|
|32|0|bitcoincash:qvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq5nlegake|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|32|1|bchtest:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxq7fqng6m6|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|32|1|bchreg:pvch8mmxy0rtfrlarg7ucrxxfzds5pamg73h7370aa87d80gyhqxqtrje0dvj|3173EF6623C6B48FFD1A3DCC0CC6489B0A07BB47A37F47CFEF4FE69DE825C060|
|40|0|bitcoincash:qnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklv39gr3uvz|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|40|1|bchtest:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklvmgm6ynej|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|40|1|bchreg:pnq8zwpj8cq05n7pytfmskuk9r4gzzel8qtsvwz79zdskftrzxtar994cgutavfklvqawfz4na|C07138323E00FA4FC122D3B85B9628EA810B3F381706385E289B0B25631197D194B5C238BEB136FB|
|48|0|bitcoincash:qh3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqex2w82sl|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|48|1|bchtest:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunqnzf7mt6x|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|48|1|bchreg:ph3krj5607v3qlqh5c3wq3lrw3wnuxw0sp8dv0zugrrt5a3kj6ucysfz8kxwv2k53krr7n933jfsunq7uxktf9a|E361CA9A7F99107C17A622E047E3745D3E19CF804ED63C5C40C6BA763696B98241223D8CE62AD48D863F4CB18C930E4C|
|56|0|bitcoincash:qmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqscw8jd03f|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|56|1|bchtest:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqs6kgdsg2g|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|56|1|bchreg:pmvl5lzvdm6km38lgga64ek5jhdl7e3aqd9895wu04fvhlnare5937w4ywkq57juxsrhvw8ym5d8qx7sz7zz0zvcypqspqjrwe2g|D9FA7C4C6EF56DC4FF423BAAE6D495DBFF663D034A72D1DC7D52CBFE7D1E6858F9D523AC0A7A5C34077638E4DD1A701BD017842789982041|
|64|0|bitcoincash:qlg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mtky5sv5w|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|
|64|1|bchtest:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mc773cwez|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|
|64|1|bchreg:plg0x333p4238k0qrc5ej7rzfw5g8e4a4r6vvzyrcy8j3s5k0en7calvclhw46hudk5flttj6ydvjc0pv3nchp52amk97tqa5zygg96mnkv7y5h6|D0F346310D5513D9E01E299978624BA883E6BDA8F4C60883C10F28C2967E67EC77ECC7EEEAEAFC6DA89FAD72D11AC961E164678B868AEEEC5F2C1DA08884175B|

### Unspecified payload

The following table defines test vectors with addresses having an unreserved prefix and a payload containing between 0 and 251 bytes of data. These test vectors can be used to check the correct handling of unreserved prefixes, where the first byte of the data is not specified or required.

| Data Size (bytes) | CashAddr | Data (hex) |
| :---------------- | :------- | :--------- |
|0|prefix:x64nx6hz||
|1|prefix:qqk2qfg002|00|
|1|prefix:pq20wewq3e|08|
|1|prefix:zq8quqy369|10|
|21|prefix:qu89s0hcw808qd87g8d59huh5z46er2ctv4ak05jjh|070E583EF871DE7034FE41DB42DF97A0ABAC8D585B|
|81|prefix:l7xpr5ulv2kwwhm5lefgxa4un9tsg3jd72e2l083gdnalp9ztq0gugh4enzmrm5xkqve87w7es9ff3wrtatx5czzpche7dwj2m7d45unl8myh0dkugc9cjq4e06ks6jutsxcatmjhy|FF8C11D39F62ACE75F74FE528376BC995704464DF2B2AFBCF14367DF84A2581E8E22F5CCC5B1EE86B01993F9DECC0A94C5C35F566A60420E2F9F35D256FCDAD393F9F64BBDB6E2305C4815CBF5686A5C5C|
|161|prefix:llcfm9m8xsdvrnsjut3rr0w3t3kgaghsfy85656hdxu23r08rvp49905993wwvx0zclhdrfutkpvfg0vtc2rnv7gawxslguahrsygpyumlwdx8rma0zw2wv84mfp00k5plk4x8lhg7yyjzsttl69twzsclu2p4re88sp2s20x345mj4a6m9nzr7yxl4lwr4dlmshu84q4jxz8w35lvyu7fxhnc7teahrzg8eyjd3muvxrmyu5jv7j65dme5327yjsvwsa2r2y0|FFF09D9767341AC1CE12E2E231BDD15C6C8EA2F0490F4D535769B8A88DE71B035295F42962E730CF163F768D3C5D82C4A1EC5E1439B3C8EB8D0FA39DB8E044049CDFDCD31C7BEBC4E53987AED217BED40FED531FF74788490A0B5FF455B850C7F8A0D47939E015414F346B4DCABDD6CB310FC437EBF70EADFEE17E1EA0AC8C23BA34FB09CF24D79E3CBCF6E3120F9249B1DF1861EC9CA499E96A8DDE6915789283|
|251|prefix:llx537nu0mevr56rrq04d22lq86u8x2xu97qpqe7fdh9236pfucxmjap28q3a4wjzfnt4xv80artz7phyl5hessxl2jj45pnk55nk93m0cl5d2pdcqsyp9t5r45ne46ftuke9238ncp58t5aw9ec7s7a40wjddgeyqvmw8gd9pdt4axdw4gtyp82kv2xvz628yz3frtse5npvf47m07uqu0c8murcnu4znhja93e3vyzzy050tremfcff8hy3cmzyd2mmehze5dfqmasvjc4dr6ejy5fwjhns8rxmpdmdu8s5r5hfxzu8vhum5fqm7lx7apnyyu3lwjaa5pdz4jjp5sj2z5y86njnvypns8clngnya33tjls6sxh2q46vwm2lfj6jnwhu9rez005ls8vrh2rys|FFCD48FA7C7EF2C1D343181F56A95F01F5C39946E17C00833E4B6E5547414F306DCBA151C11ED5D21266BA99877F46B1783727E97CC206FAA52AD033B5293B163B7E3F46A82DC0204095741D693CD7495F2D92AA279E0343AE9D71738F43DDABDD26B5192019B71D0D285ABAF4CD7550B204EAB314660B4A3905148D70CD261626BEDBFDC071F83EF83C4F9514EF2E96398B082111F47AC79DA70949EE48E3622355BDE6E2CD1A906FB064B1568F599128974AF381C66D85BB6F0F0A0E974985C3B2FCDD120DFBE6F743321391FBA5DED02D156520D21250A843EA729B0819C0F8FCD13276315CBF0D40D7502BA63B6AFA65A94DD7E147913DF4FC|

## References

<a name="bch">[1]</a> https://en.wikipedia.org/wiki/BCH_code

<a name="bip173">[2]</a> https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki

<a name="alphanumqr">[3]</a> http://www.thonky.com/qr-code-tutorial/alphanumeric-mode-encoding