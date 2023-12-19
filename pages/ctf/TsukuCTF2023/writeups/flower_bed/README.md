---
title: flower_bed
description: 花壇の先にQRコードのキューブある
author: task4233
genre: osint
solver: 42
point: 484
---

# flower_bed
## 問題文
花壇の先にQRコードのキューブがあるようですね。友人曰く、モニュメントの近くに配置されているものらしいです。
こちらのQRコードを読み取ると遷移するページのURLを教えてください！リダイレクト前のURLでお願いします！

Flagの形式は `TsukuCTF23{URL}` です。例えば、`https://sechack365.nict.go.jp` がURLなら、 `TsukuCTF23{https://sechack365.nict.go.jp}` が答えになります。

## 難易度
Medium

## 解法
0. 画像の端から、"Prefectural Civil Hall and" "Official Site" が読み取れる
1. ググると、"旧福岡県公会堂貴賓館" の前にあるモニュメントの側にあるキューブであることが分かる
2. "FUKUOKA モニュメント" でググると、たけほがらさんが投稿した画像からQRコードが読み取れることが分かる(というか、これ以外に読み取れる画像がなかった)

一応、guessで旧福岡県公会堂貴賓館のURLを入れても当たる。