---
title: YUUGEN
description: アニメコラボの列車から駅を特定する問題
author: よしみ
genre: OSINT
solver: 47
point: 100
---

# YUUGEN

> とあるアニメのファンである都久志くんはそのアニメのコラボ列車を人目見ようと駅に向かった。しかし、駅は密状態だったため駅構内に入るのを諦めて、駅の外から見ることにしたのであった。
この問題は10回までしか提出できません。
駅名はJR線 駅ナンバリング路線図内に記載されている駅名の英語表記を使用します。
駅名がそのままフラグになります。仮に駅名がKyotoの場合、フラグは TsukuCTF{Kyoto} となります。

12分くらいでした．まずは動画に書かれている`58654`という列車の数字と列車の先頭に書かれている`無限`という文字から以下の記事を見つけます．

[https://raillab.jp/news/article/23622](https://raillab.jp/news/article/23622)

熊本～博多間ということと，問題文の[JR線 駅ナンバリング路線図](http://www.jrkyushu.co.jp/news/__icsFiles/afieldfile/2018/09/28/Newsrelease-ekinumbering.pdf)から鹿児島本線であることがわかります．また，列車の上部に新幹線か高速道路があることがわかります．高速道路にしては狭すぎるので新幹線であるとわかります．新幹線(九州新幹線)と鹿児島本線が並走ではなく上下に交わる点をGoogleMapで下がると[見つかります](https://www.google.com/maps/place/%E3%81%97%E3%81%82%E3%82%8F%E3%81%9B%E3%81%AA%E6%9C%A8%E4%BF%9D%E8%82%B2%E5%9C%92/@33.5675719,130.431937,17.12z/data=!4m8!1m2!2m1!1z6bm_5YWQ5bO257ea5pys57ea!3m4!1s0x354190553d21b349:0xf20253101bce92c1!8m2!3d33.567416!4d130.432478)．ここで，交点をストリートビューで見ると，[奥の建物が一致します](https://www.google.com/maps/@33.5676436,130.4329975,3a,75y,68.37h,103.19t/data=!3m6!1e1!3m4!1sss2bcEsbko2Lb0zZgAQN0g!2e0!7i16384!8i8192)．よって近くの竹下駅がフラグとなります．

```txt
TsukuCTF{Takeshita}
```
