<template>
  <view class="page">
    <view class="main flex-col col-center row-center">
      <e-image src="/static/images/logo.png" :width="160" :height="160" class="logo" />
      <text class="text font">Elegant-UI</text>
    </view>
  </view>
</template>

<script>
import eImage from '@/components/e-image/e-image.vue'
export default {
  components: {
    eImage
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  background: #fff;
}
.main {
  height: 50vh;
  .logo {
    margin-bottom: 30rpx;
  }
  .text {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
