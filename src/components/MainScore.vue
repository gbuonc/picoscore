<template>
   <div class="score">
      <div class="scroll-outer">
         <div id="score-wrapper" class="scroll-wrapper"></div>
      </div>
      <textarea id="score-editor" :value="scoreContent" v-test="noteIndex"></textarea>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import ScrollBooster from 'scrollbooster';
import { mapState } from 'vuex';
// -------------------------------------
const scoreConfig = `X:100
M:C
Q:1/4=100
L:1/8
%C: Gianluca Buoncompagni
K: C
`
const scoreNotes = `D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C) D*F D*C*F (A B C)`;
let score = scoreConfig + scoreNotes;
// -------------------------------------
export default {
   name: 'MainScore',
   data () {
      return {
         scoreContent: score,
      }
   },
   
   computed:{
      noteIndex: function(){
         console.log(scoreNotes);
   //       scoreTextArea.value.charAt(count);
   // detail_editor.fireChanged();
         // abc_editor.updateSelection();
         return this.$store.state.jogAngle*1.5;
         return scoreNotes.charAt(this.$store.state.jogAngle*1.5);
      }
   },
   methods:{},
   directives:{
      test: {
         update: function(el, bind){
            el.setSelectionRange(bind.value, bind.value+1);
            console.log('UPDATE', el, bind.value)
         }
      }
   },
   mounted: function(){
      var scrollRatio = 0;
      // SCROLLER 
      let sb = new ScrollBooster({
         viewport: document.querySelector('.scroll-outer'),
         content: document.querySelector('#score-wrapper'),
         bounce:false,
         mode:'x',
         friction:0,
         onUpdate: (data)=> {
            document.querySelector('#score-wrapper').style.transform = `translate(
               ${-data.position.x}px
            )`
         }
      })
      var abc_editor = new abcjs.Editor("score-editor", {
         paper_id: 'score-wrapper',
         generate_midi: true,
         midi_id: 'midi-wrapper',
         abcjsParams:{
            add_classes:true,
            // svg config
            clickListener: function(abcElem, tuneNumber, classes){
               console.log(this, abcElem, tuneNumber, classes);
               console.log(score.substring(abcElem.startChar, abcElem.endChar));
            },
            // midi config
            program: 60, //trumpet
            midiTranspose: -2,
            inlineControls: {
               hide: true,
            },
            animate: {
               listener: function(lastRange, currentRange, context){
                  const wrapper = document.querySelector('.scroll-outer');
                  const wrapperWidth = wrapper.getBoundingClientRect()['width'];
                  sb.updateMetrics(); // set correct svg width
                  function colorRange(range, color, checkPos) {
                     if (range && range.elements) {
                        range.elements.forEach(function (set) {
                           const pagePos = wrapper.getBoundingClientRect()['x'];
                           set.forEach(function (item) {
                              item.attr({fill: color});
                              item.node.classList.remove('currentNote');
                              if(checkPos){
                                 // horizontally scroll score to always show playing notes
                                 const itemPos = item.node.getBoundingClientRect()['x'];
                                 const itemWidth = item.node.getBoundingClientRect()['width'];
                                 const currentPos = parseInt((itemPos - pagePos).toFixed(1), 10);
                                 const itemIsOutOfView = currentPos  > wrapperWidth;
                                 if(itemIsOutOfView ){
                                    scrollRatio+=1;
                                    sb.setPosition({x: scrollRatio*wrapperWidth})
                                 }
                              };
                           });
                        });
                     }
                  }
                  colorRange(lastRange, '#000000', false);
                  colorRange(currentRange, '#1989f0', true);
               }
            }
         }
      });
   }
}
</script>

<style scoped>
   .score{outline:1px solid red; display:block; width:100%; position:relative;}
   .score > div {width:100% !important; overflow:hidden;}
   .scroll-wrapper{text-align:left; }
   .score svg{display:block; width:100%;}
</style>
