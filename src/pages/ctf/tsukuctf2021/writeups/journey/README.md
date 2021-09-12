---
title: journey
description: Response StatusとRequest Methodに関する問題
author: task4233
genre: Web
solver: 18
point: 372
---

# journey
## 問題文
色々と試してはいるものの、やはり正しいゴールに辿りつけないんだ。
ゴールに辿りつけばフラグが得られるらしいけど、どうすれば良いんだろう。

フラグの形式: `TsukuCTF{[a-zA-Z0-9_!?.]*}`

## 解法
`/goal` に対して `Referer` に `.../problems/journey/railway/...` となるパスを含めて `CONNECT` メソッドでリクエストを飛ばす。

```bash
curl -H 'Referer: https://tsukuctf.sechack365.com/problems/journey/railway/1' -X CONNECT https://tsukuctf.sechack365.com/problems/journey/goal
```

[GoのSolver](./main.go)

## 解法に至るまでの思考
1. `status`を確認しろと書かれているので、Status Codeを確認すると`Method Not Allowed`になっている
2. `OPTIONS`メソッドで利用可能なメソッドを確認した上で全て試すと、`CONNECT`メソッドの時だけどこから来たの？みたいなことが書かれてる
3. リダイレクト結果に応じて、それっぽいRefererをつけてリクエストする

## 所感
Status Codeとリクエストメソッドについて調べてもらう機会になればと思い作問しました。最終的にやるだけ問題になってしまいましたが、少しでも学びになっていれば幸いです。

## FLAG
```
TsukuCTF{H0w_wa5_y0ur_j0urney?}
```
