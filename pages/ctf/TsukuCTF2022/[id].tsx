import { Layout } from "../../../components/Layout";
import { getAllPostIds, getPostData } from "../../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import MarkdownRender, {
  PostPropType,
} from "../../../components/MarkdownRender";

const ctfId = "TsukuCTF2022";

const Post = ({ postData }: PostPropType) => {
  const { title, description, author, genre, solver, point, contentHtml } =
    postData;
  return (
    <Layout title={`${postData.title}-${ctfId}`}>
      <MarkdownRender ctfId={ctfId} title={title} content={contentHtml} />
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
