---
title: Login1
description:  or 1= 1 ; --
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
> ※ この問題では/problems/login以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3がセットでSQL injectionの問題になっています。
Login1 は一番基本的なSQL injectionで、SQL injectionという攻撃を知っているか? という問題でした。
Usernameに``` ' or 1=1 ; -- ```(末尾に半角スペースが必要)を指定することで不正ログインができます。

SQL injectionを知らない方は、IPAが公開している[安全なSQLの呼び出し方](https://www.ipa.go.jp/files/000017320.pdf)や、SecHack365のトレーナーも執筆している[セキュリティコンテンストチャレンジブック](https://book.mynavi.jp/ec/products/detail/id=42421)の第4章などを読んでみてください。どちらも日本語です。