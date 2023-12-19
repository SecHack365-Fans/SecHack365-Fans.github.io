---
title: airport
description: プロペラ機の就航を空港から調査していく問題
author: mikan45593608
genre: osint
solver: 205 
point: 100
---

# airport
## 問題文
つくしくんは、旅の思い出を振り返っていましたが、この写真はどこの空港かわからなくなりました。
ここはどこの空港か教えてくれませんか？
Flagフォーマットは `TsukuCTF23{空港の3レターコード(IATA)}` です。


Mr.Tsukushi was reminiscing about his trip, but he couldn't tell which airport this picture was taken at.
Can you tell me which airport this is?
Flag format is `TsukuCTF23{3 letter code of the airport (IATA)}`.

## 難易度
easy

## 解法
1. 飛行機の確認
ANAのプロペラの機は、[DHC8-Q400](https://www.ana.co.jp/ja/jp/guide/inflight/service/domestic/dhc8-q400/)のみとなっています。
さらに、就航しているのは、新千歳発、名古屋発、伊丹発、福岡発まで絞り込めます。
2. 後ろの背景から特徴を探す
ベルトローダーの後ろに、特徴的な吊り橋が見えます。このヒントを手がかりに、1で絞り込んだ空港+吊り橋で検索します。そうすると、「伊丹空港 + 吊り橋」で、似た橋を見つけることができます。
https://blog.goo.ne.jp/sonenjiku/e/73a532cdec913e77c0d2f1a500cb1423

Flag
``TsukuCTF23{ITM}``
