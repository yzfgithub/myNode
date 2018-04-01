/*公共全局的状态*/
import * as types from './mutation-types.js'
import axios from 'axios'
const state={
      name: '北京',
      show: false,
      rN: 'bj',
      data: []
}
const actions={  /* 写入 */
  /*关键词*/
  updateCityAsync ({ commit, state }, {city}) {
    if (!city.name) {
      city.name = state.name
      city.rN = state.rN
    }
    return axios.get(`/api/movie/hot/?city=${city.rN}`).then(resp=>{
      let data = resp.data
      let lists = data.data.data.returnValue
      //模拟索引数据的id号
      lists.forEach((item, index) => {
        item.mID = index
      })
      city.data  = lists;
      console.log(city);
      commit(types.UPDATECITY, { city })

    })
  }

}
const getters={  /* 读取 */
  hotLists: state => state.data,
  cityName: state => state.name
}
const mutations={
  [types.UPDATECITY] (state, { city }) {
    if (city.name) {
      state.name = city.name
      state.data = city.data
      state.rN = city.rN
    }
    state.show = false
  },
  showCityList (state) {
    state.show = true
  }

}
export default {
  state,actions,getters,mutations
}
