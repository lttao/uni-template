<!-- @format -->

<template>
  <view class>
    <view
      class="e-sticky-wrap"
      :class="[elClass]"
      :style="{
        height: fixed ? height + 'px' : 'auto'
      }"
    >
      <view
        class="sticky"
        :style="{
          position: fixed ? 'fixed' : 'static',
          top: stickyTop + 'px',
          left: left + 'px',
          width: width === 'auto' ? 'auto' : width + 'px',
          zIndex: uZIndex
        }"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '@/util/mixin/index.js'
export default {
  name: 'e-sticky',
  mixins: [mixin],
  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    // 列表中的索引值
    index: {
      type: [Number, String],
      default: ''
    },
    // 是否开启吸顶功能 产生报错（在onshow 更改此值为 true onhide 变为 false）
    enable: {
      type: Boolean,
      default: true
    },
    // h5顶部导航栏的高度
    h5NavHeight: {
      type: [Number, String],
      default: 44
    },
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      fixed: false,
      height: 'auto',
      stickyTop: 0,
      elClass: 'class0',
      left: 0,
      width: 'auto'
    }
  },
  watch: {
    offsetTop(val) {
      this.initObserver()
    },
    enable(val) {
      if (val === false) {
        this.fixed = false
        this.disconnectObserver('contentObserver')
      } else {
        this.initObserver()
      }
    }
  },
  computed: {
    uZIndex() {
      return this.zIndex ? this.zIndex : 99
    }
  },
  created() {
    this.elClass = 'class' + this.index
  },
  mounted() {
    this.initObserver()
  },
  methods: {
    initObserver() {
      if (!this.enable) return
      // #ifdef H5
      this.stickyTop = this.offsetTop !== 0 ? uni.upx2px(this.offsetTop) + this.h5NavHeight : this.h5NavHeight
      // #endif
      // #ifndef H5
      this.stickyTop = this.offsetTop !== 0 ? uni.upx2px(this.offsetTop) : 0
      // #endif

      this.disconnectObserver('contentObserver')
      this.$getRect('.' + this.elClass).then((res) => {
        this.height = res.height
        this.left = res.left
        this.width = res.width
        this.$nextTick(() => {
          this.observeContent()
        })
      })
    },
    observeContent() {
      this.disconnectObserver('contentObserver')
      const contentObserver = this.createIntersectionObserver({
        thresholds: [0, 0.5, 1]
      })
      contentObserver.relativeToViewport({
        top: -this.stickyTop
      })
      contentObserver.observe('.' + this.elClass, (res) => {
        if (!this.enable) return
        this.setFixed(res.boundingClientRect.top)
      })
      this.contentObserver = contentObserver
    },
    setFixed(top) {
      const fixed = top < this.stickyTop
      if (fixed) this.$emit('fixed', this.index)
      else if (this.fixed) this.$emit('unfixed', this.index)
      this.fixed = fixed
    },
    disconnectObserver(observerName) {
      const observer = this[observerName]
      observer && observer.disconnect()
    }
  },
  beforeDestroy() {
    this.disconnectObserver('contentObserver')
  }
}
</script>

<style scoped lang="scss">
/** @format */

.sticky {
  z-index: 99;
}
</style>
