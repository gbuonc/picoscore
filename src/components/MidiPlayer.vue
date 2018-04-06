<template>
   <div class="midi-player">
      <div id="midi-wrapper"></div>
      <span class="btn-play" @click="playScore"><strong>PLAY</strong></span> | 
      <span class="btn-stop" @click="stopPlaying">STOP</span> 
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
export default {
   name: 'MidiPlayer',
   methods: {
      playScore: function(){
         const score = document.querySelector(".abcjs-inline-midi");
         abcjs.midi.startPlaying(score);
      },
      stopPlaying: function(){
         abcjs.midi.stopPlaying();
      }
   }
}
</script>

<style scoped>
   .midi-player{
      display:inline-block;
      width:50%;
      padding:.5em;
      background:#efefef;
      border-radius: 5px;
   }
</style>
