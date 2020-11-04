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
      return moment().valueOf() / 1000 + 1000 - moment().valueOf() / 1000
    }
  }
}
</script>
