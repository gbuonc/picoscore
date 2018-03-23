
<template>
   <div class="panel">
      <div>
         <MainScore v-bind:scoreNotes="scoreContent"/>
         <MidiPlayer />
      </div>
      <div>
         <Editor />
      </div>
      <div class="center">
         
      </div>
      <div class="bottom">
         <router-link :to="{name: 'landing', params: { skipPendingRedirect: true }}">home</router-link>
      </div>
      <div class="dial-wrap">
       <p>{{counter}}</p>
         <Dial />
      </div>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import Dial from '../components/Dial';
import MainScore from '../components/MainScore';
import MidiPlayer from '../components/MidiPlayer';
import Editor from '../components/Editor';
import { mapState } from 'vuex';
export default {
   name: 'New',
   data () {
      return {
         scoreId:1,
      }
   },
   props:['config'],
   computed:{
      ...mapState({
         counter: 'jogAngle',
         scoreContent:'scoreContent'
      })
   },
   directives:{
      
   },
   components: {
      'Dial': Dial,
      'MainScore': MainScore,
      'MidiPlayer': MidiPlayer,
      'Editor':Editor
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
.dial-wrap{
   position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 50%,0);
}
</style>
