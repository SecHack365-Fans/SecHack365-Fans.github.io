import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { assert } from "console";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(ctfId: string) {
  const fileNames = fs.readdirSync(`${postsDirectory}/${ctfId}`);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    console.log(id);
    const fullPath = path.join(`${postsDirectory}/${ctfId}`, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(ctfId: string) {
  const fileNames = fs.readdirSync(`${postsDirectory}/${ctfId}`);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string, ctfId: string) {
  const fullPath = `${postsDirectory}/${ctfId}/${id}.md`;
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
