import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";

const redurectUrl = "/blog/2020";

const RedirectPage: NextPage = () => {
  const router = useRouter();
  const isReady = router.isReady;

  if (!isReady) {
    return <Loading />;
  }

  router.push(redurectUrl);

  return (
    <Layout>
      <p>
        Redirect to <Link href={redurectUrl}>/blog/2020</Link>
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
