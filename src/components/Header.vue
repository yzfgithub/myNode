<template>
  <div style="width:100%;height: 40px;">
   <span style="float: right;margin: 10px 100px 0 0;padding: 5px 10px; background-color: #e6e1dd;" @click="goRegister">注册</span>
  </div>
</template>
<style scoped>

</style>
<script type="text/ecmascript-6">
  export default {
      data(){
          return{

          }
      },
    methods:{
      goRegister(){
          this.$router.push({name:"register"})
      }
    },
    mounted(){

    }
  }
</script>
