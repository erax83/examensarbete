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

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueHtml2Canvas);
Vue.use(ImageUploader);
Vue.use(LoaderPlugin, {
  client_id: process.env.VUE_APP_GOOGLECLIENT_ID,
});
Vue.use(VModal);

new Vue({
  VueMeta,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


