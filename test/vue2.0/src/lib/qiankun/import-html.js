export const importHtml = async (url) => {
    var template = document.createElement('div')
    const html = await fetchResource(url)
    template.innerHTML = html

    // 获取子应用的script下的html
    const getExternalScript = () => {
        var scriptDom = template.querySelectorAll('script')
        return Promise.all(Array.from(scriptDom).map((source) => {
            var src = source.getAttribute('src')
            if (src) {
                return fetchResource(src.startsWith('http') ? src : url + src)
            } else {
                return Promise.resolve(source.innerHTML)
            }
        }))
    }

    // 执行script的代码
    const execScripts = async () => {
        const scripts = await getExternalScript()
        // 手动构造一个commonjs
        const module = { exports: {} }
        const exports = module.exports
        scripts.forEach((code) => {
            eval(code)
        })
        // unmount()
        return module.exports
    }

    return {
        template,
        getExternalScript,
        execScripts
    }
}

const fetchResource = (url) => {
    return fetch(url).then(res => res.text())
}