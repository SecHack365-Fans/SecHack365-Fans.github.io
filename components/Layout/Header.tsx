import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Header: React.FC<Props> = ({ title, description }: Props) => {
  const defaultTitle = "SecHack365-Fans";
  const defaultDescription =
    "このサイトはSecHack365修了生よって運営されている非公式ののファンページです。";
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
        content="https://fans.sechack365.com/images/tsukuctf-logo.png"
      />
    </Head>
  );
};

export default Header;
