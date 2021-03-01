import Vue from "vue";
import App from "./App";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { router } from "./routes";
// import GoogleSignInButton from "vue-google-signin-button-directive";
import VueMeta from "vue-meta";



library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.use(VueMeta);

new Vue({
  VueMeta,
  router,
  store,
  // GoogleSignInButton,
  render: (h) => h(App),
}).$mount("#app");
