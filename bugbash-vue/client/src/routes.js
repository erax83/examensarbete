import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";
import About from "./views/About";
import Errorstest from "./views/Errorstest";
import Errortest from "./views/Errortest";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/errorstest", component: Errorstest },
    //  { path: "/errortest/:id", component: Errortest },
    { path: "/errortest/:id", name: "err", component: Errortest },
  ],
});
