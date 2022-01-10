import { Layout } from "../../../components/Layout";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import MarkdownRender, {
  PostPropType,
} from "../../../components/MarkdownRender";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const ctfId = "tsukuctf2021";

const Post = ({ postData }: PostPropType) => {
  const { title, description, author, genre, solver, point, contentHtml } =
    postData;
  const router = useRouter();
  const [ctfId, setCTFId] = useState<string>("");
  useEffect(() => {
    if (router.asPath !== router.route) {
      setCTFId(String(router.pathname).split("/").slice(-2, -1)[0]);
    }
  }, [router]);
  return (
    <Layout title={`${postData.title}-${ctfId}`}>
      <MarkdownRender id={ctfId} title={title} content={contentHtml} />
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds(ctfId);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string, ctfId);
  return {
    props: {
      postData,
    },
  };
};
