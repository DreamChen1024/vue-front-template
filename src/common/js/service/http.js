import axios from 'axios'
import './request'
import tools from '../tool/tools'

/** 请求拦截 */
axios.interceptors.request.use(
  config => {
    if(config.method === 'post' && config.data.unFormData) {
      // 不需要formData格式的直接传json对象
      return config
    }
    else if (config.method === 'post' && config.data.string) {
      // JSON字符串
      config.data = JSON.stringify(config.data)
      return config
    } else {
      // FormData格式
      config.data = tools.getFormData(config.data)
      return config
    }
  }
)

/** 响应拦截 */
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)