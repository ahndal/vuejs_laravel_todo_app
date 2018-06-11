import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import Todo from './components/todo/Todo.vue'
import { store } from './store/store'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

const router = new VueRouter({
    routes: [{
        name: 'home',
        path: '/',
        component: Home
    }, {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            auth: false
        }
    }, {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            auth: false
        }
    }, {
        name: 'todo',
        path: '/todo',
        component: Todo,
        meta: {
            auth: true
        }
    }]
})

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
});