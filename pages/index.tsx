import { NextPage } from "next";
import { Layout } from "../components/Layout";
// import styles from "../styles/index.module.css";

import stylex from "@stylexjs/stylex";

const style = stylex.create({
  code: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    color: "blue",
  },
});

const Home: NextPage = () => {
  return (
    <Layout
      title="SecHack365-Fans Top Page"
      description="SecHack365 非公式 ファンページ"
    >
      <h1>SecHack365 非公式 ファンページ</h1>
      <code {...stylex.props(style.code)}>app/page.tsx</code>
      {/* <div className={styles.cautionBox}>
        <div>
          <span className={styles.cautionBoxTitle}>注意</span>
          このページは修了生よって運営されている
          <div className={styles.unofficial}>非公式</div>
          のファンページです。 公式のページはこちらになります。
        </div>
        <div className={styles.officialLink}>
          <a
            href="https://sechack365.nict.go.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webサイト
          </a>
          <a
            href="https://twitter.com/SecHack365"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
      <div className={styles.gamingSecHack}>
        <img src="/images/GamingSecHack.gif" alt="GamingSecHack" />
      </div> */}
    </Layout>
  );
};

export default Home;
