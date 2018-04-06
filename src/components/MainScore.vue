<template>
   <div class="score">
      <div class="scroll-outer">
         <div id="score-wrapper" class="scroll-wrapper"></div>
      </div>
      <textarea id="score-editor" :value="scoreNotes"></textarea>
      <!-- <p>{{scoreNotes}}</p>
      <p>{{notesArray}}</p> -->
      <span @click="clearScore">clear</span>
   </div>
</template>

<script>
import abcjs from 'abcjs/midi';
import ScrollBooster from 'scrollbooster';
// -------------------------------------
const scoreConfig = `X:1
M:C
Q:1/4=80
K: C
`
// -------------------------------------
export default {
   name: 'MainScore',
   props:['scoreNotes'],
   computed:{
      sourceArr:(component) => component.$store.state.melodyArray,
      notesArray: (component) => component.$store.getters.notesInScore
   },
   mounted: function(a,b,c){
      const component = this;
      var scrollRatio = 0;
      // scrollbooster scroller 
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
      // abc editor
      this.abc_editor = new abcjs.Editor("score-editor", {
         paper_id: 'score-wrapper',
         generate_midi: true,
         midi_id: 'midi-wrapper',
         abcjsParams:{
            add_classes:true,
            clickListener: function(el, tuneNumber, classes, e){
               if(el.el_type==='note'){
                  // get note position via regex by checking node associated classes
                  // class abcjs-n[xxx] where n is a note and [xxx] note position
                  const regex = /abcjs-n\d+/;
                  if(regex.exec(classes)){
                     // split invariable part of classname to get actual number
                     const notePosition = Number(regex.exec(classes)[0].split('abcjs-n')[1]);
                     const noteId = component.notesArray[notePosition].id;
                     if(noteId){
                        component.$store.commit('editElement', {noteId});
                     }
                  }
               }
            },
            // midi config
            program: 1, // 60, //trumpet
            // midiTranspose: -2,
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
   },
   methods:{
      clearScore: function(){
         this.$store.commit('clearScore');
      }
   },
   updated: function(){
      this.abc_editor.fireChanged();
   }
}
</script>
<style scoped>
   .score{display:block; width:100%; position:relative; background:#efefef;}
   .score > div {width:100% !important; overflow:hidden;}
   .scroll-wrapper{text-align:left; }
   .score svg{display:block; width:100%;}
   #score-editor{display:none;}
</style>
