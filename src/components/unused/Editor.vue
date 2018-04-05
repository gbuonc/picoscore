<template>
   <div class="editor">
      <div id="preview-wrapper" v-show="showPreviewEditor"></div>
      <h3>{{pos}}</h3>
      <textarea id="score-preview" :value="previewContent" v-fireChangeEvent="previewContent"></textarea>
      <vue-slider v-model="currentNoteIndex" 
         width="90%" 
         height="25"
         v-bind:min="0"
         v-bind:max="notesLength"
         v-bind:dot-size="15 "
         v-bind:piecewise="false"
         tooltip="hover"
         @drag-start="showPreview"
         @drag-end="hidePreview"
         >
      </vue-slider>
      <vue-slider v-model="currentDuration" 
         width="50%" 
         height="15"
         v-bind:min="0"
         v-bind:max="durationsLength"
         v-bind:dot-size="30"
         v-bind:piecewise="true"
         tooltip="hover"
         @drag-start="showPreview"
         @drag-end="hidePreview"
         >
      </vue-slider>
      <button @click="addNoteToScore">Add</button>
   </div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import config from '../config.js';
import abcjs from 'abcjs/midi';
import { mapState } from 'vuex';

export default {
   name: 'Editor',
   data () {
      return {
         currentNoteIndex:0,
         currentDuration: Math.ceil(config.duration.length/2),
         scoreLine:'',
         showPreviewEditor: false
      }
   },
   components:{
      vueSlider
   },
   props:['pos'],
   computed:{
      previewContent: function(vnode){
         const noteIndex = this.pos[1]; // Math.ceil(this.currentNoteIndex);
         const durationIndex = this.pos[0]; // this.currentDuration;
         this.scoreline = config.notes[noteIndex]+config.duration[durationIndex];
         // -------------------------------------
         let scoreConfig = `X:2
         L:${config.defaultNoteLength}
         ${this.scoreline}
         `
         return scoreConfig
      },
      notesLength: function(){
         return config.notes.length-1
      },
      durationsLength: function(){
         return config.duration.length-1
      }
   },
   methods:{
      addNoteToScore: function(){
         this.$store.commit('addNoteToScore', {note:this.scoreline})
      },
      showPreview: function(){
         this.showPreviewEditor = true;
      },
      hidePreview: function(){
         this.showPreviewEditor = false;
      }
   },
   directives:{
      fireChangeEvent:{
         update: function(el,bind,vnode){
            vnode.context.abc_preview.fireChanged();
            vnode.context.hidePreview();
         }
      }
   },
   mounted: function(el,bind,vnode){
      // bind abcjs to component instance so can be referenced in custom directive
      this.abc_preview = new abcjs.Editor("score-preview", {
         paper_id: 'preview-wrapper',
         generate_midi: false,
         abcjsParams:{
            add_classes:true,
            scale:1
         }
      });

      // THIS BLOCK WAS IN NEW.VUE _______________________________________
      // Register touchstart and touchend listeners for element 'source'
      // var src = document.getElementById("test");
      // var target = src.getBoundingClientRect();
      // const areaWidth = target.width;
      // const areaHeight = target.height;
      // const topPos = target.y;
      // const leftPos = target.x;
      // var clientX, clientY;
      // const component = this;

      // src.addEventListener('touchmove', function(e) {
      //    // Cache the client X/Y coordinates
      //    clientX = e.touches[0].clientX;
      //    clientY = e.touches[0].clientY;
      //    const horizontalPos = parseInt((((clientX-leftPos)/areaWidth)*config.duration.length), 10);
      //    const verticalPos= parseInt((((clientY-topPos)/areaHeight)*config.notes.length),10); //parseInt(((clientY-topPos)).toFixed(2), 10);
      //    if(horizontalPos >=0 && horizontalPos<=config.duration.length){
      //       component.xpos = horizontalPos;
      //    }
      //    if(verticalPos >=0 && verticalPos<=config.notes.length){
      //       component.ypos = verticalPos;
      //    }
         
      // }, false);

      // src.addEventListener('touchend', function(e) {
      //    // SAVE on touchend
      // }, false);
      // ___________________________________________________________________
   }
}
</script>

<style>
   .editor{
      display:flex; justify-content:center; align-items:center; flex-direction:column;
      }
   .editor .abcjs-staff-extra{display:none;}
   #preview-wrapper{text-align: center;
    /* border: 2px solid red; */
    position: fixed;
    top: 50%;
    right: 50%;
    width: 100px !important;
    transform: translate(50%, -130%);
    z-index: 10;
    background: aliceblue;
    border-radius: 4px;
    box-shadow: 1px 3px 10px -5px #000;}
   .editor .abcjs-note, .editor .abcjs-staff {fill:#000 !important;}
   input[type=range]{width:100%}
   #score-preview{display:none;}
</style>
