---
title: flower_bed
description: 花壇にあるキューブ上に印刷されているQRコードを読み取る問題
author: task4233
genre: osint
solver: 42
point: 484
---

# flower_bed
## 問題文
花壇の先にQRコードのキューブがあるようですね。友人曰く、モニュメントの近くに配置されているものらしいです。
こちらのQRコードを読み取ると遷移するページのURLを教えてください！リダイレクト前のURLでお願いします！

Flagの形式は `TsukuCTF23{URL}` です。例えば、`https://sechack365.nict.go.jp` がURLなら、 `TsukuCTF23{https://sechack365.nict.go.jp}` が答えになります。

## 難易度
Medium

## 作問にあたって
SECCON Beginners関連で福岡へ行った際に、QRコードのキューブを見つけてOSINT問題に使えると思ったのがきっかけです。貴賓館はライトアップされている姿が綺麗なのでオススメです([ref](https://x.com/subtask4233/status/1718628463534653802))。

## 解法
0. 画像の端から、"Prefectural Civil Hall and" "Official Site" が読み取れる
1. ググると、"旧福岡県公会堂貴賓館" の前にあるモニュメントの側にあるキューブであることが分かる
2. "FUKUOKA モニュメント" でググると、たけほがらさんが投稿した画像からQRコードが読み取れることが分かる(というか、これ以外に読み取れる画像がなかった)([ref](https://lh3.googleusercontent.com/p/AF1QipM7qpnwOfTT7EEbFCcwJbkBHJpNCZpYbO58ltQY=s10000-w10000-h10000))
3. QRコードを読み取ると、公式Webページが表示される[ref](https://www.fukuokaken-kihinkan.jp/)が、QRコードに刻み込まれている文字列はリダイレクト前のHTTPのものなので、そちらを入力すると答え

## コメント
QRコードリーダによっては、自動でリダイレクトされる場合もあるので、HTTPSで提出して

Googleへアップロードされている画像をクエリパラメータを変更することで画像を拡大できるテクを使っている方([ref](https://hackmd.io/@eaint/tsukuctf-2023-writeup#osint---flower_bed-484pt))や、画像をマシンパワーで無理矢理拡張している方がいたのは面白いなと思いました。

そして、QRコードを手入力して復元しようとしていた方([ref](https://tan.hatenadiary.jp/entry/2023/12/12/013838#osint-medium-flower_bed-42-team-solved-484-points))もいましたが、QRコードのデータ部は右下に格納されているので、今回の問題は復元できないのは想定でした。
