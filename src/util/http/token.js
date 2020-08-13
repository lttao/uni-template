// 储存 token
export const setToken = (token = '') => {
	try {
		uni.setStorageSync('token', token)
	} catch (e) {
		console.error('token 存储失败', e)
	}
}
// 获取 token
export const getToken = () => {
	try {
		const token = uni.getStorageSync('token')
		if (token) return token
	} catch (e) {
		console.error('token 获取失败', e)
		return ''
	}
}
// 移除 token
export const removeToken = () => {
	try {
		uni.removeStorageSync('token')
	} catch (e) {
		console.error('token 清除失败', e)
	}
}