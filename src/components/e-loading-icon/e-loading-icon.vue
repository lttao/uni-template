<template>
  <view v-if="show" class="e-loading-icon">
    <image v-if="type === 'primary'" src="/static/images/components/loading/primary.gif" :style="{ width: addUnit(size), height: addUnit(size) }" mode="aspectFit" />
    <image v-else-if="type === 'error'" src="/static/images/components/loading/error.gif" :style="{ width: addUnit(size), height: addUnit(size) }" mode="aspectFit" />
    <image v-else-if="type === 'success'" src="/static/images/components/loading/success.gif" :style="{ width: addUnit(size), height: addUnit(size) }" mode="aspectFit" />
    <image v-else-if="type === 'white'" src="/static/images/components/loading/white.gif" :style="{ width: addUnit(size), height: addUnit(size) }" mode="aspectFit" />
    <image v-else src="/static/images/components/loading/default.gif" :style="{ width: addUnit(size), height: addUnit(size) }" mode="aspectFit" class="e-loading-icon" />
  </view>
</template>

<script>
import mixin from '../e-mixin/index.js'
export default {
  name: 'e-loading-icon',
  mixins: [mixin],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: [String, Number],
      default: 40
    }
  },
  computed: {
    styles() {
      const style = {}
      style.background = this.color
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.e-loading-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
