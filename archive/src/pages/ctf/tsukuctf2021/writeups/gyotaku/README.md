---
title: gyOTAKU
description: 魚拓をとるサービスで任意ファイル読み込み
author: satoki00
genre: Web
solver: 4
point: 496
---

# gyOTAKU
アクセスすると、以下のような魚拓をとれるサービスなようだ。  
🐟gyOTAKU🐟  
![images/image1.png](images/image1.png)  
魚拓をとると画像が降ってくる。  
`https://tsukuctf.sechack365.com/problems/gyotaku?url=http://example.com/`  
![images/image2.png](images/image2.png)  
ソースを見ると次のようであった。  
```python
~~~
def sanitize(text):
    #RCE is a non-assumed solution. <- This is not a hint.
    url = ""
    for i in text:
        if i in string.digits + string.ascii_lowercase + string.ascii_uppercase + "./_:":
            url += i
    if (url[0:7]!="http://") and (url[0:8]!="https://"):
        url = "https://www.google.com"
    return url
~~~
@app.route("/")
def gyotaku():
    filename = "".join([random.choice(string.digits + string.ascii_lowercase + string.ascii_uppercase) for i in range(15)])
    url = request.args.get("url")
    if not url:
        return "<font size=6>🐟gyOTAKU🐟</font><br><br>You can get gyotaku: <strong>?url={URL}</strong><br>Sorry, we do not yet support other files in the acquired site."
    url = sanitize(url)
    html = open(f"{filename}.html", "w")
    try:
        html.write(requests.get(url, timeout=1).text + "<br><font size=7>gyotakued by gyOTAKU</font>")
    except:
        html.write("Requests error<br><font size=7>gyotakued by gyOTAKU</font>")
    html.close()
    cmd = f"chromium-browser --no-sandbox --headless --disable-gpu --screenshot='./gyotaku-{filename}.png' --window-size=1280,1080 '{filename}.html'"
    subprocess.run(cmd, shell=True, timeout=1)
~~~
```
クエリパラメータで渡されたアドレスをgetし、htmlに保存した後にchromium-browserでスクリーンショットを撮っているようだ。  
アドレスは`http://`か`https://`で始まるようサニタイズされている。  
ファイル名もランダムなのでOSコマンドインジェクションも難しそうだ。  
ここで`alert(1)`を出すようなサイトを読み込むとInternal Server Errorが発生することに気づく。  
JavaScriptが動くようだ。  
ここで、次のようなhtmlを考える。  
```html
<script>location.href="/etc/passwd"</script>
```
これが`http://tsukuctf.example.com/index.html`として配置されていた場合、`http://tsukuctf.example.com/etc/passwd`へリダイレクトされる。  
しかし、htmlファイルとしてローカルに保存されている場合、`/etc/passwd`が表示される。  
このhtmlを外部のサーバに配置し魚拓をとると、本アプリによってhtmlファイルとして保存され、chromium-browserが問題サーバ内の`/etc/passwd`を表示する。  
これで問題サーバ内の任意のファイルが読み出せるようになった。  
問題文よりrootで動いているとのことなので、`/root`以下を捜索する。  
`/root/.bash_history`を読み取ると次のようであった。  
![images/image3.png](images/image3.png)  
何かが`/root/flagc464f9eba1.txt`に書かれているようだ。  
![images/image4.png](images/image4.png)  
ファイルを読み込むとflagが書かれていた。  

## TsukuCTF{Tsukushi\_to\_Sugina\_no\_chigai\_ga\_wakaran}
