import Vue from "vue";
import VueRouter from "vue-router";

import PurchaseRecord from "./views/PurchaseRecord";
import Inventory from "./views/Inventory";
import SoldRecord from "./views/SoldRecord";
import SettlementRecrod from "./views/SettlementRecrod";
import SettlementDetail from "./views/SettlementDetail";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: PurchaseRecord, alias: "/purchase-record" },
  { path: "/inventory", component: Inventory },
  { path: "/sold-record", component: SoldRecord },
  { path: "/settlement-recrod", component: SettlementRecrod },
  { path: "/settlement-detail", component: SettlementDetail },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
