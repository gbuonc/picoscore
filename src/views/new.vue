
<template>
   <div class="panel">
      <div>
         <MainScore v-bind:scoreNotes="scoreContent"/>
         <MidiPlayer />
      </div>
      <div>
         <Editor :pos="[xpos, ypos]" />
      </div>
      <div class="center">
         <div id="test" style="background:yellow; width:100%; height:200px; display:flex; justify-content:center; align-items:center;">
         {{xpos}} - {{ypos}}
         </div>
      </div>
      <div class="bottom">
         <router-link :to="{name: 'landing', params: { skipPendingRedirect: true }}">home</router-link>
      </div>
      <div class="dial-wrap">
       <p>{{counter}}</p>
         <Dial :min="0" :max="30" />
      </div>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import config from '../config.js';
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
         xpos: null,
         ypos: null
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
   mounted:function(){
      // Register touchstart and touchend listeners for element 'source'
var src = document.getElementById("test");
var target = src.getBoundingClientRect();
const areaWidth = target.width;
const areaHeight = target.height;
const topPos = target.y;
const leftPos = target.x;
var clientX, clientY;
const component = this;

src.addEventListener('touchmove', function(e) {
   // Cache the client X/Y coordinates
   clientX = e.touches[0].clientX;
   clientY = e.touches[0].clientY;
   const horizontalPos = parseInt((((clientX-leftPos)/areaWidth)*config.duration.length), 10);
   const verticalPos= parseInt((((clientY-topPos)/areaHeight)*config.notes.length),10); //parseInt(((clientY-topPos)).toFixed(2), 10);
   if(horizontalPos >=0 && horizontalPos<=config.duration.length){
      component.xpos = horizontalPos;
   }
   if(verticalPos >=0 && verticalPos<=config.notes.length){
      component.ypos = verticalPos;
   }
   
}, false);

src.addEventListener('touchend', function(e) {
   // SAVE on touchend
}, false);
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
