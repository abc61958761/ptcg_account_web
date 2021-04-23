import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "./views/HelloWorld";
import PurchaseRecord from "./views/PurchaseRecord";
import Inventory from "./views/Inventory";
import SoldRecord from "./views/SoldRecord";
import SettlementRecrod from "./views/SettlementRecrod";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/purchase-record", component: PurchaseRecord },
  { path: "/inventory", component: Inventory },
  { path: "/sold-record", component: SoldRecord },
  { path: "/settlement-recrod", component: SettlementRecrod }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
