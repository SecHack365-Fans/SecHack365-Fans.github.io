---
title: twin
description: pastebinから検索する問題
author: ryusei_ishika
genre: osint
solver: 14
point: 499
---

# twin
## 問題文

ハッカーは独自に収集した大量の個人情報を、とあるWebサイト上で2023年11月23日に投稿した。
我々はこの投稿IDが`KL34A01m`であるという情報を得た。ハッカーのGitHubアカウントを特定せよ。

A hacker posted a large amount of personal information collected independently on a certain web site on November 23, 2023.
We have obtained information that this posting ID is `KL34A01m`. I need you to identify the hacker's GitHub account.

ヒント: このWebサイトは28歳のオランダ人起業家によって2010年代初めに買収されている。

## 難易度

Medium

## 解法

`28 year-old Dutch entrepreneur 2010 hacker`などで検索すると[BBCの記事](https://www.bbc.com/news/technology-17544311)が出てくる。

Pastebinの記事フォーマットは「https://pastebin.com/{記事ID} 」のようになっているため、`https://pastebin.com/KL34A01m`にアクセスすると、Leaked!と書かれた記事が見つかる。
この人が投稿した別のファイルのファイル名"Tsuine"をGitHubで検索すればフラグが出る。

`TsukuCTF23{gemini5612}`
