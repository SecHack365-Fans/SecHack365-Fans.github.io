---
title: mab
description: 使用しているレンタルサーバを特定する
author: ryusei_ishika
genre: osint
solver: 166
point: 228
---

# mab
## 問題文

`mab.main.jp`が使用しているレンタルサーバサービスを特定し、そのWebサイトのドメイン名を答えてください。Flagフォーマットは `TsukuCTF23{ドメイン名}`です。 Please identify the rental server service used by mab.main.jp and answer me with the domain name of the website. The flag format is `TsukuCTF23{domain_name}`.

## 難易度

easy

## 解法

本問はドメイン調査のeasy問として用意したため、さまざまな開法が存在します。いずれにせよ、Name Serverなどの形で`lolipop.jp`のドメインが出てきます。後から知ったのですが、後から知ったのですが、[Googleでmain.jpを検索](https://www.google.com/search?q=%22main.jp%22)しても解けますね。

pingを用いた解法

```sh
# pingの実装依存です
ping mab.main.jp
PING mab.main.jp (157.7.107.89) 56(84) bytes of data.
64 bytes from 157-7-107-89.virt.lolipop.jp (157.7.107.89): icmp_seq=1 ttl=44 time=9.94 ms
64 bytes from 157-7-107-89.virt.lolipop.jp (157.7.107.89): icmp_seq=2 ttl=44 time=7.60 ms
```

whois(コマンド)を用いた解法

```sh
whois main.jp | grep "Name Server"
[Name Server]                   sv.madame.jp # これもロリポップ関連のドメインですが、今回はレンタルサーバサービスのWebサイトのドメインを答える必要があるため、これは不適切
[Name Server]                   dns2.lolipop.jp
```

whois(Webサイト)を用いた解法

[whois検索](https://www.value-domain.com/domain/whois/?action=whois2&domain=main.jp)