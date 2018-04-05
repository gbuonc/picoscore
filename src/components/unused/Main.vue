
<template>
   <div class="app-wrapper">
      <div class="app-header">
         <p>top</p>
      </div>
      <div class="app-content">
         <h1>PicoScore</h1>
      </div>
      <div class="app-footer">
         <Dial :test="msg"/>
      </div>
   </div>
</template>

<script>
import Dial from '@/components/Dial'
export default {
   name: 'Main',
   components: {
      'Dial': Dial
   },
   data () {
      return {
         msg: 'MSG OK'
      }
   }
}
</script>

<style scoped>
   .app-wrapper{
      height:100%;
      background:#efefef;
      display:flex;
      flex-direction:column;
      justify-content:space-around;
      align-items:center;
   }
</style>
