<template>
   <div v-onRotate id="rotateWrapper" class="jog-wrapper">
      <div class="jog"></div>
      <div class="inner-jog"></div>
   </div>
</template>

<script>
import ZingTouch from 'zingtouch';
export default {
   name: 'Dial',
   data () {
      return {
         msg: ''
      }
   },
   methods:{
      updateJogAngle: function(dist){
         this.$store.commit('updateJogAngle', {angle: dist})
      }
   },
   directives:{
      onRotate:{
         bind: function(el, bindings, vnode){
            const zt = new ZingTouch.Region(document.body);
            let angle = 0;
            zt.bind(el, 'rotate', function(e){
               const dist = parseInt(e.detail.distanceFromLast.toFixed(0), 10);
               // rotate jog
               el.style.transform='rotate('+(e.detail.distanceFromOrigin)+'deg)';
               angle = e.detail.angle.toFixed(1);
               vnode.context.updateJogAngle(dist);
               setTimeout(function(){
                  if(e.detail.angle.toFixed(1) === angle && angle !== 0){
                     // reset rotation
                     el.style.transform='rotate(0deg)';
                  }
               }, 150)
            }, false);
            // if(dist < 0){
            //    count >= scoreConfigLength ? count-=friction : scoreConfigLength;
            // }
            // if(dist > 0){
            //    count+=friction;
            // }
            // e.detail.distanceFromOrigin, e.detail.distanceFromLast, e.detail.angle
            // scoreTextArea.setSelectionRange(count,count+1);
            // console.log(scoreTextArea.value.charAt(count));
            // detailTextArea.value=scoreTextArea.value.charAt(count);
            // detail_editor.fireChanged();
            // abc_editor.updateSelection();
            //    el.style.transform='rotate('+(e.detail.distanceFromOrigin)+'deg)';
            //    angle = e.detail.angle.toFixed(1);
         }
      }
   }
}
</script>

<style scoped>
   .jog-wrapper{
      display:flex; 
      margin:1em auto; 
      justify-content:center; 
      align-items:center;
      overflow:hidden;
   }
   .jog{
      display:flex; 
      width:30vw; 
      height:30vw; 
      min-width:300px;
      min-height:300px;
      border-radius:50%; 
      justify-content:center;
      align-items:flex-start; 
      background:#ddd;
   }
   .jog:after{
      content:'';
      background:#ccc; width:5px; height:30px;
   }
   .inner-jog{
      background:#ccc; 
      width:15vw; 
      height:15vw; 
      border-radius:50%; 
      position:absolute;
   }
</style>
