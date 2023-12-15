import { GetStaticProps } from "next";
import { getSortedPostsData } from "../../../lib/posts";
import { TsukuCTFWriteup } from "../../../components/TsukuCTF";
import { AllPostedData } from "../../../components/writeup";

const ctfId = "TsukuCTF2021";
const date = "2021/09/11 12:00pm GMT+9 ~ 2021/09/12 12:00pm GMT+9 (24h00m)";

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
