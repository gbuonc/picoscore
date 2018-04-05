<template>
   <div>
      <div class="dropStave">
         <div class="line sopralinea droplet" data-value="E4"></div>
         <div class="space droplet" data-value="D4"></div>
         <div class="line sopralinea droplet" data-value="C4"></div>
         <div class="space droplet" data-value="B3"></div>
         <div class="line sopralinea droplet" data-value="A3"></div>
         <!-- ........ -->
         <div class="space droplet" data-value="G3"></div>
         <div class="line droplet" data-value="F3"></div>
         <div class="space droplet" data-value="E3"></div>
         <div class="line droplet" data-value="D3"></div>
         <div class="space droplet" data-value="C3"></div>
         <div class="line droplet" data-value="B2"></div>
         <div class="space droplet" data-value="A2"></div>
         <div class="line droplet" data-value="G2"></div>
         <div class="space droplet" data-value="F2"></div>
         <div class="line droplet" data-value="E2"></div>
         <div class="space droplet" data-value="D2"></div>
         <!-- ........ -->
         <div class="line sottolinea droplet" data-value="C2"></div>
         <div class="space droplet" data-value="B1"></div>
         <div class="line sottolinea droplet" data-value="A1"></div>
         <div class="space droplet" data-value="G1"></div>
         <div class="line sottolinea droplet" data-value="F1"></div>
      </div>
      <div class="bucket">
         <div class="item" data-duration="semibreve">sb</div>
         <div class="item" data-duration="minima">m</div>
         <div class="item" data-duration="semiminima">sm</div>
         <div class="item" data-duration="croma">c</div>
         <div class="item" data-duration="semicroma">sc</div>
         <div class="item" data-duration="biscroma">b</div>
         <div class="item" data-duration="semibiscroma">sb</div>
      </div>
   </div>
</template>

<script>
import dragula from 'dragula';
import config from '../config.js';
export default {
   name: 'DropStave',
   mounted: function(el,bind,vnode){
      // init drag/drop lib
      const staveLinesAndSpaces = document.querySelectorAll('.droplet');
      const dropTo = Array.from(staveLinesAndSpaces);
      const dragFrom = document.querySelector('.bucket');
      const dragdropWrapper = dragula([dragFrom, ...dropTo], {copy:true});
      // set notes on drop
      dragdropWrapper.on('drop', (dragItem, dropItem)=>{
         // compose notation
         const notePitch = config.pitch[dropItem.dataset.value].abcNotation;
         const noteDuration = config.durations[dragItem.dataset.duration].abcNotation;
         const composition = ' '+notePitch + noteDuration+' ';
         this.$store.commit('addNoteToScore', {note:composition});
         // remove dropped note
         dragItem.remove();
      })
   }
}
</script>

<style scoped>
   body > .item{display:none;}
   .line, .space{
      height:25px;
      width:100%;
      position:relative;
   }
   .line{background:#efefef; height:3px}
   .line:before{
      content:'';
      height:0;
      border-bottom:1px solid #333;
      position:absolute;
      top:50%;
      left:0;
      right:0;
   }
   .sottolinea:before, 
   .sopralinea:before{
      left:40%;
      right:40%;
   }
   .item{background:red; width:24px; height:24px; border-radius:50%; display:inline-block;}
   .line > .item, .space > .item{position:absolute; top:50%; transform:translate(-50%, -50%)}
</style>
