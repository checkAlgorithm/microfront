import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueCookie from 'vue-cookie';


Vue.config.productionTip = false;
Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
    arrow: 'md-arrow-dropdown',
    arrowSize: 20
  }
});
Vue.use(VueCookie)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
