import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export function createStore(init) {
    let state={
        editing:0,
        pageIndex:0
    }
    state=Object.assign(state,init||{});
    console.log(state)
    return new Vuex.Store({
        state:state || {},
        mutations: {
            pageInc (state) {
                state.pageIndex++;
            },
        },
        actions: {
            save({ state }) {
                const api = '/edit/saveAjax';
                axios.post(api, state)
                .then(res => {
                    if(res.data.success){
                        console.log(1);
                    }else{
                        console.log(2);
                    }
                });
            },
        },
    });
}
