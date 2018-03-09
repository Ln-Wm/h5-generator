import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { createStore } from './store/store'
Vue.prototype.$http = axios;

let data = window.__INIT_DATA__;
data.height=document.documentElement.clientHeight;
let dom=`
  <style>
    .page{
      position: absolute;
      top: 0;
      left: 0;
    }
    .up-enter-active, .up-leave-active, .down-enter-active, .down-leave-active{
      transition: transform .5s;
      -webkit-transition: -webkit-transform .5s;
    }
    .up-enter,.down-leave-to {
      transform: translate(0,-${data.height}px);
      -webkit-transform: translate(0,-${data.height}px);
    }
    .up-leave-to,.down-enter {
      transform: translate(0,${data.height}px);
      -webkit-transform: translate(0,${data.height}px);
    }
  </style>
`;
$('head').append(dom);
let pages=data.pages.filter(page=>page.type!=2),
    pops=data.pages.filter(page=>page.type==2);
for(let i=0;i<pages.length;i++){
  let page=pages[i];
  if(page.type==0&&page.swipe){
    if(page.target==0 && i<pages.length-1){
      page.target=pages[i+1].id;
    }else if(page.target==0){
      page.target=pages[0].id;
    }
    for(let k in pages){
      if(pages[k].id==page.target){
        pages[k].back=page.id;
      }
    }
  }
}
data.pages=pages;
data.pops=pops;
let store = createStore(data);

const vm=new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
