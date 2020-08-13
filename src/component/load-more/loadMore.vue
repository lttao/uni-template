<template>
  <view class="load-more">
    <!-- 加载中 -->
    <view v-if="status === 'loading'" :style="{ height: `${height}rpx` }" class="loading">
      <view class="loading-icon">
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
        <view class="loading-icon-item"></view>
      </view>
      <view class="text">加载中...</view>
    </view>

    <!-- 暂无更多 -->
    <slot v-if="status === 'noMore'" name="noMore">
      <view :style="{ height: `${height}rpx` }" class="loading">{{ noMoreText }}</view>
    </slot>

    <!-- 暂无数据 -->
    <slot v-if="status === 'noData'" name="noData">
      <view :style="{ height: `${noDataHeight}rpx` }" class="no-data">
        <image :src="noDataUrl" mode="aspectFit" class="image" />
        <text class="text">{{ noDataText }}</text>
        <view v-if="isNoDataAction" @click="noDataClick" class="action-btn" hover-class="hover-class">{{ noDataActionText }}</view>
      </view>
    </slot>
  </view>
</template>

<script>
export default {
  name: 'loadMore',
  props: {
    status: {
      type: String,
      default: ''
    }, // 状态：loading => 加载中 noMore => 暂无更多 noData => 没有数据
    noMoreText: {
      type: String,
      default: '已经到底了~'
    },
    noDataUrl: {
      type: String,
      default: '/static/images/public/no-order.png'
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    isNoDataAction: {
      type: Boolean,
      default: false
    },
    noDataActionText: {
      type: String,
      default: '立即刷新'
    },
    noDataHeight: {
      type: Number,
      default: 650
    },
    height: {
      type: Number,
      default: 80
    }
  },
  methods: {
    noDataClick(e) {
      this.$emit('noDataClick', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ccc;
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .image {
    width: 110rpx;
    height: 110rpx;
  }
  .text {
    padding-top: 35rpx;
    font-size: 14px;
    color: #ccc;
  }
  .action-btn {
    margin-top: 20rpx;
    min-width: 160rpx;
    height: 60rpx;
    background: $main-color;
    padding: 0 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #fff;
  }
}
.loading-icon {
  position: relative;
  margin-right: 15rpx;
  width: 36rpx;
  height: 36rpx;
  display: inline-block;
  vertical-align: middle;

  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 36rpx;
    height: 36rpx;

    &:before {
      content: '';
      margin: 0 auto;
      width: 4rpx;
      height: 8rpx;
      background-color: #222;
      border-radius: 4rpx;
      display: block;
      animation: fadeDelay 1.2s infinite ease-in-out both;
    }

    &:nth-child(2) {
      transform: rotate(30deg);

      &:before {
        animation-delay: -1.1s;
      }
    }

    &:nth-child(3) {
      transform: rotate(60deg);

      &:before {
        animation-delay: -1s;
      }
    }

    &:nth-child(4) {
      transform: rotate(90deg);

      &:before {
        animation-delay: -0.9s;
      }
    }

    &:nth-child(5) {
      transform: rotate(120deg);

      &:before {
        animation-delay: -0.8s;
      }
    }

    &:nth-child(6) {
      transform: rotate(150deg);

      &:before {
        animation-delay: -0.7s;
      }
    }

    &:nth-child(7) {
      transform: rotate(180deg);

      &:before {
        animation-delay: -0.6s;
      }
    }

    &:nth-child(8) {
      transform: rotate(210deg);

      &:before {
        animation-delay: -0.5s;
      }
    }

    &:nth-child(9) {
      transform: rotate(240deg);

      &:before {
        animation-delay: -0.4s;
      }
    }

    &:nth-child(10) {
      transform: rotate(270deg);

      &:before {
        animation-delay: -0.3s;
      }
    }

    &:nth-child(11) {
      transform: rotate(300deg);

      &:before {
        animation-delay: -0.2s;
      }
    }

    &:nth-child(12) {
      transform: rotate(330deg);

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
</style>
