import axios from 'axios'
export const whiteUsername = (params)=>{
  return axios.post('/api/setUser',params)
}
export const readUsername = (params)=>{
  return axios.get('/api/getUser',{params})
}
export const bjDetail = (params) =>{
  return axios.get('/api/bj_cinema',{params})
}
export const bjHot = (params) =>{
  return axios.get('/api/bj_hot',{params})
}

// export const readUsername = (params)=>{
//   return axios.post('/api/getUser',params)
// }
