<template>
  <view class="my-input">
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
    <image v-if="showClearIcon" @touchstart.stop="onClear" src="/static/images/public/clear-btn.png" class="clear-btn" />
  </view>
</template>

<script>
export default {
  name: 'myInput',
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
    }
  },
  data() {
    return {
      showClearIcon: false
    }
  },
  methods: {
    onConfirm(event) {
      this.$emit('confirm', event)
      this.showClearIcon = false
    },
    onClear() {
      const event = { detail: { value: '' } }
      this.$emit('input', event)
      this.showClearIcon = false
    },
    onFocus(event) {
      this.$emit('focus', event)
      if (event.detail.value.length) {
        this.showClearIcon = true
      }
    },
    onBlur(event) {
      this.$emit('blur', event)
      this.showClearIcon = false
    },
    onInput(event) {
      this.$emit('input', event)
      if (event.detail.value.length > 0) {
        this.showClearIcon = true
      } else {
        this.showClearIcon = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-input {
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
    width: 30rpx;
    height: 30rpx;
    cursor: pointer;
  }
}
</style>
