import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  //baseURL: 'https://loaclhost:8080/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    } else {
    	console.log("sunmin") 
    }
    console.log("sunmin") 
    return config
  },
  error => {
    // do something with request error
    console.log("chanE:"+error) // for debug
    return Promise.reject(error)
  }
)

export default service