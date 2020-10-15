<template>
  <view class="components">
    <e-cell icon="shezhi" title="Cell" :title-style="{ color: 'blue' }" label="此页面已展示" value="不可点击" desc="" :can-click="false" :arrow="false" />
    <e-cell title="Icon" desc="图标" arrow-direction="right" />
    <e-cell title="Loading-icon" desc="加载图标" arrow-direction="right" />
    <e-cell title="Loading-more" desc="加载更多" arrow-direction="right" />
    <e-cell title="Button" desc="按钮" arrow-direction="right" />
    <e-cell title="Image" desc="图片" arrow-direction="right" />
    <e-cell title="Input" desc="输入框" arrow-direction="right" />
    <e-cell title="Mask" desc="蒙层" arrow-direction="right" />
    <e-cell title="Popup" desc="弹出层" arrow-direction="right" />
    <e-cell title="Modal" desc="确认框" arrow-direction="right" />
    <e-cell title="Sticky" desc="吸顶" arrow-direction="right" />
    <e-cell title="Switch" desc="开关" arrow-direction="right" />
    <e-cell title="Swiper-action" desc="滑动操作" arrow-direction="right" />
    <e-cell title="Tabs" desc="切换tab" arrow-direction="right" />
  </view>
</template>

<script>
import eCell from '@/components/e-cell/e-cell.vue'
export default {
  components: {
    eCell
  },
  data() {
    return {}
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
