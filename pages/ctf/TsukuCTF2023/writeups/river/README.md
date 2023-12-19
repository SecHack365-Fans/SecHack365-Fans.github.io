---
title: river
description: Gogle Lensで関連情報を調べる問題
author: mikan45593608
genre: osint
solver: 57 
point: 469
---

# river
## 問題文
弟のたくしから、「ボールが川で流されちゃった」と写真と共に、連絡がきた。
この場所はどこだ?
Flagフォーマットは `TsukuCTF23{緯度_経度}` です。
端数は少数第5位を切り捨てて小数点以下第4位の精度で回答してください。

I received a call "My ball got washed away in the river" with a picture from my younger brother, Takushi
Where is this place?
Flag format is `TsukuCTF23{latitude_longitude}`.
Please answer to the fourth decimal place with fractions rounded down to the fifth decimal place.
 
## 難易度
easy

## 解法
1. Google レンズに画像を投げると、一番最初に[鹿児島の川が増水していることに関するブログ](http://nisshindo.jugem.jp/?eid=9)が出てくる。Google レンズが、このブログを最初に持ってきたのかを考えるために、ブログ内の写真と問題の画像を見比べると、右上に同じような自動車販売店が写っていることを確認できる。
2. ブログの話から、荒田川（中洲通沿）だとわかるので、Googlemapでその付近で「自動車販売」と検索すると、（有）池田自動車販売がヒットする。
3. 上の情報をもとに、撮影場所を推定する。
フラグは、TsukuCTF23{31.575[78]_130.553[34]}

