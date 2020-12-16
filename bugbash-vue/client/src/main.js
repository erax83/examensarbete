import Vue from "vue";
import App from "./App";
import { store } from "./store/store";

Vue.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

// new Vue({
//   el: "#app",
//   store,
//   render: (h) => h(App),
// });

// new Vue({
//   el: "#app",
//   store,
//   components: { App },
//   template: "<App/>",
// });
