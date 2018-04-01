
const state={
    url: '',
    cover: '',
    playStatus: false
}
const mutations={
  playVideo (state, { audio }) {
    state.url = audio.url
    state.cover = audio.cover
    state.playStatus = true
  },
  pauseVideo (state) {
    state.playStatus = false
  }
}
const  getters={
  showMask: state => state.playStatus
}

export default {
  state,mutations,getters
}

