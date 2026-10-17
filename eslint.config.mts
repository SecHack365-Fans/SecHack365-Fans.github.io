import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import stylex from "@stylexjs/eslint-plugin";

export default defineConfig([
  ...nextVitals,
  {
    plugins: {
      "@stylexjs": stylex,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "@stylexjs/valid-styles": "error",
    },
  },
  globalIgnores([".next/**", "out/**"]),
]);
