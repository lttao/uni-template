<!-- @format -->

<template>
  <view>
    <e-popup
      position="center"
      @input="onInput"
      :value="value"
      :popup="false"
      :z-index="eZIndex"
      :mask-close-able="maskCloseAble"
      :border-radius="borderRadius"
      @close="popupClose"
      :negative-top="negativeTop"
    >
      <view class="e-modal" :style="{ width: addUnit(width) }">
        <view v-if="showTitle" class="e-modal__title line-1" :style="[titleStyle]">{{ title }}</view>
        <view class="e-modal__content">
          <view :style="[contentStyle]" v-if="$slots.default">
            <slot />
          </view>
          <view v-else class="e-modal__content__message" :style="[contentStyle]">{{ content }}</view>
        </view>
        <view class="e-modal__footer border-top" v-if="showCancelButton || showConfirmButton">
          <view v-if="showCancelButton" :hover-stay-time="100" hover-class="e-modal__btn--hover" class="e-modal__footer__button border-right" :style="[cancelBtnStyle]" @tap="cancel">
            {{ cancelText }}
          </view>
          <view
            v-if="showConfirmButton || $slots['confirm-button']"
            :hover-stay-time="100"
            :hover-class="asyncClose ? 'none' : 'e-modal__btn--hover'"
            class="e-modal__footer__button hairline-left"
            :style="[confirmBtnStyle]"
            @tap="confirm"
          >
            <slot v-if="$slots['confirm-button']" name="confirm-button"></slot>
            <block v-else>
              <e-loading-icon :type="loadingType" v-if="loading" />
              <block v-else>
                {{ confirmText }}
              </block>
            </block>
          </view>
        </view>
      </view>
    </e-popup>
  </view>
</template>

<script>
import ePopup from '../e-popup/e-popup.vue'
import eLoadingIcon from '../e-loading-icon/e-loading-icon.vue'
import mixin from '../e-mixin'
export default {
  name: 'modal',
  mixins: [mixin],
  components: {
    ePopup,
    eLoadingIcon
  },
  props: {
    // 是否显示Modal
    value: {
      type: Boolean,
      default: false
    },
    // 层级z-index
    zIndex: {
      type: [Number, String],
      default: ''
    },
    // 标题
    title: {
      type: [String],
      default: '提示'
    },
    // 弹窗宽度，可以是数值(rpx)，百分比，auto等
    width: {
      type: [Number, String],
      default: 600
    },
    // 弹窗内容
    content: {
      type: String,
      default: '内容'
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示确认按钮
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      default: false
    },
    // 确认文案
    confirmText: {
      type: String,
      default: '确认'
    },
    // 取消文案
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确认按钮颜色
    confirmColor: {
      type: String,
      default: '#00B1F1'
    },
    // 取消文字颜色
    cancelColor: {
      type: String,
      default: '#949AA6'
    },
    // 圆角值
    borderRadius: {
      type: [Number, String],
      default: 16
    },
    // 标题的样式
    titleStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 内容的样式
    contentStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 取消按钮的样式
    cancelStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 确定按钮的样式
    confirmStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否开启缩放效果
    zoom: {
      type: Boolean,
      default: true
    },
    // 是否异步关闭，只对确定按钮有效
    asyncClose: {
      type: Boolean,
      default: false
    },
    // 是否允许点击遮罩关闭modal
    maskCloseAble: {
      type: Boolean,
      default: false
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    loadingType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      loading: false // 确认按钮是否正在加载中
    }
  },
  computed: {
    cancelBtnStyle() {
      return Object.assign(
        {
          color: this.cancelColor
        },
        this.cancelStyle
      )
    },
    confirmBtnStyle() {
      return Object.assign(
        {
          color: this.confirmColor
        },
        this.confirmStyle
      )
    },
    eZIndex() {
      return this.zIndex ? this.zIndex : 999999
    }
  },
  watch: {
    // 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
    // 避免下次打开的时候，状态混乱
    value(n) {
      if (n === true) this.loading = false
    }
  },
  methods: {
    confirm() {
      // 异步关闭
      if (this.asyncClose) {
        this.loading = true
      } else {
        this.$emit('input', false)
      }
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
      this.$emit('input', false)
      // 目前popup弹窗关闭有一个延时操作，此处做一个延时
      // 避免确认按钮文字变成了"确定"字样，modal还没消失，造成视觉不好的效果
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    onInput(e) {
      this.$emit('input', e)
    },
    // 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
    popupClose() {
      this.$emit('input', false)
    },
    // 清除加载中的状态
    clearLoading() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.e-modal {
  height: auto;
  overflow: hidden;
  font-size: 32rpx;
  background-color: #fff;

  &__btn--hover {
    background-color: rgb(230, 230, 230);
  }

  &__title {
    padding: 38rpx 50rpx 0 50rpx;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    color: #5e6479;
  }

  &__content {
    &__message {
      padding: 48rpx;
      font-weight: 500;
      font-size: 30rpx;
      text-align: center;
      color: #000;
    }
  }

  &__footer {
    display: flex;

    &__button {
      flex: 1;
      height: 100rpx;
      line-height: 100rpx;
      font-weight: 500;
      font-size: 32rpx;
      box-sizing: border-box;
      cursor: pointer;
      text-align: center;
      border-radius: 4rpx;
    }
  }
}
</style>
