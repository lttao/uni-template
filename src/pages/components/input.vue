<template>
  <view>
    <e-input v-model="value" placeholder="请输入爱情" />
    {{ value }}
    <view style="height: 150rpx">
      <e-input v-model="value" placeholder="请输入爱情" />
    </view>
  </view>
</template>

<script>
import eInput from '@/components/e-input/e-input.vue'
export default {
  components: {
    eInput
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
