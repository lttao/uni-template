<template>
  <view class="components">
    <block v-for="(item, index) in list" :key="index">
      <e-cell @click="$toUrl(item.url)" v-bind="item" />
    </block>
  </view>
</template>

<script>
import eCell from '@/components/e-cell/e-cell.vue'
export default {
  components: {
    eCell
  },
  data() {
    return {
      list: [{ url: '/pages/example/sku', title: 'Sku', desc: 'Sku' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.components {
  &::after {
    content: '';
    height: var(--window-bottom);
    display: block;
  }
}
</style>
