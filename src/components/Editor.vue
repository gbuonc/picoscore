<template>
   <div class="editor">
      <div id="preview-wrapper"></div>
      <textarea id="score-preview" :value="previewContent"></textarea>
      <vue-slider v-model="currentNoteIndex" 
         width="90%" 
         height="15"
         v-bind:min="0"
         v-bind:max="notesLength"
         v-bind:dot-size="30"
         v-bind:piecewise="true"
         tooltip="hover"
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
         >
      </vue-slider>
      <p>{{currentDuration}}</p>
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
         currentDuration: Math.ceil(config.duration.length/2)
      }
   },
   components:{
      vueSlider
   },
   computed:{
      previewContent: function(a,b,c){
         const jogValue = Math.ceil(this.$store.state.jogAngle*0.03);
         const noteIndex = Math.ceil(this.currentNoteIndex); // Math.ceil(config.notes.length/2) + jogValue;
         const durationIndex = this.currentDuration;
         if(a.abc_preview) a.abc_preview.fireChanged();
         return config.notes[noteIndex]+config.duration[durationIndex]
      },
      notesLength: function(){
         return config.notes.length-1
      },
      durationsLength: function(){
         return config.duration.length-1
      }
   },
   methods:{},
   directives:{
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
      setInterval(()=>{
         this.abc_preview.fireChanged()
      }, 300)
   }
}
</script>

<style>
   .editor{display:flex; justify-content:center; align-items:center; flex-direction:column;}
   .editor .abcjs-staff-extra{display:none;}
   #preview-wrapper{text-align:center;}
   .editor .abcjs-note, .editor .abcjs-staff {fill:#000 !important;}
   input[type=range]{width:100%}
</style>
