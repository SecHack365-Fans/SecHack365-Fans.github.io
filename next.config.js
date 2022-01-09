/** @format */

const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};

module.exports = withPlugins([[optimizedImages, {}]], {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
