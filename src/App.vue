<template>
  <div id="app" style="height: 100%;">
    <div style="height: 100%;">
      <router-view/>
    </div>
    <footer-nav :showNav="showNav"></footer-nav>
  </div>
</template>

<script>
  import footerNav from './components/footerNav.vue'
export default {
  name: 'App',
  data(){
      return{
          showNav:true,
      }
  },
  watch:{
      '$route':function () {
        if(this.$route.path=='/' ||this.$route.path=='/home' ||this.$route.path=='/cinema' ||this.$route.path=='/me'){
          this.showNav=true;
        }else{
            this.showNav=false;
        }
      }
  },
  components:{footerNav},

}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
