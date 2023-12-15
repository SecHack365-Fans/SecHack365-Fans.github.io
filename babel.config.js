const styleXPlugin = require("@stylexjs/babel-plugin");

const config = {
  plugins: [
    [
      styleXPlugin,
      {
        dev: true,
        // Set this to true for snapshot testing
        // default: false
        test: false,
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: "commonJS",
          // The absolute path to the root directory of your project
          rootDir: __dirname,
        },
      },
    ],
  ],
};

module.exports = config;
