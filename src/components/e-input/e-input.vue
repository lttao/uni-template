<!-- @format -->

<template>
  <view class="e-input">
    <input
      @confirm="onConfirm"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      :value="value"
      :type="type"
      :password="password"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :placeholder-class="placeholderClass"
      :disabled="disabled"
      :maxlength="maxlength"
      :focus="focus"
      :confirm-type="confirmType"
    />
    <!-- <e-icon v-if="showClearIcon" @touchstart.stop="onClear" :size="clearSize" name="guanbi" /> -->
    <image v-if="showClearIcon" @touchstart.stop="onClear" :style="{ width: clearSize, height: clearSize }" src="/static/images/public/clear.png" class="clear-btn" />
  </view>
</template>

<script>
// import eIcon from '../e-icon/e-icon'
export default {
  name: 'e-input',
  components: {
    // eIcon
  },
  props: {
    value: {
      type: String || Number,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    password: {
      type: Boolean,
      default: false
    },
    placeholderStyle: {
      type: String,
      default: ''
    },
    placeholderClass: {
      type: String,
      default: 'input-placeholder'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 140
    },
    focus: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: 'done'
    },
    clearSize: {
      type: String,
      default: '40rpx'
    }
  },
  data() {
    return {
      showClearIcon: false
    }
  },
  methods: {
    onConfirm(event) {
      const { value } = event.detail
      this.$emit('confirm', value)
      this.showClearIcon = false
    },
    onClear() {
      this.$emit('input', '')
      this.showClearIcon = false
    },
    onFocus(event) {
      const { value } = event.detail
      this.$emit('focus', value)
      if (value) {
        this.showClearIcon = true
      }
    },
    onBlur(event) {
      const { value } = event.detail
      this.$emit('blur', value)
      this.showClearIcon = false
    },
    onInput(event) {
      const { value } = event.detail
      this.$emit('input', value)
      if (value) {
        this.showClearIcon = true
      } else {
        this.showClearIcon = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.e-input {
  flex: 1;
  width: 100%;
  min-height: 40rpx;
  height: 100%;
  display: flex;
  align-items: center;
  input {
    flex: 1;
    height: 100%;
    border: none;
    background: none;
    padding-right: 15rpx;
    box-sizing: border-box;
  }
  .clear-btn {
    cursor: pointer;
  }
}
</style>
