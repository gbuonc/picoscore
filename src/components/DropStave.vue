<template>
   <div>
   {{currentPitch}}
      <div class="dropStave">
         <div class="line sopralinea droplet" data-value="e'"></div>
         <div class="space droplet" data-value="d'"></div>
         <div class="line sopralinea droplet" data-value="c'"></div>
         <div class="space droplet" data-value="b"></div>
         <div class="line sopralinea droplet" data-value="a"></div>
         <!-- ........ -->
         <div class="space droplet" data-value="g"></div>
         <div class="line droplet" data-value="f"></div>
         <div class="space droplet" data-value="e"></div>
         <div class="line droplet" data-value="d"></div>
         <div class="space droplet" data-value="c"></div>
         <div class="line droplet" data-value="B"></div>
         <div class="space droplet" data-value="A"></div>
         <div class="line droplet" data-value="G"></div>
         <div class="space droplet" data-value="F"></div>
         <div class="line droplet" data-value="E"></div>
         <div class="space droplet" data-value="D"></div>
         <!-- ........ -->
         <div class="line sottolinea droplet" data-value="C"></div>
         <div class="space droplet" data-value="B,"></div>
         <div class="line sottolinea droplet" data-value="A,"></div>
         <div class="space droplet" data-value="G,"></div>
         <div class="line sottolinea droplet" data-value="F,"></div>
      </div>
      <div class="bucket">
         <div class="item" data-duration="8">sb</div>
         <div class="item" data-duration="4">m</div>
         <div class="item" data-duration="2">sm</div>
         <div class="item" data-duration="">c</div>
         <div class="item" data-duration="/2">sc</div>
         <div class="item" data-duration="/4">b</div>
         <div class="item" data-duration="/4">sb</div>
      </div>
   </div>
</template>

<script>
import dragula from 'dragula';
import config from '../config.js';
export default {
   name: 'DropStave',
   data: function(){
      return {
         currentPitch : ''
      }
   },
   mounted: function(el,bind,vnode){
      // init drag/drop lib
      const staveLinesAndSpaces = document.querySelectorAll('.droplet');
      const dropTo = Array.from(staveLinesAndSpaces);
      const dragFrom = document.querySelector('.bucket');
      const dragdropWrapper = dragula([dragFrom, ...dropTo], {copy:true});
      // set notes on drop
      dragdropWrapper.on('drop', (dragItem, dropItem)=>{
         // compose notation
         const notePitch = dropItem.dataset.value; //config.pitch[dropItem.dataset.value].abcNotation;
         const noteDuration = dragItem.dataset.duration // config.durations[dragItem.dataset.duration].abcNotation;
         const composite = `${notePitch}${noteDuration}`;
         const now = Date.now();
         this.$store.commit('addToScore', {
            id:now,
            type: 'note',
            value:composite
         });
         // remove dropped note
         dragItem.remove();
      })
      dragdropWrapper.on('over', (dragItem, dropItem)=>{
         this.currentPitch = dropItem.dataset.value;
      })
   }
}
</script>

<style scoped>
   body > .item{display:none;}
   .bucket{padding:2em;}
   .line, .space{
      display:flex;
      flex:1;
      justify-content:center;
      width:100%;
      min-height:10px;
      position:relative;
   }
   .dropStave{
      border:2px solid #ccc;
      height: 240px;
      display:flex;
      flex-direction:column;
      justify-content: stretch;
      padding:10px;
   }
   /* .line{background:#efefef; height:3px} */
   .line:before{
      content:'';
      height:0;
      border-bottom:2px solid #333;
      position:absolute;
      top:50%;
      left:0;
      right:0;
   }
   .sottolinea:before, 
   .sopralinea:before{
      left:40%;
      right:40%;
      border-bottom:1px solid #999;
   }
   .item{
      background:red; 
      width:24px; 
      height:24px; 
      border-radius:50%; 
      display:inline-block;
      transition: all 350ms ease-in-out;
      z-index:2;
   }
   .line > .item, .space > .item{position:absolute; top:50%; transform:translate(-50%, -50%) scale(2);}
</style>
