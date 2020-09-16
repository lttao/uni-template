export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)(解决办法为在组件根部再套一个没有任何作用的view元素)
    $getRect(selector, all) {
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
    },
    // 跳转链接
    $toUrl(url, type) {
      switch (type) {
        case 'launch':
          return uni.reLaunch({ url })
        case 'redirect':
          return uni.redirectTo({ url })
        case 'tab':
          return uni.switchTab({ url })
        default:
          return uni.navigateTo({ url })
      }
    },
    // 返回
    $back(num = 1) {
      uni.navigateBack({
        delta: num
      })
    },
    // 预览图片
    $previewImage(url, current = 0) {
      let urls = []
      if (Array.isArray(url)) urls = url
      else if (typeof url === 'string') urls = [url]
      else if (current > urls.length - 1) current = urls.length - 1
      else return console.error('图片预览 请传入数组/字符串')
      uni.previewImage({ urls, current })
    },
    // 弹出提示
    $toast(title, duration = 1500) {
      uni.showToast({
        title: title,
        icon: 'none',
        duration: duration
      })
    },
    // 弹出加载
    $showLoading(parameter) {
      let title = '正在加载'
      let mask = true
      if (typeof parameter === 'string') title = parameter
      if (parameter instanceof Object) {
        title = parameter.title || title
        mask = parameter.mask !== false
      }
      uni.showLoading({ title, mask })
    },
    // 隐藏加载
    $hideLoading() {
      uni.hideLoading()
    }
  },
  onHide() {
    uni.hideToast() // 切换页面隐藏toast
  },
  // 分享
  onShareAppMessage() {}
}
