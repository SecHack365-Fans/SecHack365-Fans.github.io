import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import Router from "next/router";

const redurectUrl = "/blog/2020";

const RedirectPage: NextPage = () => {
  return (
    <Layout>
      <p>
        Redirect to <Link href={redurectUrl}>/blog/2020</Link>
      </p>
    </Layout>
  );
};

RedirectPage.getInitialProps = async ({ res }) => {
  // サーバー側でリダイレクト
  if (typeof window === "undefined") {
    res?.writeHead(302, { Location: redurectUrl });
    res?.end();
    return {};
  }

  // クライアント側でリダイレクト
  Router.push(redurectUrl);

  return {};
};

export default RedirectPage;
