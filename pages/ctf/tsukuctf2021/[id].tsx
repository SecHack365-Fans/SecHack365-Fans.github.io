import { Layout } from "../../../components/Layout";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";

import ReactMarkdown from "react-markdown";
import path from "path";

const ctfId = "tsukuctf2021";

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
  return (
    <Layout title={`${ctfId}${postData.title}`}>
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => {
            const src = path.join(
              "https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/src/pages/ctf/tsukuctf2021/writeups/",
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
