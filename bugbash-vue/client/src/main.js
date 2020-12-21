import Vue from "vue";
import App from "./App";
import { store } from "./store/store";
import VueCollapse from "vue2-collapse";

Vue.config.productionTip = false;
Vue.use(VueCollapse);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

