import { createPostIndexPage } from "../../../components/TsukuCTF";
import { createPostIndexProps } from "../../../lib/posts";

const ctfId = "TsukuCTF2023";
const date = "2023/12/09 12:20pm ~ 2023/12/10 18:00pm";

export default createPostIndexPage(ctfId, date);
export const getStaticProps = createPostIndexProps(ctfId);
