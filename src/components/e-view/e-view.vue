<!-- @format -->

<template>
  <view @touchstart="isTouch = true" @touchmove="isTouch = false" @touchend="touchend" :class="hover" class="e-view">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'hoverView',
  props: {
    hoverClass: {
      type: String,
      default: 'cell-hover'
    }
  },
  data() {
    return {
      isTouch: false
    }
  },
  computed: {
    hover() {
      const { isTouch, hoverClass } = this
      // console.log(hoverClass)
      if (isTouch) return hoverClass
      return ''
    }
  },
  methods: {
    touchend() {
      const { isTouch } = this
      if (isTouch) {
        this.$emit('click')
        this.$emit('tab')
      }

      setTimeout(() => {
        this.isTouch = false
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped></style>
