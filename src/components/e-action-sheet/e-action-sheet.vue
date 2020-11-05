<template>
  <e-popup @input="onInput" :value="value">
    <view class="e-action-sheet">
      <view class="e-action-sheet_title">标题</view>
      <e-icon @click="onInput(false)" name="guanbi" color="#909090" size="38" class="e-action-sheet_close" />
      <view class="e-action-sheet_action" hover-class="e-cell-hover">操作1</view>
      <view @click="onInput(false)" class="e-action-sheet_cancel e-action-sheet_action" hover-class="e-cell-hover">取消</view>
    </view>
  </e-popup>
</template>

<script>
import eIcon from '../e-icon/e-icon'
import ePopup from '../e-popup/e-popup'
export default {
  components: {
    eIcon,
    ePopup
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../e-styles/index.scss';
.e-action-sheet {
  position: relative;
  background-color: #fff;
  &_title {
    line-height: 100rpx;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }
  &_close {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
  }
  &_action {
    line-height: 100rpx;
    text-align: center;
    font-size: 15px;
  }
  &_cancel {
    &::before {
      content: '';
      height: 20rpx;
      background: #f7f8fa;
      display: block;
    }
  }
}
</style>
