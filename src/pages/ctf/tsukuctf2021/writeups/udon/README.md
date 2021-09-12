---
title: udon
description: うどんの画像からお店のTwitterを特定する問題
author: shio_sa1t
genre: OSINT
solver: 10
point: 464
---

# udon
Google Lensを使って、検索してみます。
しかし、そのままではヒットしません。

![images/udon_lens.png](images/udon_lens.png)

![images/udon_focus.png](images/udon_focus.png)

範囲を狭くして、カレーうどんに注目することでヒットします。
サイトにアクセスして、お店の名前を特定します。

「えん家 Twitter」で検索して出てきたTwitterアカウントのIDをフラグ形式で囲むとフラグになります。
## TsukuCTF{sanukiudonenya}