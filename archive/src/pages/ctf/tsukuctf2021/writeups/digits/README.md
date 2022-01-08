---
title: digits
description: コンピュータに祈って運よくフラグをもらうってやつ
author: ryusei_ishika
genre: Web
solver: 63
point: 100
---

# digits

> コンピュータは高速に正しく計算してくれますが、昔のコンピュータは今ほど正確に計算できないことがありました。現在もハードウェアの故障などが原因でとても低い確率でコンピュータは計算をミスするでしょう。
> 運が良いあなたならこの問題が解けるはずです。10 桁の好きな数字をクエリパラメータ `q` に入れて、神に祈りましょう。
> `https://tsukuctf.sechack365.com/problems/digits`
> ※この問題では`/problems/digits`以下のみを用います。
> 他の問題`/problems/<name>`などと混同しないよう注意してください。

プログラムはこれです．

```py
from typing import Optional
from fastapi import FastAPI
import random

app = FastAPI()

FLAG = "TsukuCTF{}"


@app.get("/program/digits/")
def main(q: Optional[str] = None):
    if q == None:
        return {
            "msg": "please input param 'q' (0000000000~9999999999).  example: /?q=1234567890"
        }
    if len(q) != 10:
        return {"msg": "invalid query"}
    if "-" in q or "+" in q:
        return {"msg": "invalid query"}
    try:
        if not type(int(q)) is int:
            return {"msg": "invalid query"}
    except:
        return {"msg": "invalid query"}

    you_are_lucky = 0

    for _ in range(100):
        idx = random.randrange(4)
        if q[idx] < "0":
            you_are_lucky += 1
        if q[idx] > "9":
            you_are_lucky += 1

    if you_are_lucky > 0:
        return {"flag": FLAG}
    else:
        return {"msg": "Sorry... You're unlucky."}
```

ちなみに FastAPI が使われているのは僕の好みです．
入力`q`のチェックを一つずつ確認しましょう．

### 1. `q`は`None`であってはならない

何か入れましょう．

### 2. `q`は文字列型である

`def main(q: Optional[str] = None):` と書かれています．

### 3. `q`の長さは 10 であ

`len(q) != 10:` と書かれています．

### 4. `q`に`+`や`-`が含まれない

書いてある通りです．

### 5. `q`のある文字が 0 未満または 9 以上になることがある

つまり，0~9 以外の文字を 1 つでもこの時点で入って入れば良いです．

### まとめ

結論から言うと，`+100000000`や`+++1111111`や`+294287356`など，`+`が 1 つ以上かつその後ろに数字が 1 つ以上入っていれば何でも大丈夫です．  
URL には`+`という文字を入れることができます．これはデリミタの一種で，半角スペースの扱いになります．  
正解の文字列は長さが 10 で`-`が含まれておらず，`+`は半角スペースに変換されるので`+`も入っておらず，`int`関数で変換可能であり，ある文字が 0 未満または 9 以上になることがあります．

### お詫び

この問題いっぱいミスをしましたすみませんでした．  
まず最初はファイルを与えておらず，ブラックボックスになっていました．  
また，最初は`@app.get("/program/digits/")`が`@app.get("/program/digits")`となっていて，`/program/digits/?q=12345678090`とアクセスすると localhost へリダイレクトされるバグがありました．Y ちゃんが気づいて直してくれました．本当にすみませんでした......  
あと`idx = random.randrange(4)`がなんで`idx = random.randrange(10)`ではないかというと，僕のミスです(あまり難易度は変わらないので無視しました)．

```txt
TsukuCTF{you_are_lucky_Tsukushi}
```
