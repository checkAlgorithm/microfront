import { getApps } from "./index"
import { importHtml } from "./import-html"
import { getNextRoute, getPreRoute } from "./rewrite-router"
export const handleRouter = async () => {
    // debugger

    // 1、匹配子应用
    const apps = getApps()
    // 加载前需要卸载应用
    const preApp = apps.find((app) => getPreRoute().startsWith(app.activeRule))
    if (preApp) {
        unmount(preApp)
    }
    const app = apps.find((item) => getNextRoute().startsWith(item.activeRule))
    // 2、加载子应用
    if (!app) {
        return
    }
    window.__POWERED_BY_QIANKUN__ = true
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + "/"
    const { template, execScripts } = await importHtml(app.entry)
    const container = document.querySelector(app.container)
    if (!container) return
    // debugger
    container.appendChild(template)

    const execApp = await execScripts()
    app.bootstrap = execApp.bootstrap
    app.mount = execApp.mount
    app.unmount = execApp.unmount

    bootstrap(app)
    mount(app)
    // unmount(app)

    // 4、渲染子应用
}


async function bootstrap(app) {
    app.bootstrap && await app.bootstrap()
}

async function mount(app) {
    app.mount && await app.mount({
        container: document.querySelector(app.container)
    })
}

async function unmount(app) {
    console.log("unmount:", app.name)
    app.unmount && await app.unmount({
        container: document.querySelector(app.container)
    })
}