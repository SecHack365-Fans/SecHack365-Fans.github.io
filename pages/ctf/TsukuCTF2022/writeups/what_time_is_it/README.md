---
title: what_time_is_it
description: 電車の発車時刻を推測します
author: shiosa1t
genre: OSINT
solver: 25
point: 495
---

# what_time_is_it

まず、ここが徳島駅であることを特定します。  
Google Map より、2,3,4 番線に電車が停車していることが分かります。

また、画像にある手前の電車が特急「うずしお」であることが分かります。  
Wikipedia によると、「うずしお」の車両には種類があり、色が異なります。  
画像にある手前の電車は 2600 系気動車であり、1・8・11・14・17・20・23・26 号で運行していることが分かります。  
https://ja.wikipedia.org/wiki/%E3%81%86%E3%81%9A%E3%81%97%E3%81%8A_(%E5%88%97%E8%BB%8A)

時刻表より、徳島駅を出発するのは 8 号・14 号・20 号・26 号の偶数号のみです。
https://www.jr-shikoku.co.jp/01_trainbus/jikoku/pdf/tokushima.pdf

提出回数は 5 回までなので、それらのうずしおの発車時刻を提出することで解くことができます。  
また、電車が 3 つ止まっているという状況から 20 号・26 号の方が可能性として高いということも考えられます。
