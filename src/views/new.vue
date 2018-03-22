
<template>
   <div class="panel">
      <div>
         <MainScore />
      </div>
      <div>
         <Editor />
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
         counter: 'jogAngle'
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
</style>
