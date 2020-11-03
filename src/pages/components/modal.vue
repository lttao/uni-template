<template>
  <view>
    <view @click="show = true">打开弹框</view>
    <e-modal v-model="show" />
  </view>
</template>

<script>
import eModal from '@/components/e-modal/e-modal.vue'
export default {
  components: {
    eModal
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
