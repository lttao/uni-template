<template>
  <view class="scroll">
    <view style="height: 200rpx; background: red;"></view>
    <e-sticky>
      <view style="height: 100rpx; background: #fff;" class="flex row-center col-center">1</view>
    </e-sticky>
    <e-sticky>
      <view style="height: 100rpx; background: #fff;" class="flex row-center col-center">2</view>
    </e-sticky>
    <e-sticky :offsetTop="200">
      <view style="height: 100rpx; background: #fff;" class="flex row-center col-center">3</view>
    </e-sticky>
    <view style="height: 2000rpx; background: red;"></view>
  </view>
</template>

<script>
import eSticky from '@/components/e-sticky/e-sticky.vue'
export default {
  components: {
    eSticky
  }
}
</script>
