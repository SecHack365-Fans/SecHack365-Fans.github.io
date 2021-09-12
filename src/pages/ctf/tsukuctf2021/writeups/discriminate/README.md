---
title: discriminate
description: 言語モデルで生成された文章の検知
author: FQCme1
genre: MISC
solver: 25
point: 244
---

# discriminate

## 想定解法1
以下のようなコードを実行します。 すると、フラグが標準出力されます。

```
from transformers import T5Tokenizer, AutoModelForCausalLM
# トークナイザー
tokenizer = T5Tokenizer.from_pretrained("rinna/japanese-gpt2-medium")
# 生成モデル
model = AutoModelForCausalLM.from_pretrained("rinna/japanese-gpt2-medium")

# テキストを入れると後続テキストを生成する関数
def gen_text(text):
    input = tokenizer.encode(text, return_tensors="pt")
    output = model.generate(input, do_sample=False, max_length=90)
    return tokenizer.batch_decode(output)[0].replace("</s>", '').replace(" ",'')

text = "握るだけで解錠できるスマートドアハンドルを開発した。静脈認証が外側のドアハンドルに埋め込まれている。静脈認証は、身体の内部にある静脈パターンを読み取り、そのパターンに合致するドアハンドルを自動的に開く。スマートドアハンドルは、ドアハンドルの内側に内蔵されたセンサーが、ドアハンドルの開閉を検知して、自動的に開閉する。"

len_text = len(text)
# 一文字づつずらして生成する
for i in range(5, len_text):
    try_text = text[:i]
    generated_text = gen_text(try_text)
    # 問題のテキストを与えられたテキストと一致するものか
    if generated_text[:len_text] == text[:len_text]:
        break
# フラグを表示
print("TsukuCTF\{",text[i-5: i], "\}")
```

## 想定解法2

こちらのほうが現実的です。
1. https://sechack365.nict.go.jp/achievement からスマートドアハンドルの話題を扱っているポスターを探す。→[PDF](https://sechack365.nict.go.jp/achievement/2020/pdf/2020_08.pdf)
2. ポスターを読んで与えられた生成文に近い文章を探す。
3. 生成文とオリジナルを比較し、一致している最後の5文字を回答する。