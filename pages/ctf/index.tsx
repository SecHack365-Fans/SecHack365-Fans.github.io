import { VFC } from "react";
import { Layout } from "../../components/Layout";
import Link from "next/link";

const CTF: VFC = () => {
  return (
    <Layout title="" description="">
      <Link href="/ctf/tsukuctf2021">TsukuCTF</Link>
    </Layout>
  );
};

export default CTF;
