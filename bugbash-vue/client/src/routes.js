import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "./views/Home";
import ErrorListView from "./views/ErrorListView";
import ErrorDetailView from "./views/ErrorDetailView";
import User from "./views/User";
import UserById from "./views/UserById";
import About from "./views/About";
import Errorstest from "./views/Errorstest";
import Errortest from "./views/Errortest";

Vue.use(VueRouter);

export const router = new VueRouter({
         mode: "history",
         routes: [
           { path: "", component: ErrorListView },
           {
             path: "/errordetailview/:id",
             name: "errorInfo",
             component: ErrorDetailView,
           },
           { path: "/user", name: "user", component: User },
           { path: "/userById", name: "userById", component: UserById },
           { path: "/about", component: About },
           { path: "/errorstest", component: Errorstest },
           { path: "/errortest/:id", name: "err", component: Errortest },
         ],
       });
