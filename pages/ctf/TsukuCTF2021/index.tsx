import { Layout } from "../../../components/Layout";
import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import { GetStaticProps } from "next";
import { FaTwitter } from "react-icons/fa";

import styles from "/styles/writeups.module.css";

const ctfId = "TsukuCTF2021";

const TwitterButton = ({ author }: { author: string }) => {
  if (author.match(/[A-Za-z_]+/)) {
    return (
      <a href={`https://twitter.com/${author}`}>
        <FaTwitter style={{ color: "#00acee" }} />
        {author}
      </a>
    );
  } else {
    return <>{author}</>;
  }
};

const genre2Style: { [key: string]: string } = {
  tsukushi: styles.tsukushiGenre,
  osint: styles.osintGenre,
  rev: styles.revGenre,
  web: styles.webGenre,
  crypto: styles.cryptoGenre,
  misc: styles.miscGenre,
  hardware: styles.hardwareGenre,
  network: styles.networkGenre,
};

const TsukuCTF = ({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    solver: number;
    point: number;
  }[];
}) => {
  return (
    <Layout title="TsukuCTF2021 Writeups" description="TsukuCTF2021 Writeups">
      <h1>TsukuCTF 2021</h1>
      <div className={styles.ctfDetails}>
        <a
          href="https://tsukuctf.sechack365.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../../../images/tsukuctf2021.png" alt="TsukuCTF" />
          <div className={styles.ctfLink}>https://tsukuctf.sechack365.com/</div>
        </a>
      </div>
      <hr />
      <div className={styles.writeups}>
        <h2>Writeups</h2>
        <ul>
          {allPostsData
            .sort((a, b) => (a.genre > b.genre ? 1 : -1))
            .map(({ id, title, description, author, genre, solver, point }) => (
              <Link href={`/ctf/${ctfId}/${id}`} key={id} passHref>
                <li className={styles.ctfWriteupList}>
                  <h2>{title}</h2>
                  <span className={styles.writeupsMeta}>
                    <div className={styles.writeupsMetaBox}>
                      Genre:{" "}
                      <a
                        href="#"
                        className={`${styles.writeupsGenre} ${
                          genre2Style[genre.toLowerCase()]
                        }`}
                      >
                        {genre}
                      </a>
                    </div>
                    <div className={styles.writeupsMetaBox}>
                      Author: <TwitterButton author={author} />
                    </div>
                    <div className={styles.writeupsMetaBox}>Point: {point}</div>
                    <div className={styles.writeupsMetaBox}>
                      Solver: {solver}
                    </div>
                  </span>
                  <p>{description}</p>
                </li>
              </Link>
            ))}
        </ul>
      </div>
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
