---
title: udon_2023
description: うどんのお店を特定
author: shio_sa1t
genre: osint
solver: 14
point: 499
---

# udon_2023
## 問題文
このうどん、麺だけじゃなく、鶏天も美味しい！！！  
お店の場所を忘れたから、7文字のplus codeで教えて！！！  
フラグフォーマットは、+を含めて`TsukuCTF23{**REDACTED**+**REDACTED**}`  
  
This うどん(udon) is not only good 麺(noodle), but also 鶏天(chicken tempura)!!!  
I forgot where the restaurant is, so give me a 7 letter plus code!!!  
Flag format is `TsukuCTF23{**REDACTED**+**REDACTED**}` (including +)  

## 難易度
hard

## 解法
Google Lensとかに通しても簡単には出ないはずです。*  
まず、問題文の「鶏天」が気になります。  
一般的に、うどんにはかしわ天があることが多いです。  
また、言い方的にもかしわ天が多く、直接入っているのは珍しいです。  
そこで、Google Lensで鶏天をキーワードに入れます。  
特に容器に注目しながら、眺めます。  
そうすると、神田経済新聞が同じような容器に入ったうどんの記事を出しています。  
https://kanda.keizai.biz/photoflash/790/  
どうやらチェーン店のようです。5店舗あります。  
  
ここからは、食べログの写真を見て机の柄から絞っていきます。  
まず、新橋と神田は違いそうです。  
新橋2号店と大門は真ん中の仕切り部分の配置が違います。  
この2つは調味料を上にあげています。  
よって、高田馬場店であることが分かります。  
Google Mapより、plus codeは `PP63+G6 新宿区、東京都` です。
よって、フラグはTsukuCTF23{PP63+G6}です。  
  
\* Google LensでもUber Eatsで容器が異なりますが、他店舗チェーン店のものが出てきます。
https://tb-static.uber.com/prod/image-proc/processed_images/bd55e2571362541f0802b1ce39e82ba3/4218ca1d09174218364162cd0b1a8cc1.jpeg  
鶏天の色や配置、麺などに注目すると同じそうであることが分かります。  
