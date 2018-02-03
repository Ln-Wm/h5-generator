import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store/store'

let store = createStore(window.__INIT_DATA__);

const vm=new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
