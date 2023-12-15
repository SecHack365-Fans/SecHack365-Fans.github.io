import { Layout } from "../../components/Layout";
import Link from "next/link";
import stylex from "@stylexjs/stylex";
import styles from "/styles/ctf.module.css";

const s = stylex.create({
  redbox: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    color: "red",
  },
});

const ctfIds = ["TsukuCTF2021", "TsukuCTF2022"];

const CTF = () => {
  return (
    <Layout title="CTF" description="開催したCTF一覧">
      <h1>CTF</h1>
      <div className={stylex(s.redbox)}>AAA</div>
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
