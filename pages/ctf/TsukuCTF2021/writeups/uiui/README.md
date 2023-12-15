---
title: uiui
description: マルウェアスキャンからの情報流出
author: satoki00
genre: OSINT
solver: 18
point: 372
---

# uiui

一般にマルウェア検体は`infected`のパスワード付き zip で送信されることが多い。  
「検体　 zip 　パスワード」で検索するといろいろと情報が出てくるので試せばよい。  
ちなみに総当たりや辞書でも解けると思われる。  
解凍したファイルを調査すると ELF であることがわかるので、[VirusTotal](https://www.virustotal.com)でスキャンする。  
すると以下のように以前にスキャンした結果が表示される。  
![images/image1.png](images/image1.png)  
スキャンされたファイル名が flag だった。

## TsukuCTF{Careless_uploading_is_dangerous}
