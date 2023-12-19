---
title: hunter
description: メールアドレス復元+Googleアカウント調査
author: shio_sa1t
genre: osint
solver: 16
point: 498
---

# hunter
## 問題文
名前をメールで聞こうとしたところ、相手のGmailの一部が分からなくなってしまいました。  
大変お忙しいところ恐縮ですが、暇なときに調査してください。  
`qeinijo#iby#@gmail.com`  
`#`が分からないところです。  
なお、外部サービスに短期間で多くのアクセスをしないようにしてください。  
  
I tried to email you to ask for the name, but I lost track of part of the person's Gmail.  
I apologize for the inconvenience, but please investigate in your space time.  
`qeinijo#iby#@gmail.com`  
`#` is the part I don't understand.  
Please avoid accessing many external services in a short period of time.  

## 難易度
medium

## 解法
GHuntで総当りします。  
ただし、Gmailのメールアドレスには、アルファベットに加えて数字と"."が使えることに注意します。  
詳しくは、solver.pyを参照してください。
