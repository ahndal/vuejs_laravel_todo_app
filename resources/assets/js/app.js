import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue'
import { store } from './store/store'

const routes = [
    //   {
    //     name: 'CreateItem',
    //     path: '/items/create',
    //     component: CreateItem
    //   },
    //   {
    //     name: 'DisplayItem',
    //     path: '/',
    //     component: DisplayItem
    //   },
    //   {
    //     name: 'EditItem',
    //     path: '/edit/:id',
    //     component: EditItem
    //   }
];
const router = new VueRouter({ routes: routes });

new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App),
    created() {
        this.$store.dispatch('loadData')
    }
});