import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export function createStore(init) {
    let state={
        pageShow:init.pages[0].id,
        popShow:false,
        start:0,
    }
    state=Object.assign(state,init||{});
    return new Vuex.Store({
        state:state || {},
        mutations: {
          jump (state,id) {
            state.pageShow=state.pages.find(page => page.id == id).id;
          },
          openPop(state,id){
            state.popShow=state.pops.find(pop => pop.id == id).id;
          },
          closePop(state){
            state.popShow=false;
          },
          changeStart(state,h){
            state.start=h
          },
        }
    });
}
