---
title: Ochakumi
description: WASMから個人を特定する問題
author: ryusei_ishika
genre: OSINT
solver: 3
point: 500
---

# Ochakumi

問題文に記載されたリンクは onion ドメインになっています。よって Tor ブラウザなど特定のブラウザを使ってアクセスする必要があります(onion.ws などを使用する方法もあります)。

実際にアクセスしてみると、このような画面になっています。

![](imgs/loading.png)

この Web サイトは計算機として遊ぶことができます。しかし、len などの特殊な関数も使用できるようです。

![](imgs/calc.png)

次はエラーを出させてみます。このように入力すると、Go 言語のエラー文が出力されます。他にもいくつかのエラーを出力させてみると良いでしょう。

![](imgs/go.png)

次に、ネットワークタブを開いてみます。すると、WASM として Go が実行されていることがわかります。

![](imgs/network.png)

---

WASM をダウンロードして調査します。

tsuku22qotvyqz5kbygsmxvijjg7jg2d7rgc42qhaqt3ryj66lntrmid.onion/main.wasm

ところで、Go はパッケージが外部に公開されている場合、go.mod ファイルにレポジトリ情報が高確率で存在します(ただし、Go Modules の規約としては必ずしもここを URL にする必要はありません)。

> Typically, a module path consists of a repository root path, a directory within the repository (usually empty), and a major version suffix (only for major version 2 or higher).[[ref]](https://go.dev/ref/mod#go-mod-file-ident)

また、Go で Wasm を作成した場合、go.mod の modules の値がそのまま WASM の中に反映されます。その結果、modules をレポジトリにしている場合はレポジトリ名が判明します。

実際に WASM の中を見てみると、github のレポジトリのようなものがあります。`strings main.wasm | grep "github"`などでも確認することができます。

![](imgs/wasm.png)

[https://github.com/GaOACafa/website/](https://github.com/GaOACafa/website/)

このレポジトリを調査すると、興味深いパスが見えます。

![](imgs/gitignore.png)

```txt
public/this_is_flag_dbKIMLQnMCI2fp0.html
```

このレポジトリは Vite で作成されているので、先頭の public は削除して、以下のリンク先にアクセスします。

```txt
tsuku22qotvyqz5kbygsmxvijjg7jg2d7rgc42qhaqt3ryj66lntrmid.onion/this_is_flag_dbKIMLQnMCI2fp0.html
```

![](imgs/flag.png)

## `TsukuCTF22{C0uld_w45m_h4v6_p6r50n4l_1nf0rm4710n?}`

余談: 最初は Vite でもう少しリッチな感じで作ろうと思っていたのですが、間に合いませんでした 🙇‍♂️
