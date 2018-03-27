
<template>
   <div>
      <h1>{{title2}} {{counter}}</h1>
      <p>{{ $route.params.scoreId }}</p>
      <p>{{toDos}}</p>
      <router-link :to="{name: 'landing', params: { skipPendingRedirect: true }}">home</router-link>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
   name: 'Edit',
   data () {
      return {
         title: 'Edit Score'
      }
   },
   computed:{
      title2: function(){return this.title+'!'},
      ...mapState({
         counter: 'count'
      }),
      ...mapGetters({
         toDos : 'doneTodos'
      })
   },
   methods:{
      // incrementCounter : function(){
      //    this.$store.commit('increment', {amount:10})
      // },
      // decrementCounter: function(){
      //    this.$store.commit('decrement', {amount:1})
      // },
      // async: function(){
      //    this.$store.dispatch('incrementAsync', {amount:1} )
      // }
   }
   
}
</script>
<style scoped>
</style>
