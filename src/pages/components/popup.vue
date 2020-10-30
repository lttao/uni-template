<template>
  <view>
    <e-button @click="showLeft = true">展开左侧</e-button>
    <e-popup v-model="showLeft">
      <view style="width: 200rpx; height: 200rpx"></view>
    </e-popup>
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
import ePopup from '@/components/e-popup/e-popup.vue'
export default {
  components: {
    eButton,
    ePopup
  },
  data() {
    return {
      showLeft: true
    }
  }
}
</script>
