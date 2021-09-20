import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'login',
		component: () => import('./components/login.vue'),
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('./components/main.vue'),
	},
	{
		path: '*',
		name: '404',
		component: () => import('./components/404.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
