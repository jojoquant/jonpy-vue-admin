import axios from 'axios'

export function request(config) {
    // 1. 创建axios实例
    const instance = axios.create(
        {
            baseURL: 'http://192.168.0.104:8888',
            timeout: 5000
        }
    )

    instance.interceptors.request.use(
        config => {
            console.log(config);
            return config.data
        },
        err => {
            console.log(err);
        }
    )

    return instance(config)
}