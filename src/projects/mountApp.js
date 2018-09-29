/* eslint-disable */
// 未知原因，babel.config 上使用的默认配置 es7.promise.finally 未生效
// 手动 shim
// https://github.com/matthew-andrews/Promise.prototype.finally/blob/master/finally.js
window.Promise.prototype['finally'] = function finallyPolyfill(callback) {
  const constructor = this.constructor;
  return this.then(function (value) {
    return constructor.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return constructor.resolve(callback()).then(function () {
      throw reason;
    });
  });
};
/* eslint-enable */
/* eslint-disable import/first */
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import '../global/global.scss';
import Api from '../services/api';


Vue.use(Vuex);
Vue.use(Router);
Vue.use(ElementUI);
Vue.config.productionTip = false;

export default async function mountApp(Component, optionsArg = {}) {
  const options = {
    store: {},
    ...optionsArg,
  };

  const storeInstance = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      ...options.store.state,
    },
    mutations: {
      ...options.store.mutations,
    },
    actions: {
      ...options.store.actions,
    },
    modules: {
      ...options.store.modules,
    },
  });

  const routerInstance = new Router({
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0};
      }
    },
    ...options.router,
  });
  Vue.prototype.$api = Api;
  Window.$message = Message;
  // console.log(Window.prototype);

  /**
   * 必须用户执行登录之后才可以访问
   */
  routerInstance.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !sessionStorage.isLogin) {
      next('login');
    } else {
      next();
    }
  });

  new Vue({
    router: routerInstance,
    store: storeInstance,
    render: h => h(Component),
  }).$mount('#app');
}
