import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import microFn from './single-spa';
import microFn from './qiankun';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

microFn()