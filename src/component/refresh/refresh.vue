<template>
  <view
    @mousemove.stop="touchmove"
    @touchmove.stop="touchmove"
    @mouseup="stopDrag"
    @touchend="stopDrag"
    @mouseleave="stopDrag"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @transitionend="transitionEnd"
    :style="{ transform: translate, transitionDuration: transition }"
    class="refresh"
  >
    <view v-if="requesting" class="refresh-tip">{{ topDropText }}</view>
    <view v-else class="refresh-tip">{{ dragging && dY > topDistance ? topLoadingText : topPullText }}</view>
    <view style="height: 3000px; background: #ccc;">21456156 </view>
  </view>
</template>

<script>
function a(e) {
  var t = e
  while (t && t.tagName !== 'HTML' && t.tagName !== 'BODY' && t.nodeType === 1) {
    var n = document.defaultView.getComputedStyle(t).overflowY
    if (n === 'scroll' || n === 'auto') return t
    t = t.parentNode
  }
  return document.documentElement
}

export default {
  name: 'loadmore',
  created: function() {
    this.$nextTick(() => {
      this.topBarHeight = this.$el.children[0].clientHeight
    })
    // r.a.$on('mvLoadEnd', function() {
    //   e.loadEnd()
    // })
    // r.a.$on('mvLoadStart', function() {
    //   e.scrollTarget.scrollTop = 0
    //   e.loadStart()
    // })
  },
  mounted: function() {
    this.scrollTarget = a(this.$el)
  },
  props: {
    topDistance: {
      type: Number,
      default: 100
    },
    topPullText: {
      type: String,
      default: '下拉刷新'
    },
    topDropText: {
      type: String,
      default: '加载中...'
    },
    topLoadingText: {
      type: String,
      default: '释放更新'
    },
    showText: {
      type: Boolean,
      default: !0
    },
    showArrow: {
      type: Boolean,
      default: !0
    },
    topMethod: {
      type: Function,
      default: () => {
        console.log('刷新事件，请传入topMethod')
      }
    }
  },
  data: function() {
    return {
      scrollTarget: null,
      topBarHeight: 0,
      requesting: !1,
      dragging: !1,
      startY: 0,
      dY: 0,
      reset: !0
    }
  },
  computed: {
    transition: function() {
      return this.dragging || (this.dY === 0 && this.reset) ? '0s' : '200ms'
    },
    translate: function() {
      var e = 80 * Math.atan(this.dY / 200) - this.topBarHeight
      return 'translateY('.concat(e, 'px)')
    },
    status: function() {
      return this.dragging && this.dY > this.topDistance ? this.topLoadingText : this.requesting ? this.topDropText : this.topPullText
    }
  },
  watch: {
    requesting: function(e) {
      e || (this.dY = 0)
    }
  },
  methods: {
    touchmove(e) {
      this.onDrag(e)
      e.stopPropagation()
    },
    loadStart: function() {
      this.requesting = !0
      this.topMethod()
      this.dY = this.topDistance

      // TODO: 暂时写死
      setTimeout(() => {
        this.loadEnd()
      }, 1000)
    },
    loadEnd: function() {
      this.requesting = !1
    },
    startDrag: function(e) {
      var t = e.changedTouches ? e.changedTouches[0] : e
      if (this.scrollTarget.scrollTop <= 0) {
        this.startY = t.pageY
        this.dragging = !0
        this.reset = !1
      }
    },
    onDrag: function(e) {
      var t = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging && t.pageY - this.startY > 0 && window.scrollY <= 0) {
        e.preventDefault()
        event.returnValue = false
        this.dY = t.pageY - this.startY
        if (this.requesting) {
          this.dY = this.dY + this.topDistance
        }
      }
    },
    stopDrag: function() {
      this.dragging = !1
      this.dY > this.topDistance && window.scrollY <= 0 ? this.loadStart() : (this.dY = 0)
    },
    transitionEnd: function() {
      this.dY !== this.topDistance || this.requesting || (this.dY = 0)
      this.dY === 0 && (this.reset = !0)
    }
  }
}
</script>

<style lang="scss" scoped>
.refresh {
  min-height: 100vh;
  &-tip {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
