<template>
  <view class="e-popup-wrapper" @touchmove.stop.prevent>
    <!-- #ifdef APP-NVUE -->
    <!-- <e-overlay :show="overlay && value" :custom-style="overlayStyle" @click="onOverlayClick" /> -->
    <!-- nvue 平台降级处理，遮罩无动画 -->
    <view v-if="overlay && value" class="e-overlay" :style="[overlayStyle]" @click="onOverlayClick" />
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <e-mask :show="overlay && value" :custom-style="overlayStyle" @click="onOverlayClick" />
    <!-- #endif -->
    <template v-if="display">
      <template v-if="position === 'center'">
        <view v-if="inited" ref="ani" class="e-popup" :class="[customClass, 'e-popup--' + position, classes]" :style="[mergeStyle]" @click="onOverlayClick">
          <view class="e-popup__content" :style="[customStyle]" @click.stop><slot /></view>
        </view>
      </template>
      <template v-else>
        <view v-if="inited" ref="ani" class="e-popup" :class="[customClass, 'e-popup--' + position, classes]" :style="[mergeStyle]">
          <slot />
        </view>
      </template>
    </template>
  </view>
</template>

<script>
import eComponent from '../e-mixin/component'
import eMask from '../e-mask/e-mask.vue'
import transition from '../e-mixin/transition'

export default {
  name: 'e-popup',
  components: {
    eMask
  },
  mixins: [eComponent, transition],
  // model: {
  //     prop: 'show',
  //     event: 'input'
  // },
  props: {
    value: {
      type: Boolean,
      default: false // 小程序端使用 model 定制 prop 和 event无效，只好在 popup 中使用 value 代替 show
    },
    overlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom' // top, bottom, left, right, center
    },
    duration: {
      type: null,
      default: 300
    },
    overlayStyle: {
      type: Object,
      default: () => ({})
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      name: 'center',
      overlayShow: false
    }
  },
  watch: {
    value: {
      handler(value, old) {
        if (value === old) {
          return
        }

        // #ifndef APP-NVUE
        value ? this.enter() : this.leave()
        // #endif
        // #ifdef APP-NVUE
        value ? this.enter2() : this.leave2()
        // #endif
      },
      immediate: true
    }
  },
  created() {
    this.setAniName()
  },
  methods: {
    onOverlayClick() {
      this.$emit('click-overlay')
      if (this.closeOnClickOverlay) {
        this.$emit('close', false)
        this.$emit('input', false)
      }
    },
    setAniName() {
      const { position } = this
      // #ifdef APP-NVUE
      const aniMap = {
        center: 'fade',
        top: 'slide-down',
        bottom: 'slide-up',
        left: 'slide-left',
        right: 'slide-right'
      }
      this.name = aniMap[position]
      // #endif
      // #ifndef APP-NVUE
      this.name = position
      // #endif
    },
    // 完成过渡后触发
    onTransitionEnd() {
      if (this.transitionEnded) {
        return
      }
      this.transitionEnded = true
      this.$emit(`after-${this.status}`)
      const { value, display } = this
      if (!value && display) {
        this.display = false
        // #ifdef APP-NVUE
        this.inited = false
        // #endif
      }
    }
  }
}
</script>

<style lang="scss">
.e-popup {
  // display: flex;
  position: fixed;
  transition-timing-function: ease;
  /* #ifndef APP-NVUE */
  z-index: 99;
  /* #endif */
  &__content {
    background-color: #fff;
  }

  &--center {
    top: 0;
    left: 0;
    bottom: 0;
    width: 750rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--top {
    background-color: #fff;
    top: 0;
    left: 0;
    width: 750rpx;
  }

  &--bottom {
    background-color: #fff;
    bottom: 0;
    left: 0;
    width: 750rpx;
  }

  &--left {
    background-color: #fff;
    top: 0;
    left: 0;
    /* #ifndef APP-NVUE */
    height: 100%;
    /* #endif */
    /* #ifdef APP-NVUE */
    bottom: 0;
    /* #endif */
  }

  &--right {
    background-color: #fff;
    top: 0;
    right: 0;
    /* #ifndef APP-NVUE */
    height: 100%;
    /* #endif */
    /* #ifdef APP-NVUE */
    bottom: 0;
    /* #endif */
  }
}

/* #ifndef APP-NVUE */

.e-center-enter-active,
.e-center-leave-active {
  transition-property: opacity;
  transform: scale(1);
  transition: transform 0.3s;
}

.e-center-enter,
.e-center-leave-to {
  opacity: 0;
  transform: scale(0.6);
  transition: all 0.3s;
}

.e-bottom-enter-active,
.e-bottom-leave-active,
.e-left-enter-active,
.e-left-leave-active,
.e-right-enter-active,
.e-right-leave-active,
.e-top-enter-active,
.e-top-leave-active {
  transition-property: transform;
}

.e-top-enter,
.e-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

.e-bottom-enter,
.e-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.e-left-enter,
.e-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.e-right-enter,
.e-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

/* #endif */

.e-overlay {
  position: fixed;
  top: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  width: 100%;
  height: 100%;
  z-index: 99;
  /* #endif */
  /* #ifdef APP-NVUE */
  width: 750rpx;
  bottom: 0;
  right: 0;
  // height: 724px;
  /* #endif */
  background-color: rgba(0, 0, 0, 0.5);
}

@keyframes e-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes e-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes e-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
