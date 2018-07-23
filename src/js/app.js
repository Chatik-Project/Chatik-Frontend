import '../css/style.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './router.js';
import App from './App.vue';
import { store } from './store/index.js';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: 'active',
    routes: routes
});

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
});