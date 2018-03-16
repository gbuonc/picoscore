<template>
   <h3>Dial {{test}}</h3>
</template>

<script>
import ZingTouch from 'zingtouch';
export default {
   name: 'Dial',
   props:['test'],
   data () {
      return {
         msg: ''
      }
   }
}
</script>

<style scoped>
   
</style>
