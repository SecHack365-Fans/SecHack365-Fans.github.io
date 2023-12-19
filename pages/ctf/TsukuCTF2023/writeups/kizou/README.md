---
title: kiZOU
description: 沖縄のシーサーの寄贈者を調べる
author: ryusei_ishika
genre: osint
solver: 135
point: 321
---

# kiZOU
## 問題文
ここは日本で一番のリゾート地!少し歩くと目の前に素敵な像が見えたから写真を撮ったつもりだったんだけど、見返したら端っこしか写ってない!困ったなぁ、この像についてもっと知りたかったんだけどなぁ。僕の代わりにこの像について調べてくれないか?
フラグ形式は `TsukuCTF23{像を寄贈した人物の名前}` です。

This is the best resort in Japan! I took a picture when I saw the nice statue in front of me. However, I noticed only the edge is in the picture. So, could you please investigate for the statue instead of me.
The flag format is `TsukuCTF23{the person name who donated the statue}`.

## 難易度

Medium

## 解法

![kizou](image.jpg)

1. 画像の右上あたりにau Style NAHAが書かれています。那覇市であることがわかります。
2. Googleストリートビューで像を確認しますが、解像度が低いため識別できません
3. au Style NAHAの公式Instagramから像をしっかり確認でき、シーサーだと分かります。
(instagram: aunaha_okinawa https://www.instagram.com/p/CFZOZGnjNN7/)
4. 像の部分を切り取ってGoogle Lensにかけると、周囲のタイルなどの情報から同一である可能性が高いものをいくつか見つけることができ、伊波測量登記事務所のサイトでパレットくもじ前のシーサーであることが分かります。(http://w1.nirai.ne.jp/mabu05/index.html)
5. 「パレットくもじ シーサー」と検索すると、色々出てきますなかなか情報にたどり着けませんが、この銅像を製作・修理・修復したと思われる会社のサイトから久茂地パレット シーサーという名称であることも分かります。(http://www.yotsui.co.jp/works064.htm)
6. このワードで検索とあるツイートが出てきます。(https://twitter.com/kintaro11111/status/1082234341361504256)
   1. > 1991年那覇市政70周年に上原清善氏が寄贈されたシーサーです。

`TsukuCTF23{上原清善}`