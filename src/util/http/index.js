import { BASE } from './const.js'
import { ignoreTokenApi } from './config.js'
import { getToken, removeToken } from '@/util'

const BASEURL = BASE // 网络端口
const TIMEOUT = 10000 // 网络超时
const ignoreTokenApiList = ignoreTokenApi // 部分接口不需要token
const getHeader = () => {
  return { authorization: getToken() || '', 'Content-Type': 'application/json' }
}

// 响应拦截
const responseInterceptors = (response = {}) => {
  return new Promise((resolve, reject) => {
    let { data = {} } = response
    if (!data) return reject(new Error('接口返回异常'))
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        data = {}
      }
    }
    if (String(data.code) === '200') {
      return resolve(data)
    } else if (String(data.code) === '10001') {
      uni.showToast({
        title: '用户失效',
        icon: 'none'
      })
      removeToken()
      uni.reLaunch({
        url: '/pages/login/login'
      })
      return reject(new Error('用户失效'))
    } else {
      uni.showToast({
        title: data.message,
        icon: 'none'
      })
    }
  })
}

// 网络请求
const http = (url = '/', options = {}) => {
  return new Promise((resolve, reject) => {
    const httpUrl = url.startsWith('http') ? url : BASEURL + url
    const header = getHeader()
    // 不在白名单里面 + 没有token
    if (!ignoreTokenApiList.includes(url.split('?')[0]) && !header.Authorization) {
      uni.navigateTo({
        url: '/pages/login/index'
      })
      return reject(new Error('未登录'))
    }

    // 加载loading
    uni.showNavigationBarLoading()
    options.loading &&
      uni.showLoading({
        title: options.title || '正在加载数据'
      })

    // 网络请求
    uni.request({
      url: httpUrl,
      method: options.method || 'GET',
      header,
      data: options.data || {},
      dataType: 'json',
      timeout: TIMEOUT,
      success: (response) => {
        options.loading && uni.hideLoading()
        responseInterceptors(response)
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
      },
      fail: (err) => {
        options.loading && uni.hideLoading()
        reject(err)
      },
      complete() {
        uni.hideNavigationBarLoading()
      }
    })
  })
}

http.get = (url = '/', data = {}, options = {}) => {
  return http(url, { ...options, data })
}
http.post = (url = '/', data = {}, options = {}) => {
  return http(url, { ...options, data, method: 'POST' })
}

export default http
