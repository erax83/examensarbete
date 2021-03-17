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
// import VueGapi from "vue-gapi";

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueHtml2Canvas);
Vue.use(ImageUploader);
 Vue.use(LoaderPlugin, {
   client_id:
     "239286565520-4olejvir9qtbmtsbdrn82lakb1gls3qp.apps.googleusercontent.com",
 });
// Vue.use(VueGapi, {
//   apiKey: "<YOUR_API_KEY>",
//   clientId:
//     "239286565520-4olejvir9qtbmtsbdrn82lakb1gls3qp.apps.googleusercontent.com",
//   discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
//   scope: "https://www.googleapis.com/auth/spreadsheets",
// });

new Vue({
  VueMeta,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
