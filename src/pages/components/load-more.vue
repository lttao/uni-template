<template>
  <view>
    <e-load-more status="loading" :loading-height="400" />
    <e-load-more status="loading" />
    <e-load-more status="noMore" />
    <e-load-more status="more" />
    <e-load-more status="noData" empty-text="暂无数据" />
    <e-load-more status="noData" empty-text="暂无数据">
      <view slot="empty-action">
        <e-button type="primary" size="middle">查看</e-button>
      </view>
    </e-load-more>
  </view>
</template>

<script>
import eLoadMore from '@/components/e-load-more/e-load-more.vue'
import eButton from '@/components/e-button/e-button.vue'
export default {
  components: {
    eLoadMore,
    eButton
  }
}
</script>
