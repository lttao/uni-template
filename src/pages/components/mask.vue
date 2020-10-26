<template>
  <view>
    <e-mask @click="show = false" :show="show" />
    <view @click="show = !show">{{ show ? '隐藏' : '显示' }}</view>
  </view>
</template>

<script>
import eMask from '@/components/e-mask/e-mask.vue'
export default {
  components: {
    eMask
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
