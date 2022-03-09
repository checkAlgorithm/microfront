import { registerMicroApps, start } from "./lib/qiankun/index"

const microFn = () => {
    registerMicroApps([
        {
            name: 'vue2.1App',
            entry: '//localhost:3001',
            container: '#container',
            activeRule: '/vue2.1',
        },
        {
            name: 'vue2.2App',
            entry: '//localhost:3002',
            container: '#container',
            activeRule: '/vue2.2',
        },
        {
            name: 'vue3.0App',
            entry: '//localhost:3003',
            container: '#container',
            activeRule: '/vue3.0',
        },
        {
            name: 'reactApp',
            entry: '//localhost:3000',
            container: '#container',
            activeRule: '/react',
        },
    ])

    start()
}


export default microFn