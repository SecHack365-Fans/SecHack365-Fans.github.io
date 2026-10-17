import { createPostPage } from "../../../components/MarkdownRender";
import { createPostPaths, createPostProps } from "../../../lib/posts";

const ctfId = "TsukuCTF2022";

export default createPostPage(ctfId);
export const getStaticPaths = createPostPaths(ctfId);
export const getStaticProps = createPostProps(ctfId);
