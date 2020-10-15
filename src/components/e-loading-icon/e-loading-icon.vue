<template>
  <view>
    <image src="/static/images/components/loading.gif" mode="aspectFit" class="e-loading-icon" />
    <!-- <view class="e-loading-icon">
      <view :style="styles" class="rect rect1"></view>
      <view :style="styles" class="rect rect2"></view>
      <view :style="styles" class="rect rect3"></view>
      <view :style="styles" class="rect rect4"></view>
      <view :style="styles" class="rect rect5"></view>
    </view> -->
  </view>
</template>

<script>
export default {
  name: 'e-loading-icon',
  props: {
    color: {
      type: String,
      default: 'rgba(255, 255, 255, .6)'
    }
  },
  computed: {
    styles() {
      const style = {}
      style.background = this.color
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.e-loading-icon {
  width: 40rpx;
  height: 40rpx;
}
.e-loading-icon {
  margin: 100px auto;
  height: 60rpx;
  display: flex;
  align-items: center;
  font-size: 10px;
}

.e-loading-icon > .rect {
  margin: 0 2rpx;
  background: #fff;
  height: 100%;
  width: 6rpx;

  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.e-loading-icon .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.e-loading-icon .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.e-loading-icon .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.e-loading-icon .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.5);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
