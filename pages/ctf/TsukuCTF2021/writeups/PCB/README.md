---
title: PCB
description: 基板製造データの漏洩
author: よしみ.
genre: Hardware
solver: 29
point: 152
---

# PCB

プリント基板を発注するとき製造データを zip ファイルにまとめて製造会社に渡すことが多い。与えられた zip ファイルを基板設計ソフト(KiCAD,Eagle など)で開いて確認 or[基板製造会社のガーバービュー](https://www.seeedstudio.com/fusion_pcb.html)とかに突っ込むと基板のレイアウトがみれる。  
レイアウト表面には LED を差してはんだする部分（D3 ～ D13）が配線で結ばれている。よって D3 ～ D13 を星、配線を星座を結ぶ線とみなすとはくちょう座（CYGNUS）にみえることがわかる。

![images/image1.png](images/image1.png)

ちなみに、裏面には抵抗をはんだづけする部分(R3 ～ R13)があり、R と D で同じ番号のものは直列に繋がっているが(ex.D3 と R3 直列接続)、抵抗の大きさは一律ではない。これははくちょう座を構成する星の等級の大小を表すヒントだったり（お気づきになられた方はいたら嬉しいです...）

![images/image2.png](images/image2.png)

## TsukuCTF{CYGNUS}
