<!-- @format -->

<template>
  <view class="e-load-more">
    <!-- 加载中 -->
    <view v-show="status === 'loading'">
      <view :style="[loadingStyle]" class="loading">
        <e-loading-icon :size="34"></e-loading-icon>
        <view class="loading-text">加载中...</view>
      </view>
    </view>

    <!-- 暂无更多 -->
    <slot v-if="status === 'noMore'" name="noMore">
      <view :style="[heightStyle]" class="loading">{{ noMoreText }}</view>
    </slot>
    <!-- 下拉加载更多数据 -->
    <view v-show="status === 'more'">
      <slot name="more">
        <view :style="[heightStyle]" class="loading">上拉加载更多</view>
      </slot>
    </view>
    <!-- 暂无数据 -->
    <slot v-if="status === 'noData'" name="noData">
      <e-empty :empty-icon-url="emptyIconUrl" :empty-icon-size="emptyIconSize" :empty-icon-height="emptyIconHeight" :empty-text="emptyText">
        <slot name="empty-action"></slot>
      </e-empty>
    </slot>
  </view>
</template>

<script>
import eLoadingIcon from '../e-loading-icon/e-loading-icon'
import eEmpty from '../e-empty/e-empty.vue'

export default {
  name: 'e-load-more',
  components: {
    eLoadingIcon,
    eEmpty
  },
  props: {
    status: {
      type: String,
      default: ''
    }, // 状态：loading => 加载中 noMore => 暂无更多 noData => 没有数据 more => 加载更多
    noMoreText: {
      type: String,
      default: '没有更多了'
    },
    emptyIconSize: {
      type: [String, Number],
      default: 160
    },
    emptyIconUrl: {
      type: String,
      default: 'dingdan'
    },
    emptyText: {
      type: String
    },
    isNoDataAction: {
      type: Boolean,
      default: false
    },
    emptyIconHeight: {
      type: String,
      default: '650rpx'
    },
    loadingHeight: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 80
    }
  },
  computed: {
    heightStyle() {
      return { height: this.getUnitValue(this.height) }
    },
    loadingStyle() {
      const style = {}
      style.height = this.getUnitValue(this.loadingHeight || this.height)
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
.e-load-more {
  .loading {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #ccc;
  }
  .loading-text {
    margin-left: 15rpx;
  }
}
</style>
