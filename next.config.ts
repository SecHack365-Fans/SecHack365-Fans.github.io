import stylexPlugin from "@stylexswc/nextjs-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default stylexPlugin({
  useCSSLayers: true,
  nextjsAppRouterMode: false,
})(nextConfig);
