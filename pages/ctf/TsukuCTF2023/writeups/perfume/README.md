---
title: perfume
description: Goole Lensで調べる問題
author: Wagahaiha_toto
genre: osint
solver: 175 
point: 198
---

# perfume
## 問題文
とある施設でいろいろな香水を見かけたが、施設の場所が思い出せない。 この施設の場所を調べ、教えてほしい。  

フラグは`TsukuCTF23{緯度_経度}`であり、小数点第三桁まで有効である。  

## 難易度
easy

## 解法
1. 写真をGoogle Lensへかける。
2. Googole Lensでは全体にフォーカスがあっていると、どの施設であるか一意にわからない。
![Google Lens](img/perfume_lens.png)
3. エジプトの香水にフォーカスをして、Google Lensをかけると「大分香りの博物館」であることがわかる。
![Google Lens](img/perfume_ans.png)

