const packageName = require("./package.json").name;
module.exports = {
    // 选项...
    devServer: {
        port: 3002,
        host: 'localhost',
        https: false,
        open: false,
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