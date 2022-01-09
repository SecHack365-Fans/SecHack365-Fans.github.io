import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Header: React.FC<Props> = ({ title, description }: Props) => {
  const defaultDescription = "AAAAAAAAAAAAAAAAAAAAAAAAA";
  const defaultTitle = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  return (
    <Head>
      <title>{title ? title : defaultTitle}</title>
      <meta
        name="description"
        content={description ? description : defaultDescription}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta name="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:image"
        content="https://opengraph.githubassets.com/139256f8ccf77c03f7d9d1b51e30822cb3d14d45abeae53f15384cefc9c7e9da/SecHack365-Fans/SecHack365-Fans.github.io"
      />
    </Head>
  );
};

export default Header;
