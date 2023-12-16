import type { AppProps } from "next/app";
import inject from "@stylexjs/dev-runtime";
import "../styles/globals.css";

if (process.env.NODE_ENV !== "production") {
  inject({
    classNamePrefix: "x-",
    dev: true,
    test: false,
    useRemForFontSize: false,
    runtimeInjection: false,
    styleResolution: "application-order",
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
