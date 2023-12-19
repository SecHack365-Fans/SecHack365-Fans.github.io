---
title: fiction
description: VALORANTにおける座標の扱いから調査する問題
author: shio_sa1t
genre: osint
solver: 32 
point: 491 
---

# fiction
## 問題文
「座標を教えてくれ」  
フラグフォーマットは、`TsukuCTF23{緯度_経度}`です。  
小数点以下5位を切り捨てて、小数点以下4桁で答えてください。 

"Give me the coordinates."
The flag format is `TsukuCTF23{latitude_longitude}`.
Round down to 5 decimal places and submit your answer to 4 decimal places.

## 難易度
easy

## 解法
明らかに現実世界じゃないことがすぐ分かる。  
画像検索でVALORANTというゲームのSunsetというマップであることが分かる。   
`valorant coordinate`で調べると、マップごとに座標が決まっていることが分かる。  
Sunsetは`34°2'C" N 118°12'YT" W`であることが分かるが、フラグフォーマットに一致しない。  
調べると、 https://valorant.fandom.com/wiki/Maps#Map_Coordinates からアルファベットが変換できる。  
よって、Sunsetの座標は、`34°2'2" N 118°12'16" W`  
(最初からfandomのSunsetのサイトにヒットするとこの過程はスキップすることも可能)  
座標を変換すると、"34.033889,-118.204444"  
よって、答えはTsukuCTF23{34.0338_-118.2044}  
