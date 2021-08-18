import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('./components/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('./components/main.vue')
    },
    {
        path: '/Search',
        name: 'Search',
        component: () => import('./components/Search.vue')
    },
    {
        path: '/SongSheet',
        name: 'SongSheet',
        component: () => import('./components/SongSheet.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
