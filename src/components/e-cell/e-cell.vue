<template>
  <view @click="click" class="e-cell">
    <view :style="cellStyle" :hover-class="`${canClick && hoverClass}`" :class="{ 'e-cell-border': border }" class="e-flex e-col-center e-row-padding">
      <view class="e-cell_left e-flex e-col-center e-flex-1">
        <!-- 图标 -->
        <e-icon v-if="icon" :name="icon" :size="iconSize" class="e-right-margin" />

        <!-- 左侧内容 -->
        <view v-if="$slots['left']">
          <slot name="left"></slot>
        </view>
        <view v-else>
          <view :style="titleStyle" class="e-cell-title">{{ title }}</view>
          <view v-if="label" :style="labelStyle" class="e-cell-label">{{ label }}</view>
        </view>
      </view>

      <view class="e-cell_right e-flex e-col-center">
        <!-- 右侧内容 -->
        <view v-if="$slots['right']">
          <slot name="right"></slot>
        </view>
        <view>
          <text v-if="value" :style="valueStyle" class="e-cell-value">{{ value }}</text>
          <text v-else class="e-cell-desc">{{ desc }}</text>
        </view>

        <!-- 箭头 -->
        <e-icon v-if="arrow" name="right" size="36" color="#c9c9c9" :style="arrowStyle" class="arrow" />
      </view>
    </view>
  </view>
</template>

<script>
import eIcon from '../e-icon/e-icon.vue'
export default {
  name: 'e-cell',
  components: {
    eIcon
  },
  props: {
    // 左侧图标名称(只能uView内置图标)，或者图标src
    icon: {
      type: String,
      default: ''
    },
    // 左侧标题
    title: {
      type: [String, Number],
      default: ''
    },
    // 右侧内容
    value: {
      type: [String, Number],
      default: ''
    },
    // 右侧提示内容
    desc: {
      type: [String, Number],
      default: ''
    },
    // 标题下方的描述信息
    label: {
      type: [String, Number],
      default: ''
    },
    // 是否显示下边框
    border: {
      type: Boolean,
      default: true
    },
    // 鼠标按下样式
    hoverClass: {
      type: String,
      default: 'cell-hover'
    },
    // 是否显示右侧箭头
    arrow: {
      type: Boolean,
      default: true
    },
    // 右侧箭头方向，可选值：right|up|down，默认为right
    arrowDirection: {
      type: String,
      default: 'right'
    },
    // 是否显示左边表示必填的星号
    required: {
      type: Boolean,
      default: false
    },
    // 标题的宽度，单位rpx
    titleWidth: {
      type: [Number, String],
      default: ''
    },
    // 控制标题的样式
    titleStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 右侧显示内容的样式
    valueStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 描述信息的样式
    labelStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 整体高度
    height: {
      type: [String, Number],
      default: '100rpx'
    },
    // 背景颜色
    background: {
      type: String,
      default: '#fff'
    },
    // 左边图标的大小，单位rpx，只对传入icon字段时有效
    iconSize: {
      type: [Number, String],
      default: 38
    },
    // 可以点击
    canClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    cellStyle() {
      const { height, background } = this
      const style = {
        height,
        background
      }
      return style
    },
    arrowStyle() {
      const style = {}
      if (this.arrowDirection === 'up') style.transform = 'rotate(-90deg)'
      else if (this.arrowDirection === 'down') style.transform = 'rotate(90deg)'
      else style.transform = 'rotate(0deg)'
      return style
    }
  },
  methods: {
    click() {
      this.$emit('click', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/elegant-ui.scss';

.e-cell {
  &-title {
    font-weight: bold;
    font-size: 15px;
  }
  &-label {
    padding-top: 10rpx;
    font-size: 12px;
    color: #c9c9c9;
  }
  &-value {
    font-size: 13px;
  }
  &-desc {
    font-size: 13px;
    color: #c9c9c9;
  }
  &-border {
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: $e-page-margin;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #e9e9e9;
      transform: scaleY(0.5);
    }
  }
  .arrow {
    margin-left: 10rpx;
  }
}
</style>
