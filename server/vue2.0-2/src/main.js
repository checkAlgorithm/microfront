import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueRouter)

let instance = null;
let router = null

function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/vue2.2/" : "/",
    mode: "hash",
    routes,
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue 2.2] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue 2.2] props from main framework");
  render(props);
}
export async function unmount() {
  console.log('[vue 2.2] unmount')

  if (instance) {
    instance.$destroy();
    instance.$el.innerHTML = "";
    instance = null;
  }
  router = null;
}

