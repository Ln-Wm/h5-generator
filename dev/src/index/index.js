import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { createStore } from './store/store';
Vue.prototype.$http = axios;

let store = createStore(window.__INIT_DATA__);

const vm=new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
