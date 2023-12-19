import { GetStaticProps } from "next";
import { getSortedPostsData } from "../../../lib/posts";
import { TsukuCTFWriteup } from "../../../components/TsukuCTF";
import { AllPostedData } from "../../../components/writeup";

const ctfId = "TsukuCTF2023";
const date = "2023/12/09 12:20pm ~ 2023/12/10 18:00pm";

const TsukuCTF = ({ allPostsData }: AllPostedData) => {
  return TsukuCTFWriteup({ allPostsData, ctfId, date });
};

export default TsukuCTF;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData(ctfId);
  return {
    props: {
      allPostsData,
    },
  };
};
