import { NextPage } from "next";
import { Layout } from "../components/Layout";
import { s } from "../styles/index.stylex";
import stylex from "@stylexjs/stylex";

const Home: NextPage = () => {
  return (
    <Layout
      title="SecHack365-Fans Top Page"
      description="SecHack365 非公式 ファンページ"
    >
      <h1>SecHack365 非公式 ファンページ</h1>
      <div {...stylex.props(s.cautionBox)}>
        <div>
          <span {...stylex.props(s.cautionBoxTitle)}>注意</span>
          このページは修了生よって運営されている
          <div {...stylex.props(s.unofficial)}>非公式</div>
          のファンページです。 公式のページはこちらになります。
        </div>
        <div {...stylex.props(s.officialLink)}>
          <a
            href="https://sechack365.nict.go.jp/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(s.officialLinkA)}
          >
            Webサイト
          </a>
          <a
            href="https://twitter.com/SecHack365"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(s.officialLinkA)}
          >
            Twitter
          </a>
        </div>
      </div>
      <div {...stylex.props(s.gamingSecHack)}>
        <img src="/images/GamingSecHack.gif" alt="GamingSecHack" />
      </div>
    </Layout>
  );
};

export default Home;
