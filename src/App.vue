<template>
  <div id="app">
   <transition name="fade" mode="out-in">
      <router-view/>
   </transition>
  </div>
</template>

<script>
import store from './store';
export default {
  name: 'App',
  store
}
</script>

<style>
html, body{margin:0; padding:0; height:100%;}
#app {
   max-width:700px;
   margin: 0 auto;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   align-items: center;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   position:relative;
   height:100%;
   overflow:hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  transition-duration:200ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
