<template>
  <div class="login-box">
    <div class="login-title">大数据视野亮瞎你双眼</div>
    <div class="login-span">
      <span>用户名：</span><input type="text" placeholder="用户名" v-model="username"><br>
    </div>
    <div class="login-span">
      <span>密&nbsp;&nbsp;&nbsp;码：</span><input type="password" placeholder="密码" v-model="password">
    </div>
    <div @click.stop="submit" style="cursor: pointer;margin: 0 auto;width: 60%;padding: 5px 0;background-color: rgba(30,43,41,0.11);">
      <span>注册</span>
    </div>
  </div>
</template>
<style scoped>
  input{outline: none;}
  .login-box{
    position: absolute;
    left:0;right: 0;
    top:0;bottom: 0;margin: auto;
    width: 350px;height: 200px;
    text-align: center;
  }
  .login-title{font-size: 24px;}
  .login-span{font-size: 16px;margin: 20px 0;}
</style>
<script type="text/ecmascript-6">
  import * as Api from '../api'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        username:'',
        password:'',
        uid:'1'
      }
    },
    methods:{
      submit(){
        let params ={username:this.username,password:this.password,uid:this.uid}
        Api.whiteUsername(params).then(resp=>{
            console.log(resp);
          if(resp.data.code==0){
              this.$router.push({name:'login'})
          }else{
              console.log('error')
          }
        })
      },
    },
    mounted(){

    }
  }
</script>
