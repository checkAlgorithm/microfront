const packageName = require("./package.json").name;
module.exports = {
  // 选项...
  devServer: {
    port: 3001,
    host: "localhost",
    https: false,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // headers: {
    //     'X-Frame-Options': 'sameorigin',
    // }
  },
  configureWebpack: {
    mode: 'development',
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
};
