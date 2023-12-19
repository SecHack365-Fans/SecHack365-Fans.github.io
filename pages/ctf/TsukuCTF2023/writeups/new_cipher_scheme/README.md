---
title: new_cipher_scheme
description: RSA暗号+8乗根
author: motimoti_purinn
genre: crypto
solver: 31 
point: 491
---

# new_cipher_scheme
## 問題文
I wouldn't worry about it being decrypted because of this complicated process!
## 難易度
medium
## 解法
この問題では普通のRSA暗号の数値に加え
$$s = magic(p, q, r)$$
の値が返されています。 $$magic2(a)$$
の戻り値は
$$\sum_{i=0}^{a-1} (2i + 1) = a^2$$
であることから $$s = (p + q)^8 mod r$$となります。
よってこれの8乗根を求めてあげれば $$p+q$$が復元でき、あとは解と係数の関係によりdを求めることができます。
8乗根はTonelli-Shanksのアルゴリズムを三回用いるか、もしくはsageを使ってやるといいでしょう

Tonelli-Shanks解

https://qiita.com/motimotipurinn/items/d01e6d38a54e7207fafb

これを参考にしてください

sage解
```py
from output import *
from Crypto.Util.number import *

PR.<x> = PolynomialRing(GF(r))
f = x^8-s
rs = f.roots()
t = int(rs[-1][0])
PR.<x> = PolynomialRing(ZZ)
f = x^2-t*x+n
rs = f.roots()
p = int(rs[0][0])
q = int(rs[1][0])
phi = (p - 1) * (q - 1)
d = pow(e, -1, phi)
print(long_to_bytes(pow(int(c), int(d), int(n))))
```


