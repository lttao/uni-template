<!-- @format -->

<template>
  <view @tap="click" :style="[containerStyle]" class="e-icon">
    <image v-if="isImg" :src="name" :mode="mode" class="icon-img"></image>
    <text v-else :style="[iconStyle]" :class="customClass" class="icon"></text>
  </view>
</template>

<script>
export default {
  name: 'icon',
  props: {
    // 图标类名
    name: {
      type: String,
      default: ''
    },
    // 用于占位
    width: {
      type: [String, Number],
      default: ''
    },
    // 用于占位
    height: {
      type: [String, Number],
      default: ''
    },
    // 字体大小 (数字类型默认单位rpx)
    size: {
      type: [Number, String],
      default: '36rpx'
    },
    // icon 颜色 (字体图标生效)
    color: {
      type: String,
      default: ''
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
      // 优先使用width和height属性，否则使用size属性
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

.e-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-img {
    width: 100%;
    height: 100%;
  }
}
</style>
