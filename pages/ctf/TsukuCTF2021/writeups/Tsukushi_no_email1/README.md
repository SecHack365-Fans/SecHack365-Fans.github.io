---
title: Tsukushi_no_email1
description: メールアドレスからアイコン情報を取得する問題
author: satoki00
genre: OSINT
solver: 44
point: 100
---

## Tsukushi_no_email1

リンク先に飛ぶと`tsukuctf@gmail.com`がこの CTF のメールアドレスであることがわかる。  
これを用いて Google のログインを途中まで試みると、下のような画面となる。

![images/image1.png](images/image1.png)

アイコン部分に何か表示されているのがわかるので、開発者ツールなどで画像を大きめに表示してやる。

![images/unnamed.jpg](./images/unnamed.jpg)

flag が書かれていた。  
ちなみに[Tsukushi_no_email2](../tsukushi_no_email2)を用いることでも取得できる。

## TsukuCTF{Google_kingdom}
