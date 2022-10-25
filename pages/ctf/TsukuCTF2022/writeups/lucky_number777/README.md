---
title: Lucky Number 777
description: Pythonのevalを用いて変数flagの値を読み取ります
author: ryusei_ishika
genre: Misc
solver: 19
point: 497
---

# Lucky Number 777

いくつかの解法がありますが，その内の一つとしてこれがあります．

```python
f"{flag=}"
```

PythonはPython3.8から[デバッグ用のf文字列をサポートしました](https://docs.python.org/3/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging)．これを用いるとf文字列内で簡潔にprintデバッグが可能です．

```python
# https://docs.python.org/3/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging
user = 'eric_idle'
member_since = date(1975, 7, 31)
print(f'{user=} {member_since=}')
# "user='eric_idle' member_since=datetime.date(1975, 7, 31)"
```

よってこの問題で`f"{flag=}"`を入力すると，`your lucky_number is flag='TsukuCTF22{wh4ts_new_1n_pyth0n_3X}'` が出力されます．

## TsukuCTF22{wh4ts_new_1n_pyth0n_3X}

他にも、以下のような解法があります。他の方法がございましたら是非あなたのWriteupを通して教えてください！

```python
f"{flag!a}"
f"{flag!s}"
f"{flag!r}"
```
