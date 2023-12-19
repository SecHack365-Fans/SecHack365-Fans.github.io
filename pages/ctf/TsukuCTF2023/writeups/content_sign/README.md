---
title: content_sign
description: C2PAを使った画像の署名者と署名時刻を特定する
author: 7aru7aru
genre: misc
solver: 45
point: 481
---

# content_sign
## 問題文

どうやら、この画像には署名技術を使っているらしい。この署名技術は、画像に対しての編集を記録することができるらしい。署名技術を特定し、改変前の画像を復元してほしい。 Flag形式はTsukuCTF23{<一個前に署名した人の名前>&<署名した時刻(ISO8601拡張形式)>}です。例えば、一個前に署名した人の名前は「Tsuku」で、署名した時刻が2023/12/09 12:34:56(GMT+0)の場合、フラグはTsukuCTF23{Tsuku&2023-12-09T12:34:45+00:00}です。なお、タイムゾーンはGMT+0を使用してください。

It seems this image is applied digital signature, which can record edit history for an image.
Identify the technology and restore the raw image, which means the image before revised.

The flag format is TsukuCTF23{<the name of the previous signing person>&<signed time(ISO8601 extended format)>}

## 難易度

medium

## 解法
exiftool -verbose signed_flag.png
上記コマンドを叩くと、下記のような出力が返ってくる。

``````
PNG IHDR (13 bytes):
[BinaryData directory, 13 bytes]
| ImageWidth = 3024
| ImageHeight = 4032
| BitDepth = 8
| ColorType = 2
| Compression = 0
| Filter = 0
| Interlace = 0
PNG caBX (215410 bytes):
PNG pHYs (9 bytes):

[BinaryData directory, 9 bytes]
| PixelsPerUnitX = 3827
| PixelsPerUnitY = 3827
| PixelUnits = 1
``````

これは、PNGのチャンクを表している。
caBXというチャンクに215410 bytesの情報が格納されていることが分かるが、どのような情報が書き込まれているかが分からない。

そこで、google検索で`"caBX" chunk`と検索すると[C2PA Technical Specification](https://c2pa.org/specifications/specifications/1.3/specs/_attachments/C2PA_Specification.pdf)という技術仕様がヒットする。これを軽く眺めると、画像の変更履歴を記録できる署名技術であることが分かる。
問題の画像はおそらくこれを使っていることを推測できる。

C2PAを扱うためのツールをgithubで検索すると

https://github.com/contentauth/c2patool
上記ツールがヒットする。これを手順に従ってインストールし、`c2patool signed_flag.png `
を実行すると、caBXの情報が出力される。

timeを見て一番古い時刻が、2023-12-08T13:00:26+00:00であることがわかり
署名した名前が、TSUKU4_IS_H@CKERであることがわかる。

TsukuCTF23{TSUKU4_IS_H@CKER&2023-12-08T13:00:26+00:00}

