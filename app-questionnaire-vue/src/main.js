import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue'
import PouchDB from 'pouchdb';
import App from './App.vue'
import router from './router'
Vue.prototype.$pouchdb = new PouchDB('questionnaire');
Vue.prototype.$pouchdb.sync('http://127.0.0.1:5984/questionnaire');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
