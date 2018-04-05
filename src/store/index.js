import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   state: {
      // jogAngle:0,
      melodyArray:['|','a',' ','b','c']
   },
   getters: {
      scoreContent: state =>{
         return state.melodyArray.join(''); // convert array to string to use with notation libs
      }
   },
   mutations: {
      updateJogAngle (state, payload){
         state.jogAngle += payload.angle
      },
      addNoteToScore (state, payload){
         state.melodyArray.push(payload.note);
      },
   }
})
export default store
