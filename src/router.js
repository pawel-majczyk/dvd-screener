import Vue from 'vue';
import Router from 'vue-router';
import dvdHome from './views/dvdHome.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: dvdHome, // switch from home to avoid extra wrapper
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/dvdAbout.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
