var path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "module:metro-react-native-babel-preset",
      // "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
      [
        "@babel/preset-env",
        {
          loose: true,
        },
      ],
    ],
    plugins: [
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  };
};
