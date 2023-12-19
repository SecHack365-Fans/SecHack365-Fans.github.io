---
title: broken display
description: 写真の映り込みを利用してフラグを探す問題
author: hi120ki
genre: osint
solver: 55
point: 471
---

# broken display

## 問題文

表示が壊れているサイネージって、写真を撮りたくなりますよね!

正しく表示されているときに書かれている施設名を見つけて提出してください!

フラグ形式: `TsukuCTF23{◯◯◯◯◯◯◯◯IYA_◯◯◯◯◯◯S}`

## 難易度

Medium

## 解法

1. 写真の映り込みに反転した文字「LOCC ANE」を確認します。
2. Googleで「LOCC ANE」を検索します。すると、ロクシタンという美容品店がヒットします。商業施設の雰囲気から、ロクシタンの店舗があると思われるので、ロクシタンの店舗一覧を確認します。
3. ロクシタンの店舗一覧ページ <https://jp.loccitane.com/on/demandware.store/Sites-OCC_JP-Site/ja_JP/Stores-Find> 内で取得している[店舗情報json](https://jp.loccitane.com/on/demandware.store/Sites-OCC_JP-Site/ja_JP/Stores-GetStores?countryCode=JP&excludeHourList=true)をブラウザの開発者ツールから取得します。
4. この中からIYA終わりの地名・店舗名をCtrl+Fから検索するとルミネ大宮店 東武宇都宮店 西宮阪急店の3つに絞れます。
5. この3つの店舗の周辺情報を画像で確認すると西宮阪急店がガラス張りに面していることがわかります。<https://map.yahoo.co.jp/v2/place/-2aKS0jR0rw>
6. かつGoogle Mapで調べると <https://maps.app.goo.gl/AK1gKFMupGy1JGoM7> 同一建物内に「西宮阪急」「阪急西宮ガーデンズ」が同居している商業施設であることがわかります。
7. フラグ形式の`TsukuCTF23{◯◯◯◯◯◯◯◯IYA_◯◯◯◯◯◯S}`に一致する施設名は「西宮ガーデンズ」で`NISHINOMIYA_GARDENS`となります。
