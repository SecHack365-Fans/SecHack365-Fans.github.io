import { VFC } from "react";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import styles from "/styles/ctf.module.css";

const ctfIds = ["TsukuCTF2021", "TsukuCTF2022"];

const CTF: VFC = () => {
  return (
    <Layout title="CTF" description="開催したCTF一覧">
      <h1>CTF</h1>
      <ul className={styles.ctfList}>
        {ctfIds.map((ctfId) => (
          <Link href={`/ctf/${ctfId}`} key={String(ctfId)} passHref>
            <li>{ctfId}</li>
          </Link>
        ))}
      </ul>
    </Layout>
  );
};

export default CTF;
