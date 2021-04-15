import Vue from "vue";
import VueRouter from "vue-router";

import ErrorListView from "./views/ErrorListView";
import ErrorDetailView from "./views/ErrorDetailView";
import UserSignIn from "./views/UserSignIn";
import UserById from "./views/UserById";
import About from "./views/About";

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
           { path: "/usersignin", name: "usersignin", component: UserSignIn },
           { path: "/userById/:id", name: "userById", component: UserById },
           { path: "/about", component: About },
         ],
       });
