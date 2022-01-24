import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerMicroApps, start } from 'qiankun';

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
  }
]);
// 启动 qiankun
start();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
