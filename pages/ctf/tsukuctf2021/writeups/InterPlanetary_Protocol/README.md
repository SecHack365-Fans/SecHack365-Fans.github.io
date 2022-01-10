---
title: InterPlanetary Protocol
description: IPFSを使ったURLを開きます
author: 7aru7aru
genre: OSINT
solver: 20
point: 340
---

# InterPlanetary Protocol

> 大変だ！つくし星に住むエイリアンが団結して地球を侵略しにくる！以下の文字列は、つくし星で使われている特殊なウェブサイトの URL らしい。このウェブサイトをなんとか開いて、侵略計画を手に入れるのだ！！！
>
> bafybeieozcigchzmmpjzlct5eti4xhqexjnolpuehsnk2ckeaiqfqfqilu
>
> bafybeifvtvmitvebs6ktbaqqhort2h76xfen4zj65bujq7xos2zzxdvwga
>
> bafybeidtzxolknnds6k2ny6s6rgvbm7t7gopwyfgvyblfjdw6m6og2vsxm

問題の名前が「InterPlanetary Protocol」実は、Google で検索するとこれに該当する技術が検索結果に出ます。中でも、[このサイト](https://ipfs-book.decentralized-web.jp/what_is_ipfs/) を参考にすれば、問題が解けます。

しかし、個人的にスマートな解き方は、ipfs:// + 文字列 から構成される URL を brave ブラウザの URL 欄に入力してアクセスすることです。セットアップをすることなく、IPFS のコンテンツにアクセスすることが出来ます。[参考記事](https://www.itmedia.co.jp/news/articles/2101/21/news048.html)

https://bafybeieozcigchzmmpjzlct5eti4xhqexjnolpuehsnk2ckeaiqfqfqilu.ipfs.dweb.link/

https://bafybeifvtvmitvebs6ktbaqqhort2h76xfen4zj65bujq7xos2zzxdvwga.ipfs.dweb.link/

https://bafybeidtzxolknnds6k2ny6s6rgvbm7t7gopwyfgvyblfjdw6m6og2vsxm.ipfs.dweb.link/

この 3 つのサイトにアクセスして、組み合わせればフラグを入手することができます。

```txt
TsukuCTF{IPFS_is_the_future}
```

## 誠意の謝罪

そのまま、組み合わせるとフラグが、

```txt
TsukuCTF{IPFS__is_the_future}
```

となり、CTF 開始直後、これだと不正解でした。これは、作問時の私のミスです。。大変申し訳ございませんでした。

https://twitter.com/7aru7aru/status/1436679979702493193?s=20
