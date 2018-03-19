
<template>
<div>
   <h1>{{title}}</h1>
   
   <router-link to="/new">New</router-link>
   <router-link to="/edit/123">Edit</router-link>
   <router-link to="/play/456">Play</router-link>
</div>
</template>

<script>

export default {
   name: 'Home',
   data () {
      return {
         title: 'Home'
      }
   }
}
</script>
<style scoped>
</style>
