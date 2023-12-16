---
title: Flash
description: マイコンのフラッシュメモリに残っているWi-Fi接続情報からOSINT
author: labo_4423 & Satoki
genre: OSINT
solver: 26
point: 494
---

# Flash

ESP32 の特徴として Wi-Fi に接続することができます。Wi-Fi の SSID には建物の名前やその一部が用いられることもあるので、とりあえず Wi-Fi の接続情報がないかを調べます。  
バイナリエディタで配布されたデータを開いて"ssid"とかで検索すると`apa-316-2428`という文字列が確認できるので恐らくこれが SSID であることが分かります。
![解](./Flash.png "another")

SSID にはホテル名やその一部が SSID に含まれる可能性を考慮すると"apa"はホテルの名称を表していると推測します。（察しの良い方はこれがアパホテルを示しているということが分かると思います。）  
また"316"、"2428"のどちらかが部屋番号の可能性があり、部屋番号ではない方の数字はホテルの詳細な情報を知る手掛かりになりそうです。そこで`apa 316`とか`apa 2428`で検索をかける。
![解](./apa-316.png "hotel")

すると`apa 316`の検索結果の上位に No.316 アパホテル&リゾート〈両国駅タワー〉がヒットした。
どうやら 316 はホテルのナンバー、2428 は部屋番号のようだ。
形式と一致するので、指定されたとおりに組み合わせると flag となった。

`TsukuCTF22{アパホテル&リゾート〈両国駅タワー〉_2428}`

# 補足

今回は ESP32 開発ボードのフラッシュメモリから読みだしたデータを題材にしました。そのため、OSINT ジャンルですが Hardware の知識がちょこっとだけ必要になります。ESP32 では過去に接続した Wi-Fi の SSID とパスワードがマイコン内のフラッシュメモリに残ります。（なお、今回配布したファイルに書かれているパスワード"dummypswd"はこちらで書き換えたものです。）そのため他人に ESP32(M5stack なども)を貸すときはフラッシュメモリのデータを消去してから貸し出す必要があります。  
私も私物の ESP32 でフラッシュメモリの中身を読み出したら、以前所属していた研究室やサークルの Wi-Fi 接続情報が出てきて懐かしさを覚えました笑  
皆さんも他人にマイコンを貸すときはお気をつけ下さい。

フラッシュメモリの消去、読み出しについては以下のサイトが参考になります。  
https://lang-ship.com/blog/work/esp32-esptool-py/#toc9