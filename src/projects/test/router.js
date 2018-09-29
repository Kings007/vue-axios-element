export default {
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('./pages/index'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./pages/login'),
    },
  ],
};
