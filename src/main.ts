import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store, { setupStore } from './store'
import 'normalize.css'
import './assets/css/index.less'

import { globalRegister } from './global'
// import './service/axios_demo'

// import xsRequest from './service'
const app = createApp(App)

// import localCache from '@/utils/cache'
// 注册
app.use(globalRegister)

app.use(store)

setupStore()

app.use(router)

app.mount('#app')
// const token = localCache.getCache('token')

// console.log(xsRequest)
// xsRequest.request({
//   url: '/users/list',
//   // url:'/students',
//   headers: { token },
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config: any) => {
//       console.log('单独请求的config')
//       const token = localCache.getCache('token')
//       console.log(token)
//       if (token) {
//         // console.log(config.headers.Authorization)
//         config.headers.Authorization = `Bearer ${token}`
//       }
//       console.log('test')
//       return config
//     },
//     responseInterceptor: (res) => {
//       // console.log('单独响应的response')
//       console.log(res)
//       return res
//     }
//   }
// })
