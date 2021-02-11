import Vue from "vue";
import App from "./App";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VueRouter from 'vue-router';

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
