import { createPostIndexPage } from "../../../components/TsukuCTF";
import { createPostIndexProps } from "../../../lib/posts";

const ctfId = "TsukuCTF2021";
const date = "2021/09/11 12:00pm GMT+9 ~ 2021/09/12 12:00pm GMT+9 (24h00m)";

export default createPostIndexPage(ctfId, date);
export const getStaticProps = createPostIndexProps(ctfId);
