export const rewriteRouter = () => {
    const originPushstate = window.history.pushState
    const originReplacestate = window.history.replaceState

    // 1.1 hash 路由 window.onhashChange
    window.addEventListener('hashchange', function () {
        console.log('hash 改变了')
    })
    // 1.2history 路由
    //1、history.go()/history.back()/history.forward() popstate事件： window.onpopstate
    window.addEventListener('popstate', function () {
        console.log('popstate 改变了')
    })
    // 2、pushState\replaceState 重写进行劫持
    window.history.pushState = function () {
        console.log('push State 触发了')
        originPushstate.apply(this, arguments)
    }
    window.history.replaceState = function () {
        console.log('replaceState 触发了')
        originReplacestate.apply(this, arguments)
    }

}
