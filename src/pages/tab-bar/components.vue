<template>
  <view class="components">
    <e-cell icon="shezhi" title="Cell" :title-style="{ color: 'blue' }" label="此页面已展示" value="不可点击" desc="" :can-click="false" :arrow="false" />

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
      list: [
        { url: '/pages/components/icon', title: 'Icon', desc: '图标' },
        { url: '/pages/components/loading-icon', title: 'Loading-icon', desc: '加载图标' },
        { url: '/pages/components/icon', title: 'Loading-more', desc: '加载更多', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Button', desc: '按钮', titleStyle: { color: 'red' } },
        { url: '/pages/components/image', title: 'Image', desc: '图片' },
        { url: '/pages/components/icon', title: 'Input', desc: '输入框', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Mask', desc: '蒙层', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Popup', desc: '弹出层', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Modal', desc: '确认框', titleStyle: { color: 'red' } },
        { url: '/pages/components/sticky', title: 'Sticky', desc: '吸顶' },
        { url: '/pages/components/icon', title: 'Switch', desc: '开关', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Swiper-action', desc: '滑动操作', titleStyle: { color: 'red' } },
        { url: '/pages/components/icon', title: 'Tabs', desc: '切换', titleStyle: { color: 'red' } }
      ]
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
