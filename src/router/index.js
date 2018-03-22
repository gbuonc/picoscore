import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/views/home'
import New from '@/views/new'
import Edit from '@/views/edit'
import Play from '@/views/play'
import NotFound from '@/views/notFound'

Vue.use(Router)
const routes = [
   // { path: '/home', component: Home, name:'hp'},
   { path: '/', component: Home, name:'landing'},
   { path: '/new', component: New, name:'new'},
   { path: '/edit/:scoreId', component: Edit, name:'edit' },
   { path: '/play/:scoreId', component: Play },
   { path: '*', component: NotFound },
]
const router = new Router({
   mode: 'history',
   routes
})

router.beforeEach((to, from, next) => {
   // REDIRECT ON APP FIRST LOAD
   if(to.name === 'landing' && !to.params.skipPendingRedirect){
      if(store.state.pending){
         // check if there is an unsaved pending score and redirect to edit page
         next({
            path: '/edit/'+store.state.pending,
         })
      }else{
         // if no pending scores, create a new one
         next({
            path: '/new'
         })
      }
   }else{
      next();
   }
})
export default router
