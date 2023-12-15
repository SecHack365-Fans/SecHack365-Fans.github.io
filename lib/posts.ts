import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";

/* 指定したCTFの問題情報一覧をIDでソートして取得する */
export const getSortedPostsData = (ctfId: string) => {
  const postsDirectory = path.join(
    process.cwd(),
    `pages/ctf/${ctfId}/writeups`,
  );
  const problemIds = fs.readdirSync(postsDirectory);

  const allPostsData = problemIds.map((problemId) => {
    const id = problemId;
    const fileContents = fs.readFileSync(
      `${postsDirectory}/${problemId}/README.md`,
      "utf8",
    );
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { title: string }),
    };
  });
  return allPostsData.sort((a, b) => (a.title > b.title ? 1 : -1));
};

/* 指定したCTFのID(問題名)一覧を取得する */
export const getAllPostIds = (ctfId: string) => {
  const postsDirectory = path.join(
    process.cwd(),
    `pages/ctf/${ctfId}/writeups`,
  );
  const problemIds = fs.readdirSync(postsDirectory);
  return problemIds.map((problemId) => {
    return {
      params: {
        id: problemId,
      },
    };
  });
};

/* 指定した問題のwriteupの内容を取得する */
export const getPostData = async (id: string, ctfId: string) => {
  const postsDirectory = path.join(
    process.cwd(),
    `pages/ctf/${ctfId}/writeups`,
  );
  const fullPath = `${postsDirectory}/${id}/README.md`;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const markdown = matter(fileContents);
  const contentHtml = (await remark().process(markdown.content)).toString();

  return {
    id,
    contentHtml,
    ...(markdown.data as { date: string; title: string }),
  };
};
