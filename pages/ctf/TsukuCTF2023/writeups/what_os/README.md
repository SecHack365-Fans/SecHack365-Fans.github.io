---
title: what_os
description: uidsや1971年のcalコマンドから特定する問題
author: Wagahaiha_toto
genre: misc
solver: 174 
point: 201
---

# what_os
## 問題文
とある研究所から、昔にシェル操作を行った紙が送られてきた来たんだが、
なんのOSでシェルを操作しているか気になってな。
バージョンの情報などは必要ないから、OSの名前だけを教えてくれないか？

にしても、データとかではなく紙で送られて来たんだ。一体何年前のOSなんだ。。。

送られてきた紙をダウンロードして確認してほしい。

## 難易度
easy

## 解法
以下のヒントを元に導き出す。
- 紙で送られてきたということは、タイプライターで入力されている。このことからかなり前のOSである想像できる。
- uidsの中に、kenとdmrというユーザーがいる。これは、UNIXを開発したKenneth Lane ThompsonとDennis MacAlistair Ritchieのユーザー名である。これからUNIXと想像できる。
- 1971年はUNIXのversion1が開発された年である。「1971 OS」などと調べるとUNIXと出てくる。
- version1 UNIXはGithub上に公開されており、ソースコードのファイル名を確認することができる。
  - https://github.com/dspinellis/unix-history-repo/tree/Research-V1

