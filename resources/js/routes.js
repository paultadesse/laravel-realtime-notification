
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";
import Home from "./components/views/Home";



export default {
    mode: "history",
    linkActiveClass: "border-b-2 border-t-2 border-gray-400 text-gray-500 ",
    routes: [

        {
            path: "/home",
            component: Home,
            name: "Home",
            // beforeEnter: (to, from, next) => {
            //     store.getters["Auth/isAuth"] ? next("/") : next();
            // }
        },
        {
            path: "/login",
            component: Login,
            name: "Login",
            // beforeEnter: (to, from, next) => {
            //     store.getters["Auth/isAuth"] ? next("/") : next();
            // }
        },
        {
            path: "/register",
            component: Register,
            name: "Register",
            // beforeEnter: (to, from, next) => {
            //     store.getters["Auth/isAuth"] ? next("/") : next();
            // }
        },

    ]
};
