<template>
  <view
    @tap="click"
    class="cell"
    :class="{ 'border-bottom': borderBottom, 'border-top': borderTop, 'col-center': center, 'cell--required': required }"
    hover-stay-time="150"
    :hover-class="hoverClass"
    :style="{
      backgroundColor: bgColor
    }"
  >
    <!-- <icon :size="iconSize" :name="icon" v-if="icon" :custom-style="iconStyle" class="cell__left-icon-wrap"></icon> -->
    <!-- <view class="flex" v-else>
      <slot name="icon"></slot>
    </view> -->
    <view
      class="cell_title"
      :style="[
        {
          width: titleWidth ? titleWidth + 'rpx' : 'auto'
        },
        titleStyle
      ]"
    >
      <block v-if="title">{{ title }}</block>
      <slot name="title" v-else></slot>

      <view class="cell__label" v-if="label || $slots.label" :style="[labelStyle]">
        <block v-if="label">{{ label }}</block>
        <slot name="label" v-else></slot>
      </view>
    </view>

    <view class="cell__value" :style="[valueStyle]">
      <block class="cell__value" v-if="value">{{ value }}</block>
      <slot v-else></slot>
    </view>
    <view class="flex" v-if="$slots['right-icon']">
      <slot name="right-icon"></slot>
    </view>
    <!-- <icon v-if="arrow" name="arrow-right" :style="[arrowStyle]" class="icon-wrap cell__right-icon-wrap"></icon> -->
  </view>
</template>

<script>
/**
 * cellItem 单元格Item
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。搭配cell-group使用
 * @tutorial https://www.uviewui.com/components/cell.html
 * @property {String} title 左侧标题
 * @property {String} icon 左侧图标名，只支持uView内置图标，见Icon 图标
 * @property {Object} icon-style 左边图标的样式，对象形式
 * @property {String} value 右侧内容
 * @property {String} label 标题下方的描述信息
 * @property {Boolean} border-bottom 是否显示cell的下边框（默认true）
 * @property {Boolean} border-top 是否显示cell的上边框（默认false）
 * @property {Boolean} center 是否使内容垂直居中（默认false）
 * @property {String} hover-class 是否开启点击反馈，none为无效果（默认true）
 * // @property {Boolean} border-gap border-bottom为true时，Cell列表中间的条目的下边框是否与左边有一个间隔（默认true）
 * @property {Boolean} arrow 是否显示右侧箭头（默认true）
 * @property {Boolean} required 箭头方向，可选值（默认right）
 * @property {Boolean} arrow-direction 是否显示左边表示必填的星号（默认false）
 * @property {Object} title-style 标题样式，对象形式
 * @property {Object} value-style 右侧内容样式，对象形式
 * @property {Object} label-style 标题下方描述信息的样式，对象形式
 * @property {String} bg-color 背景颜色（默认transparent）
 * @property {String Number} index 用于在click事件回调中返回，标识当前是第几个Item
 * @property {String Number} title-width 标题的宽度，单位rpx
 * @example <cell-item icon="integral-fill" title="会员等级" value="新版本"></cell-item>
 */
export default {
  name: 'cell-item',
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
    // 标题下方的描述信息
    label: {
      type: [String, Number],
      default: ''
    },
    // 是否显示下边框
    borderBottom: {
      type: Boolean,
      default: true
    },
    // 是否显示上边框
    borderTop: {
      type: Boolean,
      default: false
    },
    // 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
    // 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
    // borderGap: {
    // 	type: Boolean,
    // 	default: true
    // },
    // 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
    hoverClass: {
      type: String,
      default: 'cell-hover'
    },
    // 是否显示右侧箭头
    arrow: {
      type: Boolean,
      default: true
    },
    // 内容是否垂直居中
    center: {
      type: Boolean,
      default: false
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
    // 右侧箭头方向，可选值：right|up|down，默认为right
    arrowDirection: {
      type: String,
      default: 'right'
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
    // 背景颜色
    bgColor: {
      type: String,
      default: 'transparent'
    },
    // 用于识别被点击的是第几个cell
    index: {
      type: [String, Number],
      default: ''
    },
    // 是否使用lable插槽
    useLabelSlot: {
      type: Boolean,
      default: false
    },
    // 左边图标的大小，单位rpx，只对传入icon字段时有效
    iconSize: {
      type: [Number, String],
      default: 34
    },
    // 左边图标的样式，对象形式
    iconStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
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
.cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 26rpx 32rpx;
  font-size: 28rpx;
  line-height: 54rpx;
  color: #222;
  background-color: #fff;
  text-align: left;
}

.cell_title {
  font-size: 28rpx;
}

.cell__left-icon-wrap {
  margin-right: 10rpx;
  font-size: 32rpx;
}

.cell__right-icon-wrap {
  margin-left: 10rpx;
  color: #969799;
  font-size: 28rpx;
}

.cell__left-icon-wrap,
.cell__right-icon-wrap {
  display: flex;
  align-items: center;
  height: 48rpx;
}

.cell-border:after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  left: 0;
  top: 0;
  border-bottom: 1px solid #f2f2f2;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.cell-border {
  position: relative;
}

.cell__label {
  margin-top: 6rpx;
  font-size: 26rpx;
  line-height: 36rpx;
  color: #ccc;
  word-wrap: break-word;
}

.cell__value {
  overflow: hidden;
  text-align: right;
  vertical-align: middle;
  color: #ccc;
  font-size: 26rpx;
}

.cell__title,
.cell__value {
  flex: 1;
}

.cell--required {
  overflow: visible;
  display: flex;
  align-items: center;
}

.cell--required:before {
  position: absolute;
  content: '*';
  left: 8px;
  margin-top: 4rpx;
  font-size: 14px;
  //   color: $type-error;
}
</style>
