---
title: logonly
description: 攻撃ログから辞書を予測する問題
author: satoki00
genre: Web
solver: 31
point: 100
---

# logonly

攻撃ログを見ると複数回の認証試行があることがわかる。  
ステータスコードより 214153 回の失敗の後、214154 回目で認証に成功しているらしい。  
ここで問題文より、Kali Linux の中のツールとファイルを用いていることがわかる。  
さらに、ファイルを使っていることより辞書攻撃と推測する。  
辞書攻撃を行っているため、認証が成功した 214154 行目がパスワードであるとわかる。  
これを Kali Linux 標準搭載の辞書についてすべて試せばよい。  
よく利用される rockyou.txt の 214154 行目を見ると`qwertyuiop[]\\`である。  
これを指定された形式に整形すると flag となった。

## TsukuCTF{qwertyuiop[]\\\\}
