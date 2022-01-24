import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Oneiframe from "../views/Oneiframe.vue";
import AllIframe from "../views/AllIframe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vue2.1",
    name: "vue2.1",
    component: Oneiframe,
  }, {
    path: "/vue2.2",
    name: "vue2.2",
    component: Oneiframe,
  },
  {
    path: "/vue3.0",
    name: "vue3.0",
    component: Oneiframe,
  },
  {
    path: "/react",
    name: "react",
    component: Oneiframe,
  },
  {
    path: "/other",
    name: "other",
    component: Oneiframe,
  },
  {
    path: "/all",
    name: "all",
    component: AllIframe,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
