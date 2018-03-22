<template>
   <div class="editor">
      <div id="preview-wrapper"></div>
      <textarea id="score-preview" :value="previewContent" v-updateScore="previewContent"></textarea>
   </div>
   
</template>

<script>
import config from '../config.js';
import abcjs from 'abcjs/midi';
import { mapState } from 'vuex';

export default {
   name: 'Editor',
   data () {
      return {
         currentNoteIndex:0,
         currentDuration:''
      }
   },
   computed:{
      previewContent: function(){
         const jogValue = Math.ceil(this.$store.state.jogAngle*0.03);
         const noteIndex = Math.ceil(config.notes.length/2) + jogValue;
         if(noteIndex >= 0 && noteIndex <= config.notes.length){
            return config.notes[noteIndex]
         }
      },
   },
   methods:{},
   directives:{
      updateScore: {
         update: function(el, bind, vNode){
            vNode.context.abc_preview.fireChanged();
            
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
            scale:3
         }
      });
   }
}
</script>

<style>
   .editor{display:flex; justify-content:center; align-items:center; flex-direction:column;}
   .editor .abcjs-staff-extra{display:none;}
   #preview-wrapper{text-align:center;}
   .editor .abcjs-note, .editor .abcjs-staff {fill:#000 !important;}
</style>
