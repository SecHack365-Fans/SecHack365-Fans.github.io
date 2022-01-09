import { VFC } from "react";
import { Layout } from "../components/Layout";

import styles from "../styles/404.module.css";

const Custom404: VFC = () => {
  return (
    <Layout title="404 not found">
      <h1>404 Not Found</h1>
      <p>
        あれ，もしかしてページを失くしモノされていますか？そんな時はこちら！！
      </p>
      <div className={styles.title}>
        「Tsukushi Speaker
        僕だけが失くしモノをしない〜あれ、君たちまだインターネットにカメラ繋いで
        ハッカーに監視されてるの？僕はオフラインで安全です〜」
      </div>
      <a
        href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.center}
      >
        <img
          src="/images/tsukushi_speaker.png"
          alt="tsuku4"
          className={styles.img}
        />
      </a>
      <div className={styles.menu}>
        <img src="/images/tsuku4.png" alt="tsuku4" />
      </div>
    </Layout>
  );
};

export default Custom404;
