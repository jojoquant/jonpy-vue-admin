
import axios from 'axios'
import store from '../store'
import * as types from '../store/types'
import router from '../router'


// 根据环境变量配置url
switch (process.env.NODE_ENV) {
    case "production":
        axios.defaults.baseURL = "http://127.0.0.1:8080"
        break
    case "test":
        axios.defaults.baseURL = "http://127.0.0.1:8080"
        break
    default:
        axios.defaults.baseURL = "http://127.0.0.1:8888"
}

// 配置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    });

// 设置响应拦截器
axios.interceptors.response.use(
    response => {
        // 只取响应主体内容
        return response.data
    }, error => {
        if (error.response) {
            switch (response.status) {
                case 401:
                    // 清楚token信息, 跳转登录页面
                    store.commit(types.LOGOUT)
                    router.currentRoute.path !== 'login'
                        && router.replace(
                            {
                                path: 'login',
                                query: {
                                    redirect: router.currentRoute.path
                                },
                            }
                        )
                case 403:  // 服务器已经处理请求, 但是拒绝执行(一般是Token过期)
                    break
                case 404:
                    break
            }

        } else {
            // 判断是否断网
            if (!window.navigator.onLine) {
                // 可以增加断网状态下的页面跳转
                return
            }
            return Promise.reject(error)
        }
    })

export default axios
