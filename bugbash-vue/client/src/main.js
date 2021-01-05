import Vue from "vue";
import App from "./App";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);


Vue.config.productionTip = false;


new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

