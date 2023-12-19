---
title: free_rider
description: YouruberのHNと動画のタイトルから調査する問題
author: shio_sa1t
genre: osint
solver: 62 
point: 463
---

# annoyance
## 問題文
https://www.fnn.jp/articles/-/608001  
私はこのユーチューバーが本当に許せません！  
この動画を見たいので、元のYouTubeのURLを教えてください。  
また、一番上の画像（「非難が殺到」を含む）の再生位置で指定してください。  
フラグフォーマットは、`TsukuCTF23{https://www.youtube.com/watch?v=**REDACTED**&t=**REDACTED**s}`  

https://www.fnn.jp/articles/-/608001  
I really can't stand this YouTuber!  
I would like to watch this video, so please tell me the original YouTube URL.  
Also, please specify the playback position of the top image (including 「非難が殺到」).  
Flag format is `TsukuCTF23{https://www.youtube.com/watch?v=**REDACTED**&t=**REDACTED**s}`

## 難易度
easy

## 解法
まず、画像検索により、YouTuberが"Fidias"であることが分かり、  
"I Travelled Across Japan For Free!"というタイトルの動画であることが分かる。  
削除はされているものの、埋め込まれた動画やSNSなどで?v=の部分が分かる。  
例えば、https://mustsharenews.com/youtuber-japan-without-paying/  
次に、削除されているためWayback Machineで見つけて、動画を見る。  
該当箇所が2:56であることが分かるため、&t=176sを追加すれば良い。  
