import { Layout } from "../../../components/Layout";
import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import { GetStaticProps } from "next";

const ctfId = "tsukuctf2021";

const TsukuCTF = ({
  allPostsData,
}: {
  allPostsData: {
    title: string;
    id: string;
  }[];
}) => {
  return (
    <Layout title="" description="">
      <section>
        <h2>Writeups</h2>
        <ul>
          {allPostsData.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/ctf/${ctfId}/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
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
