const packageName = require("./package.json").name;
module.exports = {
    // 选项...
    devServer: {
        port: 3003,
        host: 'localhost',
        https: false,
        open: true,
        // headers: {
        //     'X-Frame-Options': 'sameorigin',
        // }
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    configureWebpack: {
        output: {
            library: `${packageName}-[name]`,
            libraryTarget: "umd", // 把微应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${packageName}`,
        },
    }
}