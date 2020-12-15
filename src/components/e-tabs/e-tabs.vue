<template>
  <e-sticky @sticky="onSticky" :enable="sticky" :offset-top="offsetTop" :h5-nav-height="h5NavHeight" :custom-nav="customNav">
    <view class="e-tabs" :style="{ height: addUnit(height) }">
      <view :style="[mianStyle]">
        <scroll-view scroll-x class="e-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
          <view class="e-scroll-box" :style="{ height: addUnit(height), padding: `0 ${addUnit(margin)}` }" :class="{ 'e-tabs-scorll-flex': !scroll }">
            <block v-for="(item, index) in list" :key="index">
              <view @click="clickTab(index)" :style="[tabItemStyle(index)]" class="e-tab-item line-1">
                {{ item | itemFormat(listKey) }}
              </view>
            </block>

            <!-- tab 样式 -->
            <view :style="[tabLineStyle]" class="e-tab-line">
              <view v-if="!$slots.tabLine" :style="[{ width: addUnit(lineWidth), height: addUnit(lineHeight), background: activeColor }]"></view>
              <slot name="tabLine"></slot>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </e-sticky>
</template>

<script>
import mixin from '../e-mixin'
import ESticky from '../e-sticky/e-sticky.vue'
export default {
  name: 'eTabs',
  mixins: [mixin],
  components: {
    ESticky
  },
  props: {
    // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
    scroll: {
      type: Boolean,
      default: true
    },
    // 需循环的标签列表
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 如果数据结构是对象，设置key
    listKey: {
      type: [String],
      default: ''
    },
    // 当前活动tab的索引
    current: {
      type: [Number, String],
      default: 0
    },
    // 高度
    height: {
      type: [String, Number],
      default: 80
    },
    // 背景颜色
    background: {
      type: String,
      default: ''
    },
    // 是否开启固定
    fixed: {
      type: Boolean,
      default: false
    },
    // 固定层级
    zIndex: {
      type: Number,
      default: 99
    },
    // 是否吸顶
    sticky: {
      type: Boolean,
      default: false
    },
    // 开启固定距离头部的高度
    offsetTop: {
      type: [String, Number],
      default: 0
    },
    // H5导航栏高度
    h5NavHeight: {
      type: [String, Number],
      default: 44
    },
    // 横线宽度
    lineWidth: {
      type: [String, Number],
      default: '60%'
    },
    // 横线高度
    lineHeight: {
      type: [String, Number],
      default: 6
    },
    // 每一项的样式
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    // 默认颜色
    defaultColor: {
      type: String,
      default: '#666666'
    },
    // 选中颜色
    activeColor: {
      type: String,
      default: '#00B1F1'
    },
    // 选中样式
    activeStyle: {
      type: Object,
      default: () => ({})
    },
    // 动画时间
    duration: {
      type: [String, Number],
      default: 0.4
    },
    fontSize: {
      type: Number,
      default: 14
    },
    // 边距
    margin: {
      type: [String, Number],
      default: 14
    },
    // 间隙距离
    gap: {
      type: [String, Number],
      default: 16
    },
    // 是否开启缩放
    scale: Boolean,
    // 未选中字体缩小比例
    scaleValue: {
      type: Number,
      default: 0.85
    },
    // 未选中字体是否加粗
    bold: Boolean,
    // 滑动底部 距离tabs底部的距离
    lineBottom: {
      type: [String, Number],
      default: 0
    },
    // 是否自定义头部
    customNav: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemsDomInfo: []
    }
  },
  watch: {
    list(n, o) {
      // list变动时，重制内部索引，否则可能导致超出数组边界的情况
      if (n.length !== o.length) this.currentIndex = 0
      // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
      this.$nextTick(() => {
        this.init()
      })
    }
  },
  computed: {
    mianStyle() {
      const { addUnit, height, fixed, background } = this
      const style = {
        width: '100%',
        height: addUnit(height),
        background
      }
      if (fixed) {
        const { zIndex, h5NavHeight, customNav, offsetTop } = this
        style.position = 'fixed'
        style.zIndex = zIndex

        // #ifdef H5
        if (customNav) style.top = `${uni.upx2px(offsetTop)}px`
        else style.top = `${uni.upx2px(offsetTop) + h5NavHeight}px`
        // #endif
        // #ifndef H5
        style.top = `${uni.upx2px(offsetTop)}px`
        // #endif
      }
      return style
    },
    tabItemStyle() {
      return (index) => {
        const { itemStyle, number, addUnit, height, current, defaultColor, activeColor, activeStyle, gap, scale, fontSize, bold, duration, scaleValue } = this
        let style = {
          ...itemStyle,
          height: addUnit(height),
          lineHeight: addUnit(height),
          transition: `all ${number(duration) ? `${duration}s` : duration}`,
          color: current === index ? activeColor : defaultColor,
          padding: `0 ${addUnit(gap)}`,
          fontSize: fontSize + 'px',
          fontWeight: bold && !scale ? 'bold' : 'normal',
          transform: scale ? `scale(${scaleValue})` : 'scale(1)'
        }
        if (current === index) {
          style = { ...style, ...activeStyle, transform: 'scale(1)', fontWeight: bold ? 'bold' : 'normal' }
        }
        return style
      }
    },
    tabLineStyle() {
      const { number, current, itemsDomInfo, duration, margin, lineBottom, addUnit } = this
      let tabBarWidth = 0
      let tabBarPosition = 0
      const currentItemInfo = itemsDomInfo[current] // 当前选中item的DOM信息
      if (currentItemInfo) {
        tabBarWidth = currentItemInfo.width
        tabBarPosition = currentItemInfo.left
      }
      const style = {
        width: `${tabBarWidth}px`,
        bottom: addUnit(lineBottom),
        transform: `translate3d(${tabBarPosition + uni.upx2px(margin)}px, 0, 0)`,
        transition: `all ${number(duration) ? `${duration}s` : duration}`
      }
      return style
    },
    scrollLeft() {
      const { itemsDomInfo, current } = this
      if (current <= 1) return 0

      const currentItem = itemsDomInfo[current]
      const frontItem = itemsDomInfo[current - 1]

      if (currentItem && frontItem) return currentItem.left - frontItem.width

      return 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    onSticky(sticky) {
      this.$emit('sticky', sticky)
    },
    // 初始化数据
    init() {
      this.getDomInfo('.e-tab-item', true).then((res = []) => {
        if (res.length) {
          this.itemsDomInfo = res.map((e, i, arr) => {
            return {
              ...e,
              left: e.left - arr[0].left
            }
          })

          this.tabBarWidth = res[0].width
        }
      })
    },
    // 点击某一个tab菜单
    clickTab(index) {
      // 点击当前活动tab，不触发事件
      if (index === this.current) return
      // 发送事件给父组件
      this.$emit('change', index)
    }
  },
  filters: {
    itemFormat(item, key) {
      if (typeof item === 'string') return item
      return item[key]
    }
  }
}
</script>

<style lang="scss" scoped>
view,
scroll-view {
  box-sizing: border-box;
}

::v-deep ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

.e-scroll-box {
  position: relative;
}

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */

.e-scroll-view {
  width: 100%;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.e-tab-item {
  position: relative;
  z-index: 1;
  display: inline-block;
  text-align: center;
  transition-property: background-color, color;
  box-sizing: border-box;
}

.e-tab-line {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.e-tabs-scorll-flex {
  display: flex;
  justify-content: space-between;
}
</style>
