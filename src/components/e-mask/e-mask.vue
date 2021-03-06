<!-- @format -->

<template>
  <view
    class="e-mask"
    hover-stop-propagation
    :style="[maskStyle, zoomStyle]"
    @tap="click"
    @touchmove.stop.prevent
    :class="{
      'mask-zoom': zoom,
      'mask-show': show
    }"
  >
    <slot />
  </view>
</template>

<script>
export default {
  name: 'e-mask',
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: false
    },
    // 层级z-index
    zIndex: {
      type: [Number, String],
      default: ''
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
    zoom: {
      type: Boolean,
      default: true
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [Number, String],
      default: 300
    },
    // 是否可以通过点击遮罩进行关闭
    maskClickAble: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      zoomStyle: {
        transform: ''
      },
      scale: 'scale(1.2, 1.2)'
    }
  },
  watch: {
    show(n) {
      if (n && this.zoom) {
        // 当展示遮罩的时候，设置scale为1，达到缩小(原来为1.2)的效果
        this.zoomStyle.transform = 'scale(1, 1)'
      } else if (!n && this.zoom) {
        // 当隐藏遮罩的时候，设置scale为1.2，达到放大(因为显示遮罩时已重置为1)的效果
        this.zoomStyle.transform = this.scale
      }
    }
  },
  computed: {
    maskStyle() {
      let style = {}
      style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
      if (this.show) style.zIndex = this.zIndex ? this.zIndex : 99
      else style.zIndex = -1
      style.transition = `all ${this.duration / 1000}s ease-in-out`
      // 判断用户传递的对象是否为空，不为空就进行合并
      if (Object.keys(this.customStyle).length) style = { ...style, ...this.customStyle }
      return style
    }
  },
  methods: {
    click() {
      if (!this.maskClickAble) return
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
/** @format */

.e-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: transform 0.3s;
}

.mask-show {
  opacity: 1;
}

.mask-zoom {
  transform: scale(1.2, 1.2);
}
</style>
