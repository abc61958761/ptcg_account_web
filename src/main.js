import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from './router.js';
import { createStore } from './store';

Vue.config.productionTip = false;
const store = createStore();


new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
