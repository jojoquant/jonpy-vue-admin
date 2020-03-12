import axios from 'axios'
import qs from 'qs'

// 根据环境变量配置url
switch (process.env.NODE_ENV) {
    case "production":
        axios.defaults.baseURL = "http://127.0.0.1:8080"
        break
    case "test":
        axios.defaults.baseURL = "http://127.0.0.1:8080"
        break
    default:
        // 与后端通讯的地址
        axios.defaults.baseURL = "http://192.168.0.104:8888"
}

// 配置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 50000  //!!!!!!! 记得改回来
axios.defaults.withCredentials = false

// 配置POST请求头, 告知服务器请求主题的数据格式  xxx=xxx&xxx=xx
// axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.transformRequest = data => qs.stringify(data);

// 设置请求拦截器
// Token校验, 存储到 vuex/本地存储, 每一次请求携带token
axios.interceptors.request.use(config => {
    // const token = store.token
    let token = localStorage.getItem('token')
    console.log('token:', token)
    token && (config.headers.Authorization = token)
    return config

}, error => {

    return Promise.reject(error)

});

// 设置响应拦截器
axios.interceptors.response.use(response => {
    // 只取响应主体内容
    // console.log('interceptor:', response)
    return response.data
}, error => {
    let { response } = error
    if (response) {
        switch (response.status) {
            case 401:  // 当前请求需要用户验证(一般是未登录)
                break
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
