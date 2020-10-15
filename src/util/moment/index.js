/** @format */

// 引入 时间处理
import moment from './moment.js'
import locale from './locale/locale.js'

// 中文格式化
moment.defineLocale('zh-cn', locale)

export default moment
