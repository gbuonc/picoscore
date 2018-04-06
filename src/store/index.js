import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   state: {
      // jogAngle:0,
      melodyArray:[{type:'bar', value:'|'}],
      currentlyEditingId:0,
   },
   getters: {
      scoreContent: state =>{
         return state.melodyArray.map(item => item.value).join(''); // convert array to string to use with notation libs
      },
      notesInScore: state =>{
         return state.melodyArray.filter(item => item.type==='note'); // get array of notes only
      }
   },
   mutations: {
      updateJogAngle (state, payload){
         state.jogAngle += payload.angle
      },
      addToScore (state, payload){
         const itemToEditPosition = state.melodyArray.map(item=>item.id).indexOf(state.currentlyEditingId);
         const isEditing = itemToEditPosition >= 0 ? true : false;
         if(isEditing){
            state.melodyArray.splice(itemToEditPosition, 1, payload); // use splice to trigger reactivity
            state.currentlyEditingId=0;
         }else{
            state.melodyArray.push(payload);
         }
      },
      editElement (state, payload){
         state.currentlyEditingId = payload.noteId;
      },
      clearScore (state, payload){
         state.melodyArray = ['|'];
      }
   }
})
export default store
