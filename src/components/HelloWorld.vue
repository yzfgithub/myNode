<template>
  <div class="back" id="box">
    <header-component></header-component>
    <router-view></router-view>
  </div>

</template>

<script>
  import HeaderComponent from './Header.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  components:{
    HeaderComponent
  },
  methods:{

  },
  mounted(){
      let height=window.innerHeight;
      let width=window.innerWidth;
      let box=document.getElementById('box');
      box.style.height=height+'px';
      box.style.width=width+'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back{
    background-image: linear-gradient(left top,rgba(255,0,0,0.05) 0%,rgba(255,165,0,0.05) 20%,rgba(255,255,0,0.05) 40%, rgba(0,255,0,0.05) 60%,rgba(0,0,255,0.05) 100%);
    animation: splid 0.5s infinite;
    position: relative;
  }
  @keyframes splid {
    0% { background-image: linear-gradient(left top,rgba(255,0,0,0.05) 0%,rgba(255,165,0,0.05) 20%,rgba(255,255,0,0.05) 40%, rgba(0,255,0,0.05) 60%,rgba(0,0,255,0.05) 80%,rgba(255,0,0,0.05) 100%);
    }
    20% {  background-image: linear-gradient(left top,rgba(0,0,255,0.05) 0%,rgba(255,0,0,0.05) 20%,rgba(255,165,0,0.05) 40%,rgba(255,255,0,0.05) 60%, rgba(0,255,0,0.05) 80%,rgba(0,0,255,0.05) 100%);
    }
    40% {  background-image: linear-gradient(left top,rgba(0,0,255,0.05) 20%,rgba(255,0,0,0.05) 40%,rgba(255,165,0,0.05) 60%,rgba(255,255,0,0.05) 80%, rgba(0,255,0,0.05) 100%,rgba(0,0,255,0.05) 0%);
    }
    60% {  background-image: linear-gradient(left top,rgba(0,0,255,0.05) 40%,rgba(255,0,0,0.05) 60%,rgba(255,165,0,0.05) 80%,rgba(255,255,0,0.05) 100%, rgba(0,255,0,0.05) 0%,rgba(0,0,255,0.05) 20%);
    }
    80% {  background-image: linear-gradient(left top,rgba(0,0,255,0.05) 60%,rgba(255,0,0,0.05) 80%,rgba(255,165,0,0.05) 100%,rgba(255,255,0,0.05) 0%, rgba(0,255,0,0.05) 20%,rgba(0,0,255,0.05) 40%);
    }
    100% {  background-image: linear-gradient(left top,rgba(0,0,255,0.05) 80%,rgba(255,0,0,0.05) 1000%,rgba(255,165,0,0.05) 0%,rgba(255,255,0,0.05) 20%, rgba(0,255,0,0.05) 40%,rgba(0,0,255,0.05) 60%);
    }
  }

/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/
/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/
/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/
/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
