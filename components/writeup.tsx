import styles from "/styles/writeups.module.css";

export const genre2Style: { [key: string]: string } = {
  tsukushi: styles.tsukushiGenre,
  osint: styles.osintGenre,
  rev: styles.revGenre,
  web: styles.webGenre,
  crypto: styles.cryptoGenre,
  misc: styles.miscGenre,
  hardware: styles.hardwareGenre,
  network: styles.networkGenre,
};

type Post = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  solver: number;
  point: number;
};

export type AllPostedData = {
  allPostsData: Post[];
  ctfId: string;
  date: string;
};

// ソートの第一条件をジャンル、第二条件をidでソートすることで、並び順を一意にする
// このソート順にしたのは、ユーザがみた時にジャンル->問題名のアルファベット順で探すと思ったため
export const postSortCb = (a: Post, b: Post) =>
  a.genre === b.genre ? (a.id < b.id ? -1 : 1) : a.genre < b.genre ? -1 : 1;
