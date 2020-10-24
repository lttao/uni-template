<template>
  <view>
    <e-load-more status="loading" :loading-height="400" />
    <e-load-more status="loading" />
    <e-load-more status="noMore" />
    <e-load-more status="noData" no-data-text="暂无数据" />
  </view>
</template>

<script>
import eLoadMore from '@/components/e-load-more/e-load-more.vue'
export default {
  components: {
    eLoadMore
  }
}
</script>
