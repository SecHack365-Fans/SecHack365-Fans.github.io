---
title: Login1
description: or 1= 1 ; --
author: FullteaOfEEIC
genre: Web
solver: 79
point: 100
---

# Login 1

> これは筑紫君が運営する会員制サイトです。こっそり覗いてみましょう。
>
> https://tsukuctf.sechack365.com/problems/login
>
> ※ この問題では/problems/login 以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3 がセットで SQL injection の問題になっています。
Login1 は一番基本的な SQL injection で、SQL injection という攻撃を知っているか? という問題でした。
Username に`' or 1=1 ; --`(先頭・末尾に半角スペースが必要)を指定することで不正ログインができます。

SQL injection を知らない方は、IPA が公開している[安全な SQL の呼び出し方](https://www.ipa.go.jp/files/000017320.pdf)や、SecHack365 のトレーナーも執筆している[セキュリティコンテンストチャレンジブック](https://book.mynavi.jp/ec/products/detail/id=42421)の第 4 章などを読んでみてください。どちらも日本語です。
