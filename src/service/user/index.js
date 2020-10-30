import http from '@/http'

export const login = (data) => {}

// TODO: 例子 不是真实接口
export const urlInfo = (data) => http.get('/user/info', data)
