---
title: tram
description: 写真から駅名を答える
author: iiimiiino
genre: OSINT
solver: 43
point: 100
---

# tram

Google Lens 等を使えば，画像に写っているトラムがプラハ市電であることと，写っている銀行が ČSOB という銀行であることが分かります。  
加えて，トラムの先頭に表示されている数字が路線の番号であることも調べればわかるので，この場所はプラハ市電の 5 系統の駅のいずれかです。google map に路線図と ČSOB の場所を表示するなどの方法でこれらの情報を合わせて考えると，候補になる場所は Anděl と Václavské náměstí と Dlouhá třídaa になります。  
あとは，候補地をそれぞれ[ストリートビュー](https://www.google.com/maps/@50.0721713,14.4038753,3a,45.4y,144.88h,98.64t/data=!3m6!1e1!3m4!1sbCmIxwbtVzU0YL4sImKppQ!2e0!7i13312!8i6656!5m1!1e2)で確認すれば，正解が Anděl であることがわかります。
