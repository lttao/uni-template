<template>
  <view class="components">
    <e-cell icon="shezhi" title="Cell" :title-style="{ color: 'blue' }" label="此页面已展示" value="不可点击" desc="" :can-click="false" :arrow="false" />

    <block v-for="(item, index) in list" :key="index">
      <e-cell @click="toUrl(item)" :url="item.url" :title="item.title" :desc="item.desc" :titleStyle="item.titleStyle" :border="cellBorder(index)" />
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
      scrollTop: 0,
      tabBackTop: false,
      backTopDistance: 100,
      list: [
        { url: '/pages/components/button', title: 'Button', desc: '按钮' },
        { url: '/pages/components/collapse', title: 'Collapse', desc: '折叠面板' },
        { url: '/pages/components/icon', title: 'Icon', desc: '图标' },
        { url: '/pages/components/image', title: 'Image', desc: '图片' },
        { url: '/pages/components/input', title: 'Input', desc: '输入框' },
        { url: '/pages/components/load-more', title: 'Load-more', desc: '加载更多' },
        { url: '/pages/components/loading-icon', title: 'Loading-icon', desc: '加载图标' },
        { url: '/pages/components/mask', title: 'Mask', desc: '蒙层' },
        { url: '/pages/components/popup', title: 'Popup', desc: '弹出层(待完善)' },
        { url: '/pages/components/modal', title: 'Modal', desc: '确认框' },
        { url: '/pages/components/sticky', title: 'Sticky', desc: '吸顶' },
        { url: '/pages/components/swiper-action', title: 'Swiper-action', desc: '滑动操作' },
        { url: '/pages/components/switch', title: 'Switch', desc: '开关' },
        { url: '/pages/components/tabs', title: 'Tabs', desc: '切换' }
      ]
    }
  },
  computed: {
    cellBorder() {
      return (index) => {
        const { list } = this
        return index < list.length - 1
      }
    }
  },
  onLoad() {
    console.log('onLoad')
  },
  methods: {
    toUrl(item) {
      const { url } = item
      if (!url) return this.$toast('还未开通，请等待')
      this.$toUrl(url)
    },

    setNewTab() {
      uni.setTabBarItem({
        index: 0,
        iconPath: '/static/images/tab-bar/back-top.png',
        selectedIconPath: '/static/images/tab-bar/back-top.png',
        text: '回到顶部'
      })
      this.tabBackTop = true
    },
    setOldTab() {
      uni.setTabBarItem({
        index: 0,
        iconPath: '/static/images/tab-bar/1.png',
        selectedIconPath: '/static/images/tab-bar/1-checked.png',
        text: '组件'
      })
      this.tabBackTop = false
    }
  },
  onPageScroll({ scrollTop }) {
    const { backTopDistance } = this
    this.scrollTop = scrollTop

    if (scrollTop >= backTopDistance) this.setNewTab()
    else this.setOldTab()
  },
  onTabItemTap(e) {
    const { scrollTop, tabBackTop, backTopDistance } = this
    if (scrollTop >= backTopDistance && tabBackTop) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 100
      })
    }
  },
  onShow() {
    const { scrollTop, backTopDistance } = this

    if (scrollTop >= backTopDistance) {
      setTimeout(() => {
        this.setNewTab()
      })
    }
  },
  onHide() {
    this.setOldTab()
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
