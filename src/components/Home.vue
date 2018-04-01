<template>
  <section style="height: 100%;">
    <city></city>
    <header style="height: 40px;width: 100%;">
      <div style="float: left;width: 35%;text-align: center;" @click="showCityList">
        <div style="height: 40px;line-height: 40px;">{{$store.state.city.name}}</div>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div style="float: left;width: 65%;position: relative;" @click="moveTab">
        <div hot="sel" style="float:left;width: 50%;text-align: center;font-size: 16px;height: 40px;line-height: 40px;" :class="{cls1:selnav}">正在热映</div>
        <div style="float:left;width: 50%;text-align: center;height: 40px;line-height: 40px;" :class="{cls1:!selnav}">即将上映</div>
        <span style="position: absolute;" class="move" :style="{left: moveDistance}"></span>
      </div>
    </header>
    <section v-show="selnav">
      <swiper :imgs="imgs"></swiper>
      <hot :hotLists="hotLists"></hot>
    </section>
    <section v-show="!selnav">

    </section>
    <play-video></play-video>
  </section>


</template>
<style scoped>
.cls1{color:#00B7FF;}
.move {
  display: inline-block;
  bottom: 0px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.7s ease-in-out;
  transition: left 0.7s ease-in-out;
}
</style>
<script type="text/ecmascript-6">
  import * as Api from '../api';
  import city from './city.vue'
  import swiper from './swiper.vue'
  import axios from 'axios'
  import hot from './hot.vue'
  import playVideo from './playVideo.vue'
  import { mapGetters, mapMutations } from 'vuex'
export default{
    data(){
        return{
          selnav:true,
          moveDistance: '5%',
          imgs:[],
          loaingLists:[],
          offset: 0,
          limit: 20,
          total: 0
        }
    },
  components:{city,swiper,hot,playVideo},
  computed: {
    ...mapGetters([
            'hotLists'
        ])
    },
  methods:{
    ...mapMutations([
      'showCityList',
      'pushComingList',
      'pushLoadStack',
      'completeLoad',
    ]),
    moveTab(event){
      event.target.getAttribute('hot') ? this.selectHotTab() : this.slectComingTab()
    },
    selectHotTab () {
      this.selnav = true
      this.moveDistance = '5%'
      this.pushComingList({lists: []})
    },
    slectComingTab () {
      this.selnav = false
      this.moveDistance = '55%'
      this.pushComingList({lists: this.loaingLists})
    },
    requestData (url, fn) {
      this.pushLoadStack()
      axios.get(url).then(fn).then(this.completeLoad)
    },
    getWeekDay (num) {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weeks[num]
    },
    sortComingData (lists) {
      let comingLists = []
      lists.forEach((item) => {
        let hasItem = false
        for (let i = 0; i < comingLists.length; i++) {
          if (item.openTime === comingLists[i].openTime) {
            comingLists[i].movies.push(item)
            hasItem = true
            break
          }
        }
        if (!hasItem) {
          let comingItem = {
            openTime: '',
            day: '',
            movies: []
          }
          comingItem.openTime = item.openTime
          comingItem.day = this.getWeekDay(new Date(item.openTime).getDay())
          comingItem.movies.push(item)
          comingLists.push(comingItem)
        }
      })
      console.log(comingLists)
      return comingLists
    }
  },
  created(){
    this.pushComingList({lists: []})
    this.requestData('api/movie/swiper', (response) => {
      let data = response.data
      this.imgs = data.data.data.returnValue
    })
    this.requestData(`api/movie/coming?limit=${this.limit}&offset=${this.offset}`, (response) => {
      let data = response.data
      let lists = data.data.data.returnValue
      //模拟索引数据的id号
      lists.forEach((item, index) => {
        item.mID = index
      })
      this.loaingLists = lists
      this.total = data.total
      this.comingLists = this.sortComingData(lists)
      this.offset = this.offset + this.limit
    })
  },
  mounted(){
//        Api.bjDetail({city:'bj'}).then(resp=>{
//            console.log(resp)
//        })
//        Api.bjHot({city:'bj'}).then(resp=>{
//            console.log(resp)
//        })
  }
}
</script>
