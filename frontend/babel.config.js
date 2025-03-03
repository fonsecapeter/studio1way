module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/typescript",
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
}
