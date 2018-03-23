<template>
   <div class="editor">
      <div id="preview-wrapper" v-show="showPreviewEditor"></div>
      <textarea id="score-preview" :value="previewContent" v-fireChangeEvent="previewContent"></textarea>
      <vue-slider v-model="currentNoteIndex" 
         width="90%" 
         height="15"
         v-bind:min="0"
         v-bind:max="notesLength"
         v-bind:dot-size="30"
         v-bind:piecewise="true"
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
   computed:{
      previewContent: function(vnode){
         const jogValue = Math.ceil(this.$store.state.jogAngle*0.03);
         const noteIndex = Math.ceil(this.currentNoteIndex); // Math.ceil(config.notes.length/2) + jogValue;
         const durationIndex = this.currentDuration;
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
            //vnode.context.hidePreview();
         }
      }
   },
   mounted: function(){
      // bind abcjs to component instance so can be referenced in custom directive
      this.abc_preview = new abcjs.Editor("score-preview", {
         paper_id: 'preview-wrapper',
         generate_midi: false,
         abcjsParams:{
            add_classes:true,
            scale:1
         }
      });
      
   }
}
</script>

<style>
   .editor{
      display:flex; justify-content:center; align-items:center; flex-direction:column;
      }
   .editor .abcjs-staff-extra{display:none;}
   #preview-wrapper{text-align:center; border:2px solid red;
      position:fixed; top:0; right:0; width:100px !important}
   .editor .abcjs-note, .editor .abcjs-staff {fill:#000 !important;}
   input[type=range]{width:100%}
   #score-preview{display:none;}
</style>
