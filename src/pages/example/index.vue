<template>
  <view>
    <navigator url="/pages/example/swiperaction">
      <cell-item title="swipe action"></cell-item>
    </navigator>
    <navigator url="/pages/example/collapse">
      <cell-item title="collapse"></cell-item>
    </navigator>
    <navigator url="/pages/example/cell">
      <cell-item title="cell"></cell-item>
    </navigator>
    <navigator url="/pages/example/field">
      <cell-item title="field"></cell-item>
    </navigator>
  </view>
</template>

<script>
import cellItem from '@/component/cell/cellItem.vue'
export default {
  components: {
    cellItem
  },
  data() {
    return {}
  }
}
</script>
