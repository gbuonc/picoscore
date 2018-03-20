<template>
   <div class="score">
      <div class="scroll-outer">
         <div id="score-wrapper"></div>
      </div>
      <textarea id="score-editor" :value="scoreContent"></textarea>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import ScrollBooster from 'scrollbooster';
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
         scoreContent: score
      }
   },
   methods:{},
   directives:{},
   created: function(){},
   mounted: function(){
      var abc_editor = new abcjs.Editor("score-editor", {
         paper_id: 'score-wrapper',
         generate_midi: true,
         midi_id: 'midi-wrapper',
         abcjsParams:{
            add_classes:true,
            // svg config
            // staffwidth: document.body.clientWidth-30,
            //viewportHorizontal: true,
            //scrollHorizontal: true,
            // responsive: "resize",
            // clickListener: function(abcElem, tuneNumber, classes){
            //    console.log(abcElem, classes);
            // },
            // midi config
            program: 60, //trumpet
            midiTranspose: -2,
            inlineControls: {
               hide: true,
            },
            animate: {
               listener: function(lastRange, currentRange, context){
                  function colorRange(range, color) {
                     if (range && range.elements) {
                        range.elements.forEach(function (set) {
                           set.forEach(function (item) {
                              item.attr({fill: color});
                              console.log(item.node.getBoundingClientRect()['x'])
                           });
                        });
                     }
                  }
                  colorRange(lastRange, '#000000');
                  colorRange(currentRange, '#1989f0');
               }
            }
         }
      });

      // SCROLLER 
      let sb = new ScrollBooster({
         viewport: document.querySelector('.scroll-outer'),
         content: document.querySelector('#score-wrapper'),
         emulateScroll: false,
         onUpdate: (data)=> {
            document.querySelector('#score-wrapper').style.transform = `translate(
               ${-data.position.x}px
            )`
            // and also metrics: data.viewport['width'|'height'] and data.cotent['width'|'height']
         }
      })
      sb.setPosition({
         x: 400,
      })
   }
}
</script>

<style scoped>
.score{outline:1px solid red; display:block; width:100%; position:relative;}
.score > div {width:100% !important; overflow:scroll;}
.score svg{display:block; width:100%;}
</style>
