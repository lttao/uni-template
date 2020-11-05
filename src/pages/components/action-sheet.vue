<template>
  <view>
    <e-button @click="show = true" type="primary">展开操作</e-button>
    <e-action-sheet v-model="show"></e-action-sheet>
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
import eActionSheet from '@/components/e-action-sheet/e-action-sheet.vue'
export default {
  components: {
    eButton,
    eActionSheet
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
