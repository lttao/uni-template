export default {
  methods: {
    // 增加单位
    addUnit(value = 'auto', unit = 'rpx') {
      value = String(value)
      return this.number(value) ? `${value}${unit}` : value
    },
    // 验证十进制数字
    number(value) {
      return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
    },
    // 获取节点
    getDomInfo(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    }
  }
}
