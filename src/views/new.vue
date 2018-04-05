
<template>
   <div class="panel">
      <MainScore v-bind:scoreNotes="scoreContent"/>
      <MidiPlayer />
      <DropStave />
   </div>
</template>

<script>
import config from '../config.js';
import MainScore from '../components/MainScore';
import MidiPlayer from '../components/MidiPlayer';
import DropStave from '../components/DropStave';
export default {
   name: 'New',
   components: {
      'MainScore': MainScore,
      'MidiPlayer': MidiPlayer,
      'DropStave': DropStave,
   },
   props:['config'],
   data () {
      return {
         scoreId:1
      }
   },
   computed:{
      scoreContent:(component) => component.$store.getters.scoreContent,
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
   align-items:center;
}
.dial-wrap{
   position: fixed;
   bottom: 0;
   left: 50%;
   transform: translate3d(-50%, 50%,0);
}
</style>
