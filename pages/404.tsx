import { Layout } from "../components/Layout";

import styles from "../styles/404.module.css";

const Custom404 = () => {
  return (
    <Layout title="404 not found">
      <h1>404 Not Found</h1>
      <div className={styles.menu}>
        <img src="/images/tsuku4.png" alt="tsuku4" />
      </div>
    </Layout>
  );
};

export default Custom404;
