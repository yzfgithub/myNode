
const state={
  lists: []
}
const mutations={
  pushComingList (state, { lists }) {
    state.lists = lists
  }
}

export default {
  state,mutations
}
