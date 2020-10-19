<template>
  <view>
    <view>
      <e-loading-icon type="primary" />
      <e-loading-icon type="white" />
      <e-loading-icon type="success" />
      <e-loading-icon type="error" />
      <e-loading-icon />
    </view>

    <view style="padding: 20rpx 0">
      <e-loading-icon type="primary" :size="30" />
      <e-loading-icon type="white" :size="30" />
      <e-loading-icon type="success" :size="30" />
      <e-loading-icon type="error" :size="30" />
      <e-loading-icon :size="30" />
    </view>

    <view>
      <e-loading-icon type="primary" :size="60" />
      <e-loading-icon type="white" :size="60" />
      <e-loading-icon type="success" :size="60" />
      <e-loading-icon type="error" :size="60" />
      <e-loading-icon :size="60" />
    </view>
  </view>
</template>

<script>
import eLoadingIcon from '@/components/e-loading-icon/e-loading-icon.vue'
export default {
  components: {
    eLoadingIcon
  }
}
</script>
