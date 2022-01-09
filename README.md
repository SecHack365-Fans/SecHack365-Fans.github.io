[![SecHack365](https://img.shields.io/static/v1?label=SecHack&message=365&color=ffd700)](https://sechack365.nict.go.jp/) [![github pages](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# SecHack365 Fansのホームページ

修了生が運営しています。

## このサイトの開発がしたい

```sh
git clone https://github.com/SecHack365-Fans/SecHack365-Fans.github.io
```

```sh
npm install
gatsby develop
```

または

```sh
yarn
yarn develop
```

# あなたの参加記を追加しましょう

追加は結構大変な作業なので、どうか皆様の力をお貸しください。

入力支援スクリプトが tool/new_entryにあります。

`$ cd tool/new_entry && docker build . -t sechack365fans-new-entry && docker run -it sechack365fans-new-entry` のように実行すれば、対話的に入力できます。
その後にJSONが標準出力されるので、`src/pages/2020/data/<自分の該当するコース>.json` に貼ってください！

皆様の Pull Request をお待ちしています！

# Contributors

* **[xryuseix](https://github.com/xryuseix)** (Development and Operation)
* **[Krout0n](https://github.com/Krout0n)** (Development and Operation)
* **[Satoki](https://github.com/satoki)** (Domain Management, Professional NEET)
* [and more ...](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/graphs/contributors)
 