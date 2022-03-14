import { registerApplication, start } from './lib/single-spa/app'
const microFn = () => {

    const setConfig = (appName) => {
        return {
            bootstrap: async () => {
                console.log(`${appName} bootstrap`)
                // return `${appName} bootstrap`
            },
            mount: async () => {
                console.log(`${appName} mount`)
                console.log('=======================')
                // return `${appName} mount`
            },
            unmount: async () => {
                console.log(`${appName} unmount`)
                // return `${appName} unmount`
            },
        }
    }

    const registerList = ['vue2.1', 'vue2.2', 'vue3.0', 'react']
    // 注册app
    registerList.forEach((name) => {
        registerApplication(
            name, // appName // 应用名，防止重复加载
            async () => setConfig(name), // loadApp // 加载异步函数(bootstrap, mount, unmount)
            (location) => location.href.includes('/' + name), // activeWhen // 激活应用的条件，参数location
            { user: name, age: 12 }  // 父应用传入的common data
        )
    })

    start() // 启动app
}

export default microFn
