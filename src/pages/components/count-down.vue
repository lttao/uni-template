<template>
  <view>
    <e-count-down :timestamp="timestamp" />
  </view>
</template>

<script>
import eCountDown from '@/components/e-count-down/e-count-down.vue'
import { moment } from '@/util'
export default {
  components: {
    eCountDown
  },
  computed: {
    timestamp() {
      console.log(moment().valueOf())
      return 1604465651 - moment().valueOf() / 1000
    }
  }
}
</script>
