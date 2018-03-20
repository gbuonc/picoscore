
<template>
   <div class="panel">
      <div>
         <MainScore />
      </div>
      <div class="center">
         <p>{{counter}}</p>
         <MidiPlayer />
      </div>
      <div class="bottom">
         <router-link :to="{name: 'landing', params: { skipPendingRedirect: true }}">home</router-link>
         <Dial />
      </div>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import Dial from '../components/Dial';
import MainScore from '../components/MainScore';
import MidiPlayer from '../components/MidiPlayer';
import { mapState } from 'vuex';
export default {
   name: 'New',
   data () {
      return {
         scoreId:1,
      }
   },
   computed:{
      ...mapState({
         counter: 'jogAngle'
      })
   },
   components: {
      'Dial': Dial,
      'MainScore': MainScore,
      'MidiPlayer': MidiPlayer
   }
}
</script>
<style scoped>
.panel{
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   justify-content: space-between;
}
</style>
