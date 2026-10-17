[![SecHack365](https://img.shields.io/static/v1?label=SecHack&message=365&color=ffd700)](https://sechack365.nict.go.jp/) [![github pages](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# SecHack365 Fansのホームページ

修了生が運営しています。

## このサイトを開発する

必要なものは Docker と Docker Compose です。Node.js と npm のコマンドは、
すべてコンテナ内で実行します。

```sh
git clone https://github.com/SecHack365-Fans/SecHack365-Fans.github.io.git
cd SecHack365-Fans.github.io
```

```sh
docker compose build
docker compose up
```

起動後、`http://localhost:3000` を開いてください。依存パッケージを追加する場合は、
`docker compose run --rm web npm install <package>` を実行します。

品質チェックも Docker 内で実行できます。

```sh
docker compose run --rm web npm run lint
docker compose run --rm web npm run typecheck
docker compose run --rm web npm run build
```

# あなたの参加記を追加しましょう

追加は結構大変な作業なので、どうか皆様の力をお貸しください。

入力支援スクリプトが `tool/new_entry` にあります。

`cd tool/new_entry && docker build . -t sechack365fans-new-entry && docker run --rm -it sechack365fans-new-entry`
のように実行すれば、対話的に入力できます。
その後に JSON が標準出力されるので、`pages/blog/2020/data/<自分の該当するコース>.json`
に貼ってください。

皆様の Pull Request をお待ちしています！
