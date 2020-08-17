<template>
  <view>
    <field @input="onInput" :value="values" />
    {{ values }}
  </view>
</template>

<script>
import field from '@/component/field/field.vue'
export default {
  components: {
    field
  },
  data() {
    return {
      values: ''
    }
  },
  methods: {
    onInput(e) {
      this.values = e.detail.value
    }
  }
}
</script>
