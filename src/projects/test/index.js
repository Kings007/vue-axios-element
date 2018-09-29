import mountApp from '../mountApp';

mountApp(require('./index.vue').default, {
  router: require('./router').default,
});
