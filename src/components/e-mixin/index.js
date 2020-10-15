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
    }
  }
}
