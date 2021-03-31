import Vue from "vue";
import App from "./App";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { router } from "./routes";
import VueMeta from "vue-meta";
import VueHtml2Canvas from "vue-html2canvas";
import ImageUploader from "vue-image-upload-resize";
import { LoaderPlugin } from "vue-google-login";
import VModal from "vue-js-modal";
// import VueCookies from "vue-cookies";

// import persistentState from "vue-persistent-state";

// let initialState = {
//   str: "persist me",
//   obj: {
//     a: "nested object",
//   },
//   number: 42,
//   arr: ["item 0"],
// };

// Vue.use(persistentState, initialState);

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueHtml2Canvas);
Vue.use(ImageUploader);

Vue.use(LoaderPlugin, {
  client_id: process.env.VUE_APP_GOOGLECLIENT_ID,
});

Vue.use(VModal);

// Vue.use(VueCookies);
// // set default config
// Vue.$cookies.config("7d");
// // set global cookie
// Vue.$cookies.set("theme", "default");
// Vue.$cookies.set("hover-time", "1s");


new Vue({
  VueMeta,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


