---
title: TORItsukushi
description: テキストファイルのつくしをとりつくす問題
author: ryusei_ishika
genre: Misc
solver: 90
point: 100
---

# TORItsukushi

> 文字列 `TSUKUSHI` を可能な限り何度も取りつくしてください。残った文字列がフラグです。またフラグの部分文字列に `TSUKUSHI` は含まれていません。

単純に `TSUKUSHI` を取り除けば良いです。ただし， `TSUTSUKUSHIKUSHI` のような入れ子構造になっている文字も削除することと，大文字小文字を区別する必要があります．

```py
with open("many_tsukushi.txt") as f:
    tsukushi = f.read()

while True:
    before_tsukushi = tsukushi
    after_tsukushi = before_tsukushi.replace("TSUKUSHI", "")
    if before_tsukushi == after_tsukushi:
        break
    tsukushi = after_tsukushi

print(tsukushi)
```

```txt
TsukuCTF{Would_you_like_some_fresh-baked_Tsukushi?}
```
