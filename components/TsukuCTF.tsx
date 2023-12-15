import { Layout } from "./Layout";
import Link from "next/link";
import { TwitterButton } from "./TwitterButton";
import { genre2Style, AllPostedData, postSortCb } from "./writeup";

import styles from "/styles/writeups.module.css";

const CTFDescription = ({ date }: { date: string }) => {
  return (
    <div className={styles.ctfDetails}>
      <a
        href="https://tsukuctf.sechack365.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="../../../images/tsukuctf-logo.png" alt="TsukuCTF" />
        <div className={styles.ctfLink}>Registration for TsukuCTF</div>
      </a>
      <div className={styles.ctfLink}>{date}</div>
      <div className={styles.ctfLink}>
        Follow us on{" "}
        <a
          href="https://twitter.com/tsukuctf"
          target="_blank"
          rel="noopener noreferer noreferrer"
        >
          Twitter(@tsukuctf)
        </a>{" "}
        or{" "}
        <a
          href="https://discord.gg/EEsfKWm9"
          target="_blank"
          rel="noopener noreferer noreferrer"
        >
          Discord
        </a>
      </div>
    </div>
  );
};

export const TsukuCTFWriteup = ({
  allPostsData,
  ctfId,
  date,
}: AllPostedData) => {
  return (
    <Layout title={`${ctfId} Writeups`} description={`${ctfId} Writeups`}>
      <h1>{ctfId}</h1>
      <CTFDescription date={date} />
      <hr />
      <div className={styles.writeups}>
        <h2>Writeups</h2>
        <ul>
          {allPostsData
            .sort((a, b) => postSortCb(a, b))
            .map(({ id, title, description, author, genre, solver, point }) => (
              <Link href={`/ctf/${ctfId}/${id}`} key={id} passHref>
                <li className={styles.ctfWriteupList}>
                  <h2>{title}</h2>
                  <span className={styles.writeupsMeta}>
                    <div className={styles.writeupsMetaBox}>
                      Genre:{" "}
                      <span
                        className={`${styles.writeupsGenre} ${
                          genre2Style[genre.toLowerCase()]
                        }`}
                      >
                        {genre}
                      </span>
                    </div>
                    <div className={styles.writeupsMetaBox}>
                      Author: <TwitterButton authors={author} />
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
