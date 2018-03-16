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
        edit:init.pages[0]||{},
        block:{},
        item:{},
        add:{},
        editForm:false
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
              state.edit=state.pages[n];
              state.editForm='page';
          },
          changeEditBlock (state,n) {
              state.editBlock=n;
              state.block=state.pages[state.editing].blocks[state.editBlock];
              state.editForm='block';
          },
          changeEditItem (state,n) {
              state.editItem=n;
              state.item=state.pages[state.editing].blocks[state.editBlock].items[state.editItem];
              state.editForm='item';
          },
          resetEdit (state) {
              state.editing=0;
              state.editBlock=0;
              state.editItem=0;
          },
          changeAdd (state,obj) {
              state.add=obj;
          },
          changeSize (state,obj) {
              state.item.top=obj.top;
              state.item.left=obj.left;
              state.item.width=obj.width;
              state.item.height=obj.height;
          },
          updateTitle(state,title){
            state.title=title
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
