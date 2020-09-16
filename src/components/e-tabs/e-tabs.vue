<template>
  <view
    class="e-tabs"
    :style="{
      background: bgColor
    }"
  >
    <!-- $getRect()对组件根节点无效，因为写了.in(this)，故这里获取内层接点尺寸 -->
    <view :id="id">
      <scroll-view scroll-x class="e-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
        <view class="e-scroll-box" :class="{ 'e-tabs-scorll-flex': !isScroll }">
          <view class="e-tab-item line-1" :id="'e-tab-item-' + index" v-for="(item, index) in list" :key="index" @tap="clickTab(index)" :style="[tabItemStyle(index)]">
            {{ item | itemFormat(name) }}
          </view>
          <view v-if="showBar" class="e-tab-bar" :style="[tabBarStyle]"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'e-tabs',
  props: {
    // id值
    id: {
      type: String,
      default: 'e-tabs'
    },
    // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
    isScroll: {
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
    // 当前活动tab的索引
    current: {
      type: [Number, String],
      default: 0
    },
    // 导航栏的高度和行高
    height: {
      type: [String, Number],
      default: 80
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: 30
    },
    // 过渡动画时长, 单位ms
    duration: {
      type: [String, Number],
      default: 0.5
    },
    // 选中项的主题颜色
    activeColor: {
      type: String,
      default: '#2979ff'
    },
    // 未选中项的颜色
    inactiveColor: {
      type: String,
      default: '#303133'
    },
    // 菜单底部移动的bar的宽度，单位rpx
    barWidth: {
      type: [String, Number],
      default: 40
    },
    // 移动bar的高度
    barHeight: {
      type: [String, Number],
      default: 6
    },
    // 单个tab的左或有内边距（左右相同）
    gutter: {
      type: [String, Number],
      default: 20
    },
    // 导航栏的背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    // 读取传入的数组对象的属性
    name: {
      type: String,
      default: 'name'
    },
    // 活动tab字体是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // 当前活动tab item的样式
    activeItemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否显示底部的滑块
    showBar: {
      type: Boolean,
      default: true
    },
    // 底部滑块的自定义样式
    barStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标签的宽度
    itemWidth: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      scrollLeft: 0, // 滚动scroll-view的左边滚动距离
      tabQueryInfo: [], // 存放对tab菜单查询后的节点信息
      componentWidth: 0, // 屏幕宽度，单位为px
      scrollBarLeft: 0, // 移动bar需要通过translateX()移动的距离
      parentLeft: 0, // 父元素(tabs组件)到屏幕左边的距离
      currentIndex: this.current,
      barFirstTimeMove: true // 滑块第一次移动时(页面刚生成时)，无需动画，否则给人怪异的感觉
    }
  },
  watch: {
    // 监听tab的变化，重新计算tab菜单的布局信息，因为实际使用中菜单可能是通过
    // 后台获取的（如新闻app顶部的菜单），获取返回需要一定时间，所以list变化时，重新获取布局信息
    list(n, o) {
      // list变动时，重制内部索引，否则可能导致超出数组边界的情况
      if (n.length !== o.length) this.currentIndex = 0
      // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
      this.$nextTick(() => {
        this.init()
      })
    },
    current: {
      immediate: true,
      handler(nVal, oVal) {
        // 视图更新后再执行移动操作
        this.$nextTick(() => {
          this.currentIndex = nVal
          this.scrollByIndex()
        })
      }
    }
  },
  computed: {
    // 移动bar的样式
    tabBarStyle() {
      const style = {
        width: this.barWidth + 'rpx',
        transform: `translate(${this.scrollBarLeft}px, -100%)`,
        // 滑块在页面渲染后第一次滑动时，无需动画效果
        'transition-duration': `${this.barFirstTimeMove ? 0 : this.duration}s`,
        'background-color': this.activeColor,
        height: this.barHeight + 'rpx',
        // 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
        'border-radius': `${this.barHeight / 2}px`
      }
      Object.assign(style, this.barStyle)
      return style
    },
    // tab的样式
    tabItemStyle() {
      return (index) => {
        let style = {
          height: this.height + 'rpx',
          'line-height': this.height + 'rpx',
          'font-size': this.fontSize + 'rpx',
          'transition-duration': `${this.duration}s`,
          padding: this.isScroll ? `0 ${this.gutter}rpx` : '',
          flex: this.isScroll ? 'auto' : '1',
          maxWidth: this.addUnit(this.itemWidth)
        }
        // 字体加粗
        if (index === this.currentIndex && this.bold) style.fontWeight = 'bold'
        if (index === this.currentIndex) {
          style.color = this.activeColor
          // 给选中的tab item添加外部自定义的样式
          style = Object.assign(style, this.activeItemStyle)
        } else {
          style.color = this.inactiveColor
        }
        return style
      }
    }
  },
  methods: {
    // 设置一个init方法，方便多处调用
    async init() {
      // 获取tabs组件的尺寸信息
      const tabRect = await this.$getRect('#' + this.id)
      // tabs组件距离屏幕左边的宽度
      this.parentLeft = tabRect.left
      // tabs组件的宽度
      this.componentWidth = tabRect.width
      this.getTabRect()
    },
    // 点击某一个tab菜单
    clickTab(index) {
      // 点击当前活动tab，不触发事件
      if (index === this.currentIndex) return
      // 发送事件给父组件
      this.$emit('change', index)
    },
    // 查询tab的布局信息
    getTabRect() {
      // 创建节点查询
      const query = uni.createSelectorQuery().in(this)
      // 历遍所有tab，这里是执行了查询，最终使用exec()会一次性返回查询的数组结果
      for (let i = 0; i < this.list.length; i++) {
        // 只要size和rect两个参数
        query.select(`#e-tab-item-${i}`).fields({
          size: true,
          rect: true
        })
      }
      // 执行查询，一次性获取多个结果
      query.exec(
        function(res) {
          this.tabQueryInfo = res
          // 初始化滚动条和移动bar的位置
          this.scrollByIndex()
        }.bind(this)
      )
    },
    // 滚动scroll-view，让活动的tab处于屏幕的中间位置
    scrollByIndex() {
      // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
      const tabInfo = this.tabQueryInfo[this.currentIndex]
      if (!tabInfo) return
      // 活动tab的宽度
      const tabWidth = tabInfo.width
      // 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
      const offsetLeft = tabInfo.left - this.parentLeft
      // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
      const scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2
      this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
      // 当前活动item的中点点到左边的距离减去滑块宽度的一半，即可得到滑块所需的移动距离
      const left = tabInfo.left + tabInfo.width / 2 - this.parentLeft
      // 计算当前活跃item到组件左边的距离
      this.scrollBarLeft = left - uni.upx2px(this.barWidth) / 2
      // 第一次移动滑块的时候，barFirstTimeMove为true，放到延时中将其设置false
      // 延时是因为scrollBarLeft作用于computed计算时，需要一个过程需，否则导致出错
      if (this.barFirstTimeMove === true) {
        setTimeout(() => {
          this.barFirstTimeMove = false
        }, 100)
      }
    },
    // 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
    addUnit(value = 'auto', unit = 'rpx') {
      value = String(value)
      return this.number(value) ? `${value}${unit}` : value
    },
    // 验证十进制数字
    number(value) {
      return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
    }
  },
  mounted() {
    this.init()
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

::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
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
  text-align: center;
  transition-property: background-color, color;
}

.e-tab-bar {
  position: absolute;
  bottom: 0;
}

.e-tabs-scorll-flex {
  display: flex;
  justify-content: space-between;
}
</style>