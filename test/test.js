/**
 * params: root factory
 * root: window
 * factory: 内部函数 子应用代码 return { ... } 导出结果
 */
(function webpackUniversalModuleDefinition(root, factory) {

    // commonjs 规范
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object') 
        exports["v2.0-1-app"] = factory();
    else
        root["v2.0-1-app"] = factory();
})(window, function () {
    // code

    return {
        bootstrap: fn
    }
})


module.exports = {
    bootstrap: fn
}

exports = {
    
}

export function bootstrap () {
    return {

    }
}