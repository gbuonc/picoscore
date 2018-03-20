<template>
   <div class="midi-player">
      <div id="midi-wrapper"></div>
      <span class="btn-play">PLAY / pause</span>
      <span class="btn-stop">STOP</span>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
export default {
   name: 'MidiPlayer',
   mounted: function(){
      // CUSTOM MIDI CONTROLS ======================================================
      const playBtn = document.querySelector('.btn-play');
      const stopBtn = document.querySelector('.btn-stop');
      playBtn.addEventListener('click', function(){
         abcjs.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));
      })
      stopBtn.addEventListener('click', function(){
         abcjs.midi.stopPlaying();
      })
   }
}
</script>

<style scoped>
   .jog-wrapper{
      display:flex; 
      margin:1em auto; 
      justify-content:center; 
      align-items:center;
      overflow:hidden;
   }
   .jog{
      display:flex; 
      width:30vw; 
      height:30vw; 
      min-width:300px;
      min-height:300px;
      border-radius:50%; 
      justify-content:center;
      align-items:flex-start; 
      background:#ddd;
   }
   .jog:after{
      content:'';
      background:#ccc; width:5px; height:30px;
   }
   .inner-jog{
      background:#ccc; 
      width:15vw; 
      height:15vw; 
      border-radius:50%; 
      position:absolute;
   }
</style>
