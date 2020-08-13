// expire 有效期，单位小时，默认24, 0表示立即过期，-1表示不设置过期时间

/**
 * 获取本地存储
 * 会判断过期时间，如果已过期返回空，否则返回存储的内容
 * @param key
 */
export function getLocal(key = '') {
    const dataStr = uni.getStorageSync(key)
    if (!dataStr) return
    try {
      const data = JSON.parse(dataStr)
      const { expireTime, body } = data
      if (expireTime === undefined) return data
      if (expireTime === -1) return body
      const now = new Date().getTime()
      if (now > expireTime) {
        // uni.setStorageSync(key, '') // 已过期，删除存储的值
        return
      }
      return body
    } catch (e) {}
  }
  
  /**
   * 设置本地存储
   * @param key 存储key
   * @param val 存储值
   * @param expire 有效期，单位小时，默认24, 0表示立即过期，-1表示不设置过期时间
   */
  export function setLocal(key, val, expire = 24) {
    if (!val) {
      uni.removeStorageSync(key)
      return
    }
    let expireTime
    if (expire === -1) {
      expireTime = -1
    } else {
      expireTime = new Date().getTime() + expire * 60 * 60 * 1000
    }
    const data = {
      expireTime: expireTime,
      body: val
    }
    console.log(data)
    uni.setStorageSync(key, JSON.stringify(data))
  }
  
  // storage工具类
  class StorageUtil {
    getToken() {
      return getLocal('token')
      // return getLocal('token') || 'oTVt1wmotVAPse8DKV8PXf7oJqCA'
    }
  
    setToken(token) {
      return setLocal('token', token)
    }
  
    getPayOpenId() {
      return getLocal('payOpenId')
    }
  
    setPayOpenId(payOpenId) {
      return setLocal('payOpenId', payOpenId)
    }
  }
  
  export const storageUtil = new StorageUtil()
  