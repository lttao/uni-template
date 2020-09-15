// 引入 时间处理
import moment from './moment.js'
import zhCn from './zhCn.js'

// 中文格式化
moment.defineLocale('zh-cn', zhCn)

export { moment }
