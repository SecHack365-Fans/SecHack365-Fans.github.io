---
title: park
description: スーパーのロゴ、新幹線等から特定
author: Roin_sec
genre: OSINT
solver: 23
point: 285
---

# park

写真の中からスーパーの建物らしきロゴがある。

![images/image1.png](images/image1.png)

Google検索で「スーパー ロゴ まとめ」等検索し該当のスーパが「サンリブ」ということが分かる。
サンリブは九州・中国地方限定のスーパであることが公式HPから分かる。
写真全体から山に囲まれている都会ということが読み取れ、新幹線が通っていることから場所が絞れてくる。

![images/image3.png](images/image3.png)

GoogleMapを参照しながら見ていくと、ビルの配置等が広島と一致する。
ちなみにスタジアムの存在に気付いていれば、「新幹線 スタジアム」等で検索すれば
マツダスタジアムということが分かり、広島だと判明する。

![images/image2.png](images/image2.png)

あとは新幹線とマツダスタジアムの角度から推測し、Googleマップを3Dにし探索すると
写真に写っている学校らしき建物が「府中町立府中中学校」ということが分かる。
flagはその付近にある公園「瀬戸ハイム第一児童遊園地」だった。

![images/image4.png](images/image4.png)

## TsukuCTF{瀬戸ハイム第一児童遊園地}
