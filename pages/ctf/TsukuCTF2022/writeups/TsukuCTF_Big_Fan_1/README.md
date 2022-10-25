---
title: TsukuCTF Big Fan 1
description: Twitter IDを特定し、登録日を求める
author: ryusei_ishika
genre: OSINT
solver: 36
point: 488
---

# TsukuCTF Big Fan 1

調査対象者は「I watch everything at TsukuCTF in real time!」と投稿しているので、TwitterのTsukuCTF([@tsukuctf](https://twitter.com/tsukuctf))のフォロワーを確認する。すると、同じアイコンのTwitterIDを特定できる([@SuperProStalker](https://twitter.com/SuperProStalker))。

次にアカウント登録日を求めるが、これはいくつかのツールを用いるとよい([Twitter歴チェッカー](https://lab.syncer.jp/Tool/Twitter-Start-Date-Checker/)など)。

注: wayback macchineに「Twitter始めました」というツイートが[あるが](https://web.archive.org/web/20220917064023/https://twitter.com/SuperProStalker)、その日はアカウント作成日ではない。
