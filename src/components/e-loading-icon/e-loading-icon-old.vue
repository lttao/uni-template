<!-- @format -->

<template>
  <view v-show="show">
    <view :class="className" class="e-loading-icon" :style="iconStyle">
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
      <view class="e-loading-icon-item"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'e-loading-icon',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '36rpx'
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    className() {
      if (this.type === 'white') return 'white'
      if (this.type === 'primary') return 'primary'
      if (this.type === 'success') return 'success'
      if (this.type === 'error') return 'error'
      return ''
    },
    iconStyle() {
      const style = {}
      const wh = this.getUnitValue(this.size)
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
.e-loading-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
  display: inline-flex;
  vertical-align: middle;

  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      margin: 0 auto;
      width: 4rpx;
      height: 8rpx;
      background-color: #808080;
      border-radius: 4rpx;
      display: block;
      animation: fadeDelay 1.2s infinite ease-in-out both;
    }

    &:nth-child(2) {
      transform: translate3d(0, 0, 0) rotate(30deg);

      &:before {
        animation-delay: -1.1s;
      }
    }

    &:nth-child(3) {
      transform: translate3d(0, 0, 0) rotate(60deg);

      &:before {
        animation-delay: -1s;
      }
    }

    &:nth-child(4) {
      transform: translate3d(0, 0, 0) rotate(90deg);

      &:before {
        animation-delay: -0.9s;
      }
    }

    &:nth-child(5) {
      transform: translate3d(0, 0, 0) rotate(120deg);

      &:before {
        animation-delay: -0.8s;
      }
    }

    &:nth-child(6) {
      transform: translate3d(0, 0, 0) rotate(150deg);

      &:before {
        animation-delay: -0.7s;
      }
    }

    &:nth-child(7) {
      transform: translate3d(0, 0, 0) rotate(180deg);

      &:before {
        animation-delay: -0.6s;
      }
    }

    &:nth-child(8) {
      transform: translate3d(0, 0, 0) rotate(210deg);

      &:before {
        animation-delay: -0.5s;
      }
    }

    &:nth-child(9) {
      transform: translate3d(0, 0, 0) rotate(240deg);

      &:before {
        animation-delay: -0.4s;
      }
    }

    &:nth-child(10) {
      transform: translate3d(0, 0, 0) rotate(270deg);

      &:before {
        animation-delay: -0.3s;
      }
    }

    &:nth-child(11) {
      transform: translate3d(0, 0, 0) rotate(300deg);

      &:before {
        animation-delay: -0.2s;
      }
    }

    &:nth-child(12) {
      transform: translate3d(0, 0, 0) rotate(330deg);

      &:before {
        animation-delay: -0.1s;
      }
    }
  }

  @keyframes fadeDelay {
    0%,
    39%,
    100% {
      opacity: 0.2;
    }
    40% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeDelay {
    0%,
    39%,
    100% {
      opacity: 0.2;
    }
    40% {
      opacity: 1;
    }
  }
}

.primary .e-loading-icon-item::before {
  background-color: #00b1f1;
}
.success .e-loading-icon-item::before {
  background-color: #07c160;
}
.error .e-loading-icon-item::before {
  background-color: #fe491a;
}
.white .e-loading-icon-item::before {
  background-color: #fff;
}
.black .e-loading-icon-item::before {
  background-color: #000;
}
</style>
