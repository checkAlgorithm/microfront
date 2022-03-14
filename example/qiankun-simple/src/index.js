import { handleRouter } from './handle-router.js'
import { rewriteRouter } from './rewrite-router.js'
var _apps = []
export const getApps = () => _apps
// 注册应用
export const registerMicroApps = (apps) => {
    _apps = apps
}

// 启动
export const start = () => {
    // 微前端的运行原理：
    // 1、监听路由变化
    rewriteRouter() // 首次渲染需要调用
    handleRouter() 
}