import { createPostIndexPage } from "../../../components/TsukuCTF";
import { createPostIndexProps } from "../../../lib/posts";

const ctfId = "TsukuCTF2022";
const date = "2022/10/22 12:20pm GMT+9 ~ 2022/10/23 18:00pm GMT+9 (29h40m)";

export default createPostIndexPage(ctfId, date);
export const getStaticProps = createPostIndexProps(ctfId);
