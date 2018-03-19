
<template>
   <div>
      <h1>{{title}}</h1>
      <p>{{ $route.params.scoreId }}</p>
      <router-link to="/">home</router-link>
   </div>
</template>

<script>
export default {
   name: 'Play',
   data () {
      return {
         title: 'Play Score'
      }
   }
}
</script>
<style scoped>
</style>
