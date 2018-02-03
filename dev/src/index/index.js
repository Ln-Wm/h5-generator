import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'
import { createStore } from './store/store'
Vue.prototype.$http = axios;

Vue.use(ElementUI);

let store = createStore(window.__INIT_DATA__);
const vm=new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
