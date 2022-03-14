import { handleRouter } from './handle-router.js'

var preRoute = ''
var nextRoute = ''

export const getPreRoute = () => preRoute
export const getNextRoute = () => nextRoute

export const rewriteRouter = () => {
    const originPushstate = window.history.pushState
    const originReplacestate = window.history.replaceState
    // if (window.location.hash) {
    //     // 1.1 hash 路由 window.onhashChange
    //     window.addEventListener('hashchange', function () {
    //         console.log('hash 改变了')
    //         handleRouter()
    //     })
    //     return
    // }

    // 1.2history 路由
    //1、history.go()/history.back()/history.forward() popstate事件： window.onpopstate
    window.addEventListener('popstate', function () {
        console.log('popstate 改变了')
        preRoute = nextRoute
        nextRoute = window.location.pathname
        handleRouter()
    })

    // 2、pushState\replaceState 重写进行劫持
    window.history.pushState = function () {
        console.log('push State 触发了', arguments)
        preRoute = window.location.pathname
        originPushstate.apply(window.history, arguments)
        nextRoute = window.location.pathname
        handleRouter()
    }

    window.history.replaceState = function () {
        console.log('replaceState 触发了', arguments)
        preRoute = window.location.pathname
        originReplacestate.apply(window.history, arguments)
        nextRoute = window.location.pathname
        handleRouter()
    }
}
