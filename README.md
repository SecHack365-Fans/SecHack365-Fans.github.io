[![github pages](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/actions/workflows/gh-pages.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


# SecHack365 Fansのホームページ

修了生が運営しています．  
誰か充実したREADME書いてください．

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

# あなたの参加記を追加しましょう！
追加は結構大変な作業なので、どうか皆様の力をお貸しください。

入力支援スクリプトが tool/new_entryにあります。

`$ cd tool/new_entry && docker build . -t sechack365fans-new-entry && docker run -it sechack365fans-new-entry` のように実行すれば、対話的に入力できます。
その後にJSONが標準出力されるので、`src/pages/2020/blog.js` をエスパーしてそのJSONを貼ってください！(TODO: blog.jsをエスパーしなくても貼れる方法を考える)

皆様の Pull Request をお待ちしています！
