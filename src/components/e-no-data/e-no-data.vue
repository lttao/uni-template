<!-- @format -->

<template>
  <view :style="{ height: noDataHeight }" class="e-no-data">
    <e-icon :name="noDataUrl" :size="noDataSize" class="icon" color="#808080" />
    <view v-if="noDataText" class="text">{{ noDataText }}</view>
    <slot></slot>
  </view>
</template>

<script>
import eIcon from '../e-icon/e-icon.vue'
export default {
  name: 'noData',
  components: {
    eIcon
  },
  props: {
    noDataHeight: {
      type: String,
      default: '600rpx'
    },
    noDataUrl: {
      type: String,
      default: 'dingdan'
    },
    noDataSize: {
      type: [String, Number],
      default: 160
    },
    noDataText: {
      type: String,
      default: ''
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
    padding-top: 30rpx;
    font-size: 12px;
    color: #949aa6;
  }
}
</style>
