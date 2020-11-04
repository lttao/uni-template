<template>
  <view>
    <e-button @click="show = true" type="primary" size="middle">打开弹框</e-button>
    <e-modal v-model="show" />
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
import eModal from '@/components/e-modal/e-modal.vue'
export default {
  components: {
    eButton,
    eModal
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
