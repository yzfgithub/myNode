<template>
  <section ref="city" v-show="$store.state.city.show" style="height: 100%;width: 100%;position: fixed;z-index: 100;background-color: #fff;">
    <header style="text-align: center;position: relative;font-size: 16px;">
      <span>请选择城市</span>
      <span style="position: absolute;right: 25px;" @click="cancelCityList">x</span>
    </header>
    <div @click="selectCity" style="overflow: auto;">
        <mt-index-list>
          <mt-index-section v-for="city in cityList" :index="city.sort">
            <mt-cell v-for="name in city.data" :title="name.regionName">

            </mt-cell>
          </mt-index-section>
        </mt-index-list>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import axios from 'axios'
  import * as Api from '../api'
  export default{
    data () {
      return {
        cityList: []
      }
    },
    methods: {
      ...mapActions([
        'updateCityAsync'
      ]),
      ...mapMutations([
        'pushLoadStack',
        'completeLoad'
      ]),
      requestData (url, fn) {
        this.pushLoadStack()
        axios.get(url).then(fn).then(this.completeLoad)
      },
      changeCityData (data) {
        this.pushLoadStack()
        this.$refs.city.className = "pf fadeOutTop"
        this.$store.dispatch('updateCityAsync', data).then(this.completeLoad)
      },
      matchCityStr (str) {
        let randomList = ['bj', 'sh', 'gz']
        let randomCity = randomList[Math.floor(3*Math.random())]
        switch (str) {
          case '北京': return 'bj'
          case '上海': return 'sh'
          case '广州': return 'gz'
          default: return randomCity
        }
      },
      selectCity (event) {
        let ele = event.target
        let className = ele.className
        let name = ''
        console.log(ele,className)
        if(className === 'mint-cell-wrapper'){
          name = ele.children[0].children[0].innerHTML
        }else if(className === "mint-cell-title"){
          name = ele.children[0].innerHTML
        }else if(className === "mint-cell-text"){
          name = ele.innerHTML
        }else{
          name = ''
        }
        if (name) {
          this.changeCityData({
            city: {
              name: name,
              rN: this.matchCityStr(name)
            }
          })
        } else {
          return false
        }
      },
      cancelCityList () {
        this.changeCityData({city: {}})
      },
    },
    created () {
      this.$store.dispatch('updateCityAsync', {city: {}})
      this.requestData('/api/movie/city', (response) => {
        let data = response.data
        let cityObj = data.data.data.returnValue
        let citySort = Object.keys(cityObj)
        this.cityList.push({
          sort: '热门',
          data: [{
            regionName: '北京',
            id: 1,
            rN: 'bj'
          }, {
            regionName: '上海',
            id: 2,
            rN: 'sh'
          }, {
            regionName: '广州',
            id: 3,
            rN: 'gz'
          }]
        })
        citySort.forEach((item) => {
          this.cityList.push({
            sort: item,
            data: cityObj[item]
          })
        })
        console.log(this.cityList)
      })
    }
  }
</script>

<style>
  .mint-indicator-wrapper {
    z-index: 1000
  }
  #select-city {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
    background-color: #fff;
  }
  .city-header {
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #000;
    font-size: 16px;
    background-color: #fff;
  }
  .close-city {
    font-size: 28px;
    color: #666;
    display: inline-block;
    height: 46px;
    width: 50px;
    line-height: 38px;
    text-align: center;
    right: 0px;
  }
  @-webkit-keyframes fadeInDown {
    0% {
      opacity: .7;
      -webkit-transform: translateY(-50px);
      transform: translateY(-50px)
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
  }
  @keyframes fadeInDown {
    0% {
      opacity: .7;
      -webkit-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
      transform: translateY(-50px)
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0)
    }
  }
  .fadeInDown {
    -webkit-animation: fadeInDown .3s;
    animation: fadeInDown .3s;
  }
  @-webkit-keyframes fadeOutTop {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(-50px);
      transform: translateY(-50px)
    }
  }
  @keyframes fadeOutTop {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
      transform: translateY(-50px)
    }
  }
  .fadeOutTop {
    -webkit-animation: fadeOutTop .35s;
    animation: fadeOutTop .35s;
  }
</style>
