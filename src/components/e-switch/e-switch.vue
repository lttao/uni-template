<template>
  <view class="e-switch" :class="[value == true ? 'e-switch-on' : '', disabled ? 'e-switch-disabled' : '']" @tap="onClick" :style="[switchStyle]">
    <view
      class="e-switch-node node-class"
      :style="{
        width: addUnit(this.size),
        height: addUnit(this.size)
      }"
    >
      <e-loading-icon :show="loading" class="e-switch-loading" :size="size * 0.6" />
    </view>
  </view>
</template>

<script>
import eLoadingIcon from '../e-loading-icon/e-loading-icon.vue'
import mixin from '../e-mixin/index.js'
export default {
  name: 'e-switch',
  mixins: [mixin],
  components: {
    eLoadingIcon
  },
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: false
    },
    // 开关尺寸，单位rpx
    size: {
      type: [Number, String],
      default: 50
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: '#2979ff'
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: '#ffffff'
    },
    // 通过v-model双向绑定的值
    value: {
      type: Boolean,
      default: false
    },
    // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
    vibrateShort: {
      type: Boolean,
      default: true
    },
    // 打开选择器时的值
    activeValue: {
      type: [Number, String, Boolean],
      default: true
    },
    // 关闭选择器时的值
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    switchStyle() {
      const style = {}
      style.fontSize = this.size + 'rpx'
      style.backgroundColor = this.value ? this.activeColor : this.inactiveColor
      return style
    },
    loadingColor() {
      return this.value ? this.activeColor : null
    }
  },
  methods: {
    onClick() {
      const { disabled, loading } = this
      if (!disabled && !loading) {
        const { vibrateShort, value, activeValue, inactiveValue } = this
        this.$emit('input', !value)
        this.$emit('change', !value ? activeValue : inactiveValue)

        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        if (vibrateShort) uni.vibrateShort()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.e-switch {
  position: relative;
  display: inline-block;
  box-sizing: initial;
  width: 2em;
  height: 1em;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  transition: background-color 0.3s;
  font-size: 50rpx;
}

.e-switch-node {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  z-index: 1;
  background-color: #fff;
  background-color: #fff;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05), -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.e-switch-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.e-switch-on {
  background-color: #1989fa;
}

.e-switch-on .e-switch-node {
  transform: translateX(100%);
}

.e-switch-disabled {
  opacity: 0.4;
}
</style>
