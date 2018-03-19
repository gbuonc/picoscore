
<template>
   <div>
      <h1>{{title}}</h1>
      <router-link to="/">home</router-link>
   </div>
</template>

<script>

export default {
   name: 'New',
   data () {
      return {
         title: '404 :-('
      }
   }
}
</script>
<style scoped>
</style>
