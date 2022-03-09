import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import { createRouter, createWebHashHistory } from "vue-router";

let instance = null;
let router = null
function render(props = {}) {
    const { container } = props;
    router = createRouter({
        history: createWebHashHistory(),
        base: window.__POWERED_BY_QIANKUN__ ? "/vue3.0/" : "/",
        routes,
    });

    instance = createApp(App).use(store).use(router)
    instance.mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log("[vue 3.0] vue app bootstraped");
}
export async function mount(props) {
    console.log("[vue 3.0] props from main framework", props);
    render(props);
}
export async function unmount() {
    console.log('[vue 3.0] unmount')

    if (instance) {
        // instance.$destroy();
        // instance.$el.innerHTML = "";
        instance = null;
    }
    router = null;
}