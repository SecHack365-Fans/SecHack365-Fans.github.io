import { genreStyles } from "../styles/writeups.stylex";

export const genre2Style = (genre: string) => {
  switch (genre.toLowerCase()) {
    case "tsukushi":
      return genreStyles.tsukushi;
    case "osint":
      return genreStyles.osint;
    case "rev":
      return genreStyles.rev;
    case "web":
      return genreStyles.web;
    case "crypto":
      return genreStyles.crypto;
    case "misc":
      return genreStyles.misc;
    case "hardware":
      return genreStyles.hardware;
    case "network":
      return genreStyles.network;
    default:
      return genreStyles.other;
  }
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
