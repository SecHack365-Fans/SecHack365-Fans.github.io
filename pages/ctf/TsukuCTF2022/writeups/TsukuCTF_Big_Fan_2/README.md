---
title: TsukuCTF Big Fan 2
description: punycodeとサブドメインを検索する
author: ryusei_ishika
genre: OSINT
solver: 6
point: 500
---

# TsukuCTF Big Fan 2

[@SuperProStalker](https://twitter.com/SuperProStalker)のツイートにこのようなものがあります。

> Webサイトを作成しました。知らない人にアクセスされると困るので、暗号で伝えます。
> Web site was created. We don't want strangers to access it, so we tell them in code.
> 
> ctf 073b6d com
> https://twitter.com/SuperProStalker/status/1571228640981192704

また、彼はプロフィールにこのようなことを言っています。

> I'm Japanese. Japanese language is beautiful. I wish everything was in Japanese...

さらに、このようなツイートもしています。

[https://twitter.com/SuperProStalker/status/1582443953109884929](https://twitter.com/SuperProStalker/status/1582443953109884929)

このことから、彼のWebサイトのドメインはアルファベットのみで構成されているわけではなく、日本語の文字も含まれている可能性があります。

punycodeというものを使うことで日本語のドメインをアルファベットのドメインに変換することができます。punycodeの使用に従って、正しいドメインを構築するとこのようになります(`xn--ctf-073b6d.com` )。
これは`つくctf.com`となりました。

このドメインのサブドメインを検索します([https://crt.sh/?q=xn--ctf-073b6d.com](https://crt.sh/?q=xn--ctf-073b6d.com))。すると`this-is-flag-site.xn--ctf-073b6d.com`というものが出てくるので、開くと中にBase64のフラグ(`VHN1a3VDVEYyMnt3aDQ3XzE1XzRfcHVuMWMwZDM/fQo=`)がありました。

## `TsukuCTF22{wh47_15_4_pun1c0d3?}`
