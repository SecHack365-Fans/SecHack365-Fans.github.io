import { Layout } from "../components/Layout";

import { s } from "../styles/404.stylex";
import stylex from "@stylexjs/stylex";

const Custom404 = () => {
  return (
    <Layout title="404 not found">
      <h1>404 Not Found</h1>
      <div {...stylex.props(s.container)}>
        <img src="/images/tsuku4.png" alt="tsuku4" {...stylex.props(s.logo)} />
      </div>
    </Layout>
  );
};

export default Custom404;
