---
title: tsukushi_no_kuni
description: 筑紫国の歴史問題
author: shio_sa1t
genre: osint
solver: 71
point: 451
---

# tsukushi_no_kuni
## 問題文
かつて、筑紫国を統治していた国造の一人が乱を起こした。
その子孫の一人が、ある天皇と同一人物である説が提唱されている。
その子孫の名前を `TsukuCTF23{}` で囲んで答えよ。

Once upon a time, one of the Kokuzou(国造) who ruled Tsukushi-no kuni(筑紫国) caused a rebellion.
A theory has been proposed that one of his descendants was the same person as a certain emperor of Japan.
Answer by enclosing the name of the descendant in `TsukuCTF23{}`.

## 難易度
easy

## 解法
筑紫国造磐井が乱を起こしている。
その子が、筑紫葛子であることが分かる。
https://note.com/tsukukin/n/n30687554181d より、
その子が、筑紫薩夜麻であることが分かる。
「筑紫薩夜麻 天皇」で検索すると、天武天皇が多くヒットする。
よって、フラグは `TsukuCTF23{筑紫薩夜麻}`
