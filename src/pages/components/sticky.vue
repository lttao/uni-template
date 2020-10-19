<template>
  <view class="scroll">
    <view style="height: 200rpx; background: red;"></view>
    <view class="test">2465</view>
    <e-sticky>
      <view style="height: 100rpx; background: #fff;" class="flex row-center col-center">545645646</view>
    </e-sticky>
    <view style="height: 2000rpx; background: red;"></view>
  </view>
</template>

<script>
import eSticky from '@/components/e-sticky/e-sticky.vue'
export default {
  components: {
    eSticky
  },
  onReady() {
    const observer = uni.createIntersectionObserver({
      thresholds: [1]
    })
    setTimeout(() => {
      observer.relativeToViewport({ top: -44 }).observe('.test', (res) => {
        console.log(res)
        //   debugger
        if (res.intersectionRatio < 1) {
          console.log('吸顶')
        } else {
          console.log('不吸顶123')
        }
      })
    }, 1000)
    // uni
    //   .createIntersectionObserver(this)
    //   .relativeTo('.scroll', { top: 0 })
    //   .observe('.test', (res) => {
    //     console.log(res)
    //   })
  }
}
</script>
