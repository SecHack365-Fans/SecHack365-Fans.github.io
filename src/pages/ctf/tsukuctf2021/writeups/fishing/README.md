---
title: fishing
description: 釣り場の画像から場所を特定する問題
author: shio_sa1t
genre: OSINT
solver: 77
point: 100
---

# fishing
画像に何か有名そうなものがないか探します。
よく見ると、左に特徴的な橋が映っています。

![images/fishers_bridge.png](images/fishers_bridge.png)

東京ゲートブリッジを知っていれば、すぐに分かります。
知らなくても、「橋 有名」で検索したり、画像検索したりすることで分かります。

![images/fishers_google.png](images/fishers_google.png)

「東京ゲートブリッジ 釣り場」で検索して出てきた公園の名前をフラグ形式で囲むと、フラグになります。
なお、「江東区若狭公園」は「若狭海浜公園」と正確には違うので、答えにはしていません。

## TsukuCTF{若洲海浜公園}