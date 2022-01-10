---
title: Tsukushi_no_email2
description: メールアドレスからカレンダー情報を取得する問題
author: satoki00
genre: OSINT
solver: 40
point: 100
---

# Tsukushi_no_email2

[Tsukushi_no_email1](../tsukushi_no_email1)から`tsukuctf@gmail.com`がこの CTF のメールアドレスであることがわかる。  
Google の情報を取得したい場合以下のツールを使用することが多い。  
GHunt  
[https://github.com/mxrch/GHunt](https://github.com/mxrch/GHunt)  
ここにメールアドレスを入れると次のような出力となる。  
![images/image1.png](images/image1.png)  
なにか予定があることがわかる。  
![images/image2.png](images/image2.png)  
カレンダーを出力された URL から見ると flag が書かれていた。

## TsukuCTF{Horsetail_is_delicious}
