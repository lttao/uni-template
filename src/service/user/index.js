import http from '@/http'

// TODO: 例子 不是真实接口
export const userInfo = data => http.get('/user/info', data, { isLogin: true })