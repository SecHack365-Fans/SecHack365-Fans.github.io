---
title: laser
description: レーザーの光源の座標を答える問題
author: shio_sa1t
genre: osint
solver: 83 
point: 433
---

# laser
## 問題文
光源の座標を正確に教えてください。  
フラグフォーマットは、`TsukuCTF23{緯度_経度}`です。
小数点以下5位を切り捨てて、小数点以下4桁で答えてください。  

Please tell me the exact coordinates of the light source.
The flag format is `TsukuCTF23{latitude_longitude}`.
Round down to 5 decimal places and submit your answer to 4 decimal places.

## 難易度
easy

## 解法
Google Lensで調べると、阪神百貨店から出ていることがすぐに分かる。
`阪神百貨店 レーザー`で調べると、梅田換気塔から出ていそうなことが分かる。
梅田換気塔をGoogle Mapで調べるとレーザーが出ているところが正確に分かる。
