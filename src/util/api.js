import axios from "axios"

export function postTodo(payload){
  return  axios.post(`https://advsaurabh.herokuapp.com/todo`,payload)
}

export function fetchTodo(params = {}){
 return   axios.get(`https://advsaurabh.herokuapp.com/todo`,{
    params: {
        _page: params.page,
        _limit: params.limit,
       
      }
 })
}

export function totalLength(){
  return   axios.get(`https://advsaurabh.herokuapp.com/todo`)
}

export function updateTodo(id,payload){
  return  axios.patch(`https://advsaurabh.herokuapp.com/todo/${id}`,{
        text:payload.text,
        status:false
    })
}