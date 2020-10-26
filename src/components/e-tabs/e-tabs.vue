<template>
  <e-sticky :enable="sticky" :offsetTop="offsetTop" :h5NavHeight="h5NavHeight">
    <view class="e-tabs" :style="{ height: addUnit(height) }">
      <view :style="mianStyle">
        <scroll-view scroll-x class="e-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
          <view class="e-scroll-box" :style="{ height: addUnit(height) }" :class="{ 'e-tabs-scorll-flex': !scroll }">
            <block v-for="(item, index) in list" :key="index">
              <view @click="clickTab(index)" :style="tabItemStyle(index)" class="e-tab-item line-1">
                {{ item | itemFormat(listKey) }}
              </view>
            </block>

            <!-- tab 样式 -->
            <view :style="tabLineStyle" class="e-tab-line">
              <slot name="tab-line">
                <view :style="{ width: addUnit(lineWidth), height: addUnit(lineHeight), background: activeColor }"></view>
              </slot>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </e-sticky>
</template>

<script>
import mixin from '../e-mixin/index.js'
import eSticky from '../e-sticky/e-sticky.vue'
export default {
  name: 'e-tabs',
  mixins: [mixin],
  components: {
    eSticky
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
      default: '#fff'
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
      default: '#1a1a1a'
    },
    // 选中颜色
    activeColor: {
      type: String,
      default: 'blue'
    },
    // 动画时间
    duration: {
      type: [String, Number],
      default: 0.4
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
      const { addUnit, height, fixed, background, offsetTop, zIndex } = this
      const style = {
        width: '100%',
        height: addUnit(height),
        background
      }
      if (fixed) {
        style.position = 'fixed'
        style.zIndex = zIndex

        // #ifdef H5
        style.top = `${uni.upx2px(offsetTop) + this.h5NavHeight}px`
        // #endif
        // #ifndef H5
        style.top = `${uni.upx2px(offsetTop)}px`
        // #endif
      }
      return style
    },
    tabItemStyle() {
      return (index) => {
        const { itemStyle, number, addUnit, height, current, defaultColor, activeColor, duration } = this
        const style = {
          ...itemStyle,
          height: addUnit(height),
          lineHeight: addUnit(height),
          color: current === index ? activeColor : defaultColor,
          transition: `all ${number(duration) ? `${duration}s` : duration}`
        }
        return style
      }
    },
    tabLineStyle() {
      const { number, current, itemsDomInfo, duration } = this
      let tabBarWidth = 0
      let tabBarPosition = 0
      const currentItemInfo = itemsDomInfo[current] // 当前选中item的DOM信息
      if (currentItemInfo) {
        tabBarWidth = currentItemInfo.width
        tabBarPosition = currentItemInfo.left
      }
      const style = {
        width: `${tabBarWidth}px`,
        transform: `translate3d(${tabBarPosition}px, 0, 0)`,
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

/deep/ ::-webkit-scrollbar {
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
scroll-view /deep/ ::-webkit-scrollbar {
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
}

.e-tab-item {
  position: relative;
  display: inline-block;
  padding: 0 20rpx;
  text-align: center;
  transition-property: background-color, color;
  font-weight: bold;
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
