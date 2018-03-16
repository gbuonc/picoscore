import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex';
import Main from '@/components/Main'


Vue.use(Router)
Vue.use(Vuex)
const store = new Vuex.Store({
   state: {
     count: 0
   },
   mutations: {
     increment (state) {
       state.count++
     }
   }
 })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
