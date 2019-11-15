import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'
import config from '@/utils/configs.js'
import router from './router/index.js'

if (process.env.NODE_ENV === 'development') {
  // 设置默认本地axios提交url
  axios.defaults.baseURL = config.api.public_domain
} else {
  // 设置默认线上axios提交url
  axios.defaults.baseURL = config.api.public_domain
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截
axios.interceptors.request.use(
  config => {
    // eslint-disable-next-line eqeqeq
    if (config.method == 'post') {
      // eslint-disable-next-line no-self-assign
      config.data = config.data
    }
    if (sessionStorage.token) {
      config.headers.token = sessionStorage.token
    }

    config.data = {
      ...config.data
      // token: sessionStorage.token
    }
    config.data = Qs.stringify(config.data)
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  res => {
    // 影藏loading
    Toast.clear()
    if (res.data.status_code === 401 && res.data.data.code === 0) {
      Toast('登录过期，请重新登录')
      sessionStorage.clear()
      setTimeout(() => {
        router.replace({
          path: '/login'
        })
      }, 2000)
      return res
    }
    if (res.data.data.code !== 1000) {
      Toast(res.data.data.msg)
      return res
    }
    return res
  },
  error => {
    Toast.loading({
      message: error.errmsg ? error.errmsg : '请稍后刷新重试',
      forbidClick: true,
      loadingType: 'spinner'
    })
    return Promise.reject(error)
  }
)
export default axios
