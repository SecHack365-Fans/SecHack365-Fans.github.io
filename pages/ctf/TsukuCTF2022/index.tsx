import { GetStaticProps } from "next";
import { getSortedPostsData } from "../../../lib/posts";
import { TsukuCTFWriteup } from "../../../components/TsukuCTF";
import { AllPostedData } from "../../../components/writeup";

const ctfId = "TsukuCTF2022";
const date = "2022/10/22 12:20pm GMT+9 ~ 2022/10/23 18:00pm GMT+9 (29h40m)";

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
