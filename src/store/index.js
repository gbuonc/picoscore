import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   state: {
      count: 1,
      pending: false,
      todos: [
         { id: 1, text: '...', done: true },
         { id: 2, text: '...', done: false }
      ],
      // below this line starts serious shit...
      jogAngle:0
   },
   getters: {
      doneTodos: state => {
         return state.todos.filter(todo => todo.done)
      }
   },
   mutations: {
      updateJogAngle (state, payload){
         state.jogAngle += payload.angle
      },
      increment (state, payload) {
         state.count += payload.amount
      },
      decrement (state, payload) {
         state.count -= payload.amount
      }
   },
   actions: {
      incrementAsync (context, payload) {
         setTimeout(() => {
            context.commit('increment', payload)
         }, 300)
      }
   }
})
export default store
