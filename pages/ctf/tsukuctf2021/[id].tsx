import { Layout } from "../../../components/Layout";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";

import ReactMarkdown from "react-markdown";
import path from "path";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// "tsukuctf2021";

type PostPropType = {
  postData: {
    title: string;
    description: string;
    author: string;
    genre: string;
    solver: number;
    point: number;
    contentHtml: string;
  };
};
const Post = ({ postData }: PostPropType) => {
  const { title, description, author, genre, solver, point, contentHtml } =
    postData;
  const router = useRouter();
  const [ctfId, setCTFId] = useState<string>();
  useEffect(() => {
    if (router.asPath !== router.route) {
      setCTFId(String(router.pathname).split("/").slice(-2, -1)[0]);
    }
  }, [router]);
  return (
    <Layout title={`${postData.title}-${ctfId}`}>
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => {
            const src = path.join(
              `https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/src/pages/ctf/${ctfId}/writeups/`,
              title,
              props.src as string
            );
            return <img src={src} alt={props.alt} style={{ width: "80%" }} />;
          },
        }}
      >
        {postData.contentHtml}
      </ReactMarkdown>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds("tsukuctf2021");
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string, "tsukuctf2021");
  return {
    props: {
      postData,
    },
  };
};
