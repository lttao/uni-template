<template>
  <view>
    <e-switch @change="change" :value="value" :loading="laoding" />
    <e-switch v-model="value" />
  </view>
</template>

<script>
import eSwitch from '@/components/e-switch/e-switch.vue'
export default {
  components: {
    eSwitch
  },
  data() {
    return {
      value: false,
      laoding: false
    }
  },
  methods: {
    change(value) {
      this.laoding = true
      setTimeout(() => {
        this.laoding = false
        this.value = value
      }, 800)
    }
  }
}
</script>
