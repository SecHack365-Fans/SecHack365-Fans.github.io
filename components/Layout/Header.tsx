import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Header: React.FC<Props> = ({ title, description }: Props) => {
  const defaultTitle = "SecHack365-Fans";
  const defaultDescription =
    "このサイトはSecHack365修了生によって運営されている非公式のファンページです。";
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:image"
        content="https://tsukuctf.org/images/tsukuctf-logo.png"
      />
    </Head>
  );
};

export default Header;
