---
title: OBOG
description: SecHack365日公式サイトを探します
author: ryusei_ishika
genre: OSINT
solver: 21
point: 323
---

# OBOG

> セキュリティマインドを有した創造的人材を目指しているTsukushiくんは国立研究開発法人情報通信研究機構が実施する、セキュリティイノベーター育成プログラム[SecHack365](https://sechack365.nict.go.jp/)に参加しています。参加したはいいものの、進捗が全くなく、嫌になった彼は修了生が作成したSecHack365**非公式サイト**を一部改ざんしてしまいました。彼の改ざんした内容を探してください。
※本CTFはNICT主催の若手セキュリティイノベーター育成プログラムSecHack365の修了生イベントに際して開催されています。

まずは`SecHack365 非公式サイト`で検索すると[SecHack365 非公式 ファンページ](https://fans.sechack365.com/))が見つかります．改ざんと問題文に書かれていることから各ページのソースを全て眺めます．調べていると[限界タイマー](https://fans.sechack365.com/timer/)のコンソールに`Please decode! → VHN1a3VDVEZ7aHR0cHM6Ly9zZWNoYWNrMzY1Lm5pY3QuZ28uanB9`と表示されていることがわかります．これをBase64でデコードするとフラグが入手できます．

```txt
TsukuCTF{https://sechack365.nict.go.jp/}
```
