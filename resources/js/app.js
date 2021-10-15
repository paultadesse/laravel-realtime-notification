require("./bootstrap");

window.Vue = require("vue").default;

import routes from "./routes";
import VueRouter from "vue-router";
import Vue from "vue";
import store from "./store";


Vue.use(VueRouter);

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);


const app = new Vue({
    el: "#app",
    store,
    router: new VueRouter(routes)
});
