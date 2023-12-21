---
title: tsukushi_estate
description: つくし不動産が扱う物件を特定する問題
author: task4233
genre: osint
solver: 165
point: 232
---

# tsukushi_estate
## 問題文
つくし君が写真に写っているビルにオフィスを構えたいらしいのだけど、築年数が少し心配......
つくし君の代わりに調査してください！

Flagの形式は `TsukuCTF23{築年_月}` です。
例えば、2022年3月に出来たビルであれば、 `TsukuCTF23{2022_03}` になります。

## 難易度
Easy

## 作問にあたって
セキュリティ・ミニキャンプの講師をしに行って、現地でお散歩している際に "つくし" という看板を見つけたので思わず撮影してしまいました。外部サイトにアクセスが集中することも危惧したのですが、外部の物件サイトにも掲載されていたために今回は出題しました。

## 解法
0. 合同会社つくし不動産でググる
1. 賃貸物件を見る([ref](https://www.tsukushifudousan.jp/kasi-office/mie/result/))
2. テナントの画像を見ていると、よく似た看板があるページが見つかる([ref](https://www.tsukushifudousan.jp/kasi-office/detail-63aa82d3e3431635bd92d7da/))

## コメント
想定通りに解いていた方が多かったです。

もう少し描画範囲を削っても良いかなと思いました。
