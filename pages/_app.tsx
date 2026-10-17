import type { AppProps } from "next/app";
import "@stylexswc/webpack-plugin/stylex.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
