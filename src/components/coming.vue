<template>
  <section id="coming" style="width: 100%;">
    <ul style="list-style: none;padding: 0;">
      <li v-for="comingItem in comingLists">
        <p class="open-date">{{ comingItem.openTime }} {{ comingItem.day }}</p>
        <div style="height: 100px;width: 100%;position: relative;" v-for="item in comingItem.movies">
          <figure style="width: 65px;height: 90px;position: relative;display: inline-block;-webkit-margin-start:10px;float: left;-webkit-margin-before:0;" @click="playMovieVideo(item.preview[0].iphoneUrl
, `https://gw.alicdn.com/${item.poster}`)">
            <img style="height: 100%;width: 100%;" v-lazyload="`https://gw.alicdn.com/${item.poster}`">
            <div style="position: absolute;left: 20px;top:35px;">
              <img style="width: 20px;hight:20px;" src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png" alt="">
            </div>
          </figure>
          <div v-bind:style="{width:autoHeight}" style="float: right;text-decoration: none;position: absolute;right: 0;height: 90px;    border-bottom: 1px solid #ddd;">
            <div style="float: right;position: absolute;right: 20px;">
              <button class="buy-btn f12" v-if="item.openTime < '2016-12-09'" style="padding: 5px;border: 1px solid #f94501;color: orangered;background: #fff;">购买</button>
              <button class="forward-buy-btn f12" v-else style="padding: 5px;border: 1px solid rgb(100,100,100);color: rgb(100,100,100);background: #fff;">预售</button>
            </div>
            <router-link :to="{name:'detail',params:{id: item.mID}}" style="text-decoration: none;">
              <div>
                <span style="font-size: 16px;">{{item.showName}}</span>
                <span style="color:orangered;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.remark}}分</span>
                <p style="text-decoration: none;font-size: 12px;">{{ item.highlight }}</p>
                <p style="text-decoration: none;font-size: 12px;">{{ item.leadingRole}}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div style="height: 20px;margin:10px 15px 10px 95px;">
          <span style="display: inline-block;width: 120px;color:orangered;font-size: 14px;float: left;">1212五折狂欢</span>
          <span style="display: inline-block;width: 120px;font-size: 14px;float: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#ddd;">1212特惠抢票，名额有限抢完即止</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<style scoped>

</style>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  export default{
    props:{
      'comingLists':{
        type:Array,
        default:()=>{}
      }
    },
    data(){
      return{
        autoHeight:'auto'
      }
    },
    methods:{
      ...mapMutations([
        'playVideo'
      ]),
      playMovieVideo (url, cover) {
        this.playVideo({audio: {
          url,
          cover
        }})
      }
    },
    created(){

    },
    mounted(){
      this.autoHeight=document.getElementById('coming').scrollWidth-95+'px';
    }
  }
</script>
