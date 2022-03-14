var _apps = []
export const getApps = () => _apps
// 注册应用

// qiankun
// name: 'vue2.1App',
// entry: '//localhost:3001',
// container: '#container',
// activeRule: '/vue2.1',

//single spa
// name,
// async () => setConfig(name),
// (location) => location.href.includes('/' + name), 
// { user: name, age: 12 } 
export const registerMicroApps = (apps) => {
    _apps = apps
    // 参数重整

    const singleApps = apps.map(async (app) => {
        let { name, entry, container, activeRule } = app
        return {
            name
        }
    })
    // 参数重整
    console.log(singleApps)
}

// 启动
export const start = () => {

}