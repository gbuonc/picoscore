
<template>
   <div class="wrap">
      <div id="boo">xx</div>
      <!--
      <p>{{ $route.params.scoreId }}</p>
      <router-link to="/">home</router-link> 
      -->
   </div>
</template>

<script>
import Vex from 'vexflow';
export default {
   name: 'Play',
   data () {
      return {
         title: 'Play Score'
      }
   },
   mounted: function(){
      function randomize(){
         var a = ['a','b','c','d','e'];
         var b = [3,4,5];
         return a[Math.floor(Math.random()*5)]+'/'+b[Math.floor(Math.random()*3)];
      }
      var VF = Vex.Flow;
      var div = document.getElementById("boo");
      var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
      // Size our svg:
      renderer.resize(140, 500);

      // And get a drawing context:
      var context = renderer.getContext();
      // Create a stave at position 10, 40 of width 400 on the canvas.
      var stave = new VF.Stave(0, 0, 100);

      // Add a clef and time signature.
      // stave.addClef("treble").addTimeSignature("4/4");
      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();
      
      var test={};

      setInterval(function(){
         if(test.group){
            context.svg.removeChild(test.group);
         }
         test.group = context.openGroup();
         var voice = new VF.Voice({num_beats: 1,  beat_value: 4});
         var notes = [
            new VF.StaveNote({keys: ['c/3'], duration: "q" }),
            
         ];
         voice.addTickables(notes);
         // Format and justify the notes to 400 pixels.
         var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 350);
         voice.draw(context, stave);
         // Then close the group:
         context.closeGroup();
      }, 100)
   }
}
</script>
<style scoped>
.wrap{
   display:flex;
   flex-direction:column;
   justify-content:space-around;
   align-items:center;
}
</style>
