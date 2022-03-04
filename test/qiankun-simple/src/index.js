import { rewriteRouter } from './rewrite-router.js'
var _apps = []

// 注册应用
export const registerMicroApps = (apps) => {
    console.log(apps)
    _apps = apps
}

// 启动
export const start = () => {
    // 微前端的运行原理：
    // 1、监听路由变化
    rewriteRouter

    // 2、匹配字应用

    // 3、加载字应用

    // 4、渲染字应用

}