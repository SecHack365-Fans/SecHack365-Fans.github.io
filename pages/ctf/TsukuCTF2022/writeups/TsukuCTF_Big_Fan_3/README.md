---
title: TsukuCTF Big Fan 3
description: Wayback MachineとTwitterを用いたOSINT
author: ryusei_ishika
genre: OSINT
solver: 18
point: 498
---

# TsukuCTF Big Fan 3

このツイートの先に個人情報が含まれていると判断します。
[https://twitter.com/SuperProStalker/status/1571273887371120640](https://twitter.com/SuperProStalker/status/1571273887371120640)

しかし、元ツイートは削除されています。
[https://twitter.com/yJRXaCh4M5aRTk0/status/1571273659335184384](https://twitter.com/yJRXaCh4M5aRTk0/status/1571273659335184384)

wayback machineで元ツイートを見つけます。
[https://web.archive.org/web/20220917230409/https://twitter.com/yJRXaCh4M5aRTk0/status/1571273659335184384](https://web.archive.org/web/20220917230409/https://twitter.com/yJRXaCh4M5aRTk0/status/1571273659335184384)

このような行がたくさんあるCSVファイルのURLを取得できました。
[hxxps://drive.google.com/drive/folders/1sal6kj0OrsO7Xu-gQZeBFjYOm-kAtuns?usp=sharing](https://drive.google.com/drive/folders/1sal6kj0OrsO7Xu-gQZeBFjYOm-kAtuns?usp=sharing)

```txt
笹本 健司,33,1987/10/25,Male,O,sasamoto_1025_21538534@yahoo.co.jp,090-3226-5534,110-0439,株式会社GEN
...
```

[このツイート](https://twitter.com/SuperProStalker/status/1581681692242477059)から、メールアドレスの一部を取得することができます(`by*******@****.**m`)。

CSVファイルからこの形式のメールアドレスを検索すると、`byucraglar5r7nzx3np9@gmail.com`が一致します。

```txt
田川 ヒロシ,41,1980/01/10,Male,A,byucraglar5r7nzx3np9@gmail.com,090-9040-2901,185-4532,株式会社TSHSU
```

よって生年月日は`1980/01/10`です。

## TsukuCTF22{1980/01/10}
