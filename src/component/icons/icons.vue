<template>
  <view @tap="click" :style="[containerStyle]" class="icon-container">
    <image v-if="isImg" :src="name" :mode="mode" class="icon-img"></image>
    <text v-else class="icon" :style="[iconStyle]" :class="customClass"></text>
  </view>
</template>

<script>
/**
 * icon 图标
 * @property {String} width 用于占位的宽度
 * @property {String} height 用于占位的高度
 * @description 基于字体的图标集，包含了大多数常见场景的图标。
 * @tutorial https://www.uviewui.com/components/icon.html
 * @property {String} name 图标名称，见示例图标集
 * @property {String} color 图标颜色（默认inherit）
 * @property {String | Number} size 图标字体大小，单位rpx（默认32）
 * @property {Object} custom-style icon的样式，对象形式
 * @property {String} custom-prefix 自定义字体图标库时，需要写上此值
 * @property {String} label-pos label相对于图标的位置，只能right或bottom（默认right）
 * @property {String} index 一个用于区分多个图标的值，点击图标时通过click事件传出
 * @property {String} hover-class 图标按下去的样式类，用法同uni的view组件的hover-class参数，详情见官网
 * @event {Function} click 点击图标时触发
 * @example <icon name="photo" color="#2979ff" size="28"></icon>
 */
export default {
  name: 'icon',
  props: {
    // 用于占位
    width: {
      type: [String, Number],
      default: '36rpx'
    },
    // 用于占位
    height: {
      type: [String, Number],
      default: '36rpx'
    },
    // 图标类名
    name: {
      type: String,
      default: ''
    },
    // icon 颜色
    color: {
      type: String,
      default: ''
    },
    // 字体大小，单位rpx
    size: {
      type: [Number, String],
      default: '36rpx'
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: false
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: 'icon-'
    },
    // 图片的mode
    mode: {
      type: String,
      default: 'aspectFit'
    }
  },
  computed: {
    customClass() {
      return this.customPrefix + this.name
    },
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      return this.name.indexOf('/') !== -1
    },
    iconStyle() {
      return {
        fontSize: this.addUnit(this.size),
        color: this.color,
        bold: this.bold
      }
    },
    containerStyle() {
      const style = {}
      // 如果设置width和height属性，则优先使用，否则使用size属性
      style.width = this.width ? this.addUnit(this.width) : this.addUnit(this.size)
      style.height = this.height ? this.addUnit(this.height) : this.addUnit(this.size)
      return style
    }
  },
  methods: {
    click() {
      this.$emit('click', this.index)
    },
    // 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
    addUnit(value = 'auto', unit = 'rpx') {
      value = String(value)
      // 用uView内置验证规则中的number判断是否为数值
      return this.number(value) ? `${value}${unit}` : value
    },
    // 验证十进制数字
    number(value) {
      return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/icon/iconfont.css';

.icon-container {
  display: flex;
  align-items: center;
  align-items: center;
  .icon-img {
    width: 100%;
    height: 100%;
  }
}
</style>
