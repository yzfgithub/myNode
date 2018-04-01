<template>
  <section id="video" v-show="showMask" @click="cancelVideo" class="mask" style="position: fixed;height: 100%;width: 100%;background-color: rgba(100,100,100,0.5);left: 0;top:0;">
    <div style="width: 80%;height: 200px;margin: 100px auto 0;background-color: #000;">
      <div style="width: 100%;height: 100%;position: relative;">
        <video width="100%" height="100%" :src="$store.state.video.url" ref="video" class="v-content" :poster="$store.state.video.cover"></video>
        <div style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;" v-if="showIcon" @click.stop="videoStart">
          <img style="position: absolute;left: 140px;top:75px;;width: 40px;hight:40px;" src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png" alt="">
        </div>
      </div>

    </div>
  </section>
</template>
<style scoped>

</style>
<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  export default{
      data(){
          return{
            showIcon: true
          }
      },
    computed:{
      ...mapGetters(['showMask'])
    },
    mounted () {
      console.log(this.$store.state.video)
      let video = this.$refs.video
      video.onended = () => {
        this.showIcon = true
      }
    },
    methods:{
      ...mapMutations(['pauseVideo']),
      cancelVideo(){
          console.log(event.target)
//          if(event.target.class=="v-content"){
//              console.log('sss')
              this.videoStop()
              this.pauseVideo();
//          }
      },
      videoStop(){
        this.showIcon=true;
        let video = this.$refs.video
        video.pause()
      },
      videoStart(){
          this.showIcon=false;
        let video = this.$refs.video
        video.play()
      }
    }
  }
</script>
