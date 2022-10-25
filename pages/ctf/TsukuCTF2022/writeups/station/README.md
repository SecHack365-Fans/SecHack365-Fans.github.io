---
title: station
description: 駅名を当てる問題
author: task4233
genre: OSINT
solver: 110
point: 382
---

# station

## 問題文
つくし君はとある駅で友達を待っています。さて、つくし君はどこの駅にいるでしょうか？

`TsukuCTF22{駅名(漢字、平仮名、英語可)}`

注意
- 駅名はWebページで公開されている表記を利用してください
- 「駅」という漢字はFlagに含めないでください
- 数字が含まれる場合は全て半角英数字にしてください
- 例えば、六本木一丁目駅が答えなら、TsukuCTF22{六本木1丁目}、TsukuCTF22{ろっぽんぎ1ちょうめ}、TsukuCTF22{Roppongi itchome}が答えになります

提出回数は10回までです。

Mr.Tsukushi waits his friend at a station. Then, where is he?

Flag format is `TsukuCTF22{Station Name(Kanji, Hiragana, or English are available)}`.
Notice: 

- use name published on some websites as a station name
- use half-width alphanumeric characters, if numbers are included
- do NOT include "Station" in submitted flag
- For example, if "Tokyo Station" is an answer, the flag is "TsukuCTF22{東京}", "TsukuCTF22{とうきょう}", or "TsukuCTF22{Tokyo}"

Submissions are limited to 10 times.

## 解法

1. 東豊線と*北線という駅名が見える
2. ググるともう片方は南北線であると分かる
3. 黄色で囲まれた駅が駅名であると推測でき、隣にある駅はバスセンター前か西11丁目しかない
4. 両方入れると当たる
