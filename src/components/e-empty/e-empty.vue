<!-- @format -->

<template>
  <view :style="{ height: emptyIconHeight }" class="e-empty">
    <e-icon :name="emptyIconUrl" :size="emptyIconSize" class="icon" color="#808080" />
    <view v-if="emptyText" class="text">{{ emptyText }}</view>
    <view class="e-empty-action e-flex e-row-center">
      <slot></slot>
    </view>
  </view>
</template>

<script>
import eIcon from '../e-icon/e-icon.vue'
export default {
  name: 'e-empty',
  components: {
    eIcon
  },
  props: {
    emptyIconHeight: {
      type: String,
      default: '600rpx'
    },
    emptyIconUrl: {
      type: String,
      default: 'dingdan'
    },
    emptyIconSize: {
      type: [String, Number],
      default: 160
    },
    emptyText: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../e-styles/index.scss';
.e-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text {
    padding-top: 30rpx;
    font-size: 12px;
    color: #949aa6;
  }
  &-action {
    width: 100%;
    padding-top: 30rpx;
  }
}
</style>
