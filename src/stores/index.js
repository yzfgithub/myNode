import Vue from 'vue'
import Vuex from 'vuex'
import city from './city/city'
import loading from './loading/loading'
import video from './video/video'
import coming from './coming/coming'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    city,loading,video,coming
  },
  // strict:process.env.NODE_ENV!=='production' //线上环境关掉严格模式
})
