import { genreStyles } from "../styles/writeups.stylex";
import type { PostSummary } from "../lib/posts";

export const getGenreStyle = (genre: string) => {
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

// ソートの第一条件をジャンル、第二条件をidでソートすることで、並び順を一意にする
// このソート順にしたのは、ユーザがみた時にジャンル->問題名のアルファベット順で探すと思ったため
export const comparePosts = (a: PostSummary, b: PostSummary) =>
  a.genre.localeCompare(b.genre) || a.id.localeCompare(b.id);
