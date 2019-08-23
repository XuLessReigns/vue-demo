import Vue from 'vue';
import App from './App.vue';
// import './base/globalData';
import router from './router';
import VueTouch from './VueTouch'

import ilog from './base/ilog';
ilog.install(Vue);

Vue.config.productionTip = false;
Vue.use(VueTouch);

new Vue({
  	router,
  	render: h => h(App),
}).$mount('#app');
