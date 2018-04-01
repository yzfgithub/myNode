<template>
  <section style="width: 100%;height: 150px;">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imgs">
        <img class="img" :src="'https://gw.alicdn.com/tfs/' + item.smallPicUrl" />
      </mt-swipe-item>
    </mt-swipe>
  </section>
</template>
<style scoped>
  img {
    width: 100%;
    height: auto;
  }
</style>
<script type="text/ecmascript-6">
export default{
    props:{
        imgs:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return{

        }
    },
  created(){

  }
}
</script>
