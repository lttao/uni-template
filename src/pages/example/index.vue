<template>
  <view>
    <navigator url="/pages/example/swiperaction">
      <cell title="swipe action"></cell>
    </navigator>
    <navigator url="/pages/example/collapse">
      <cell title="collapse"></cell>
    </navigator>
  </view>
</template>

<script>
import cell from '@/component/cell/cell.vue'
export default {
  components: {
    cell
  }
}
</script>
