<template>
   <div v-onRotate id="rotateWrapper" class="jog-wrapper">
      <div class="jog">{{jogValue}}</div>
      <div class="inner-jog"></div>
   </div>
</template>

<script>
import ZingTouch from 'zingtouch';
export default {
   name: 'Dial',
   data: function(el){
      return{
         jogValue: Math.floor((el.min+el.max)/2)
      }
   },
   // computed:{
   //    jogValue:function(el){
   //       return Math.floor((el.min+el.max)/2);
   //    }
   // },
   methods:{
      updateJogAngle: function(dist){
         // this.$store.commit('updateJogAngle', {angle: dist})
         const updatedVal = this.jogValue+=dist;
         console.log(this.jogValue);
         
      }
   },
   props:['min', 'max'],
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
               // vnode.context.updateJogAngle(dist);
               const updatedVal = vnode.context.jogValue += dist;
               if(updatedVal > this.max){
                  vnode.context.jogValue = vnode.context.max;
               }else if(updatedVal < this.max){
                  vnode.context.jogValue = vnode.context.min;
               }else{
                  vnode.context.jogValue=updatedVal;
               }
               setTimeout(function(){
                  if(e.detail.angle.toFixed(1) === angle && angle !== 0){
                     // reset rotation
                     el.style.transform='rotate(0deg)';
                  }
               }, 150)
            }, false);
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
      width:10vw; 
      height:10vw; 
      min-width:200px;
      min-height:200px;
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
      width:5vw; 
      height:5vw; 
      border-radius:50%; 
      position:absolute;
   }
</style>
