import Vue from 'vue';
import Router from 'vue-router';
// import dvdHome from './views/dvdHome.vue';
import dvdTele from './components/dvdTele.vue';
import _3Dcomponent from './components/three.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: dvdTele, // switch from home to avoid extra wrapper
    },
    {
      path: '/three',
      name: 'three',
      component: _3Dcomponent,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/dvdAbout.vue'),
    },
  ],
});
