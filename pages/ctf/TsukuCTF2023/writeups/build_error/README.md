---
title: build_error
description: シンボルタイプを調査して変更する問題
author: Wagahaiha_toto
genre: misc
solver: 50 
point: 476
---

# build_error
## 問題文
怪盗シンボルより、以下の謎とき挑戦状が届いた。

```text
怪盗シンボルだ！

メールに3つのファイルを添付した。
この3つのファイルを同じディレクトリに置き、makeとシェルに入力し実行するとビルドが走るようになっている。

ビルドを行い、標準出力からフラグを入手するのだ！

追記：ソースコードは秘密
```

怪盗シンボルはせっかちなので、ビルドできるかチェックしているか不安だ。。。
取り合えずチャレンジしてみよう。

FlagフォーマットはTsukuCTF23{n桁の整数}になります。

## 難易度
Medium

## 解法
1. makeとシェルへ入力し、実行することで①のエラーが発生する。  
①GCCの場合

```text
cc main.o one.o -no-pie
/usr/bin/ld: main.o: in function `main':
main.c:(.text+0xc): undefined reference to `a'
/usr/bin/ld: main.c:(.text+0x13): undefined reference to `b'
collect2: エラー: ld はステータス 1 で終了しました
make: *** [Makefile:4: all] エラー 1
```

2. エラー内容を見るにmain.o内部でシンボルaとシンボルbが解決できていないことがわかる
3. リンクするone.oのシンボル情報をnmコマンドで見てみると、②の出力が得られる。  
②

```text
0000000000000008 b a
0000000000000010 b b
0000000000000000 B c
0000000000000000 T one_init

```

4. nmコマンドの出力におけるシンボルタイプは、小文字はローカル、大文字はグローバルとなっている。なので、aとbはローカルであり、cはグローバルであるとわかる。
5. 1.と4.よりシンボルaとbが、グローバルなシンボルタイプであればよい。よって、③のコマンドを入力する。  
③
```text
objcopy --globalize-symbol a one.o
objcopy --globalize-symbol b one.o
```
6. makeとシェルへ入力し、実行すると以下の出力が得られる。
```text
flag is 120
```





