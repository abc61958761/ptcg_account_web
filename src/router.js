import Vue from "vue";
import VueRouter from "vue-router";
import FaceMask from "./views/FaceMask";
import HelloWorld from "./views/HelloWorld";
import Account from './views/Account';

Vue.use(VueRouter);

const routes = [
  { path: "/face-mask", component: FaceMask },
  { path: "/", component: HelloWorld },
  { path: "/account", component: Account}
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
