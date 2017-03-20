import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route.js'
import store from './store'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

document.addEventListener('DOMContentLoaded', function() {
  if (window.FastClick) window.FastClick.attach(document.body);
}, false);

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.axios.defaults.baseURL = store.state.baseURL;

Vue.axios.interceptors.request.use((request) => {
  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      request.data = qs.stringify(request.data);
  }
  return request;
});

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
    indexScrollTop = document.body.scrollTop;
  }

  if(route.path !== '/login' && !store.state.logged) {
    next({path: '/login', query: {redirect: route.fullPath}})
  } else {
    next();
  }

  // document.title = route.meta.title || document.title;
});

router.afterEach(route => {
  if (route.path !== '/') {
    document.body.scrollTop = 0;
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop;
    });
  }
});
