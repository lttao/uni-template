import debounce from './debounce.js'
import throttle from './throttle.js'

export { debounce, throttle }

// 深度克隆
export function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj
  }
  var o = Array.isArray(obj) ? [] : {}
  for (const i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

// 判断数据类型
export function getTypeof(value) {
  const type = typeof value
  if (type !== 'object') return type
  return Object.prototype.toString
    .call(value)
    .replace(/\[(\w+)\s+(\w+)\]/, '$2')
    .toLowerCase()
}

// 去掉空格
export function trim(str, pos = 'both') {
  if (pos === 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  } else if (pos === 'left') {
    return str.replace(/^\s*/, '')
  } else if (pos === 'right') {
    return str.replace(/(\s*$)/g, '')
  } else if (pos === 'all') {
    return str.replace(/\s+/g, '')
  } else {
    return str
  }
}
