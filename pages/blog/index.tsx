import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const redirectUrl = "/blog/2020";

const RedirectPage: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      void router.replace(redirectUrl);
    }
  }, [router]);

  if (!router.isReady) {
    return <Loading />;
  }

  return (
    <Layout>
      <p>
        Redirect to <Link href={redirectUrl}>/blog/2020</Link>
      </p>
    </Layout>
  );
};

export default RedirectPage;

const Loading = () => {
  return (
    <Layout>
      <p>Loading...</p>
    </Layout>
  );
};
