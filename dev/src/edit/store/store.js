import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export function createStore(init) {
    let state={
        editing:0,
        editBlock:0,
        editItem:0,
        pageIndex:0,
        add:{}
    }
    state=Object.assign(state,init||{});
    console.log(state)
    return new Vuex.Store({
        state:state || {},
        mutations: {
          pageInc (state) {
              state.pageIndex++;
          },
          changeEditing (state,n) {
              state.editing=n;
          },
          changeEditBlock (state,n) {
              state.editBlock=n;
          },
          changeEditItem (state,n) {
              state.editItem=n;
          },
          changeAdd (state,obj) {
              state.add=obj;
          },
        },
        actions: {
          save({ state }) {
            const api = '/edit/saveAjax';
            return new Promise((resolve,reject)=>{
              axios.post(api, state)
              .then(res => {
                  if(res.data.success){
                      resolve(res.data);
                  }else{
                      reject(res.data);
                  }
              });
            });
          },
        },
    });
}
