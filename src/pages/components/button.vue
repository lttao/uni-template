<template>
  <view style="padding: 0 20rpx">
    <view style="padding-bottom: 40rpx;">
      <e-button>按钮</e-button>
      <e-button type="primary">按钮</e-button>
      <e-button type="warning">按钮</e-button>
      <e-button loading type="primary">按钮</e-button>
      <e-button disabled>按钮</e-button>
      <e-button disabled type="primary">按钮</e-button>
      <e-button disabled type="warning">按钮</e-button>
    </view>
    <view style="padding-bottom: 40rpx;">
      <e-button plain>按钮</e-button>
      <e-button plain type="primary">按钮</e-button>
      <e-button plain type="warning">按钮</e-button>
      <e-button loading plain>按钮</e-button>
      <e-button loading plain type="primary">按钮</e-button>
      <e-button loading plain type="warning">按钮</e-button>
    </view>
    <view style="padding-bottom: 40rpx;">
      <e-button plain>按钮</e-button>
      <e-button plain type="primary">按钮</e-button>
      <e-button plain type="warning">按钮</e-button>
      <e-button loading plain>按钮</e-button>
      <e-button loading plain type="primary">按钮</e-button>
      <e-button loading plain type="warning">按钮</e-button>
    </view>
    <view style="padding-bottom: 40rpx;" class="flex flex-wrap">
      <e-button size="middle" plain>按钮</e-button>
      <e-button size="middle" plain type="primary">按钮</e-button>
      <e-button size="middle" plain type="warning">按钮</e-button>
      <e-button size="middle" loading plain>按钮</e-button>
      <e-button size="middle" loading plain type="primary">按钮</e-button>
      <e-button size="middle" loading plain type="warning">按钮</e-button>
    </view>
    <view style="padding-bottom: 40rpx;" class="flex flex-wrap">
      <e-button size="mini" plain>按钮</e-button>
      <e-button size="mini" plain type="primary">按钮</e-button>
      <e-button size="mini" plain type="warning">按钮</e-button>
      <e-button size="mini" loading plain>按钮</e-button>
      <e-button size="mini" loading plain type="primary">按钮</e-button>
      <e-button size="mini" loading plain type="warning">按钮</e-button>
    </view>
    <view style="padding-bottom: 40rpx;" class="flex flex-wrap">
      <e-button size="mini" :width="500" :height="90" :radius="0" plain>按钮</e-button>
      <e-button size="mini" :width="200" :height="50" :radius="0" plain type="primary">按钮</e-button>
    </view>
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
export default {
  components: {
    eButton
  }
}
</script>
