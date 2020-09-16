<!-- @format -->

<template>
  <view :style="{ height: noDataHeight }" class="e-no-data">
    <image :src="noDataUrl" mode="aspectFit" class="icon" :style="imgStyle"></image>
    <view v-if="noDataText" class="text">{{ noDataText }}</view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'noData',
  props: {
    noDataHeight: {
      type: String,
      default: '600rpx'
    },
    noDataUrl: {
      type: String,
      default: '/static/images/user/no-data.png'
    },
    noDataSize: {
      type: [String, Number]
    },
    noDataText: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgStyle() {
      const style = {}
      console.log(this.noDataSize)
      const wh = this.getUnitValue(this.noDataSize || 212)
      style.width = wh
      style.height = wh
      return style
    }
  },
  methods: {
    // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
    getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val)) return val
      else return val + 'rpx'
    }
  }
}
</script>

<style lang="scss" scoped>
.e-no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    padding-top: 50rpx;
    font-size: 12px;
    color: #949aa6;
  }
}
</style>
