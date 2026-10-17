import fs from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import { parse } from "yaml";

export type PostMetadata = {
  title: string;
  description: string;
  author: string;
  genre: string;
  solver: number;
  point: number;
};

export type PostSummary = PostMetadata & {
  id: string;
};

export type PostData = PostSummary & {
  content: string;
};

export type PostPageProps = {
  postData: PostData;
};

export type PostIndexProps = {
  allPostsData: PostSummary[];
};

const getPostsDirectory = (ctfId: string) =>
  path.join(process.cwd(), "pages", "ctf", ctfId, "writeups");

const readPost = (postsDirectory: string, postId: string) => {
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, postId, "README.md"),
    "utf8",
  );
  const { data, content } = parseFrontMatter(fileContents);

  return { id: postId, content, ...data } satisfies PostData;
};

const parseFrontMatter = (fileContents: string) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(fileContents);

  if (!match) {
    throw new Error("Markdown front matter is missing or malformed.");
  }

  return {
    data: parse(match[1]) as PostMetadata,
    content: fileContents.slice(match[0].length),
  };
};

/* 指定したCTFの問題情報一覧をIDでソートして取得する */
export const getSortedPostsData = (ctfId: string) => {
  const postsDirectory = getPostsDirectory(ctfId);

  return fs
    .readdirSync(postsDirectory)
    .map((problemId) => readPost(postsDirectory, problemId))
    .map(({ content: _content, ...summary }) => summary)
    .sort((a, b) => a.title.localeCompare(b.title));
};

/* 指定したCTFのID(問題名)一覧を取得する */
export const getAllPostIds = (ctfId: string) => {
  return fs.readdirSync(getPostsDirectory(ctfId)).map((postId) => ({
    params: { id: postId },
  }));
};

/* 指定した問題のwriteupの内容を取得する */
export const getPostData = (id: string, ctfId: string) =>
  readPost(getPostsDirectory(ctfId), id);

export const createPostPaths =
  (ctfId: string): GetStaticPaths =>
  async () => ({
    paths: getAllPostIds(ctfId),
    fallback: false,
  });

export const createPostProps =
  (ctfId: string): GetStaticProps<PostPageProps> =>
  async ({ params }) => {
    const postId = params?.id;

    if (typeof postId !== "string") {
      return { notFound: true };
    }

    return {
      props: {
        postData: getPostData(postId, ctfId),
      },
    };
  };

export const createPostIndexProps =
  (ctfId: string): GetStaticProps<PostIndexProps> =>
  async () => ({
    props: {
      allPostsData: getSortedPostsData(ctfId),
    },
  });
