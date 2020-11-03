<template>
  <view v-if="inited" ref="ani" class="e-transition" :class="[customClass, classes]" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import eComponent from '../e-mixin/component'
import transition from '../e-mixin/transition'

export default {
  name: 'eTransition',
  mixins: [eComponent, transition],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'fade'
    },
    duration: {
      type: null,
      default: 300
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    animConfig: {
      type: null,
      default: null
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/index.scss';

.e-transition {
  transition-timing-function: ease;
}

/* #ifndef APP-NVUE */

.e-fade-enter-active,
.e-fade-leave-active {
  transition-property: opacity;
}

.e-fade-enter,
.e-fade-leave-to {
  opacity: 0;
}

.e-fade-down-enter-active,
.e-fade-down-leave-active,
.e-fade-left-enter-active,
.e-fade-left-leave-active,
.e-fade-right-enter-active,
.e-fade-right-leave-active,
.e-fade-up-enter-active,
.e-fade-up-leave-active {
  transition-property: opacity, transform;
}

.e-fade-up-enter,
.e-fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.e-fade-down-enter,
.e-fade-down-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

.e-fade-left-enter,
.e-fade-left-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

.e-fade-right-enter,
.e-fade-right-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

.e-slide-down-enter-active,
.e-slide-down-leave-active,
.e-slide-left-enter-active,
.e-slide-left-leave-active,
.e-slide-right-enter-active,
.e-slide-right-leave-active,
.e-slide-up-enter-active,
.e-slide-up-leave-active {
  transition-property: transform;
}

.e-slide-up-enter,
.e-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}

.e-slide-down-enter,
.e-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}

.e-slide-left-enter,
.e-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.e-slide-right-enter,
.e-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

.e-zoom-in-enter-active,
.e-zoom-in-leave-active,
.e-zoom-out-enter-active,
.e-zoom-out-leave-active {
  transition-property: transform;
}

.e-zoom-in-enter,
.e-zoom-in-leave-to {
  transform: scale(0.8);
}

.e-zoom-out-enter,
.e-zoom-out-leave-to {
  transform: scale(1.2);
}

/* #endif */
</style>
