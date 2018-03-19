
<template>
   <div>
      <h1>{{title}}</h1>
      <router-link :to="{name: 'landing', params: { skipPendingRedirect: true }}">home</router-link>
   </div>
</template>

<script>

export default {
   name: 'New',
   data () {
      return {
         title: 'New Score'
      }
   },
   created:function(){
      console.log(this.$route, this.$router);
   }
}
</script>
<style scoped>
</style>
