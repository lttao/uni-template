<template>
  <view class="collapse-item" :style="[itemStyle]">
    <view :hover-stay-time="200" class="collapse-head" @tap.stop="headClick" :hover-class="hoverClass" :style="[headStyle]">
      <block v-if="!$slots['title-all']">
        <view v-if="!$slots['title']" class="collapse-title line-1" :style="[{ textAlign: align ? align : 'left' }, isShow && activeStyle && !arrow ? activeStyle : '']">
          {{ title }}
        </view>
        <slot v-else name="title" />
        <view class="icon-wrap">
          <icons v-if="arrow" :color="arrowColor" :class="{ 'arrow-down-icon-active': isShow }" class="arrow-down-icon" name="down"></icons>
        </view>
      </block>
      <slot v-else name="title-all" />
    </view>
    <view
      class="collapse-body"
      :style="[
        {
          height: isShow ? height + 'px' : '0'
        }
      ]"
    >
      <view class="collapse-content" :id="contentId" :style="[bodyStyle]">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * collapseItem 手风琴Item
 * @description 通过折叠面板收纳内容区域（搭配collapse使用）
 * @tutorial https://www.uviewui.com/components/collapse.html
 * @property {String} title 面板标题
 * @property {String Number} index 主要用于事件的回调，标识那个Item被点击
 * @property {Boolean} disabled 面板是否可以打开或收起（默认false）
 * @property {Boolean} open 设置某个面板的初始状态是否打开（默认false）
 * @property {String Number} name 唯一标识符，如不设置，默认用当前collapse-item的索引值
 * @property {String} align 标题的对齐方式（默认left）
 * @property {Object} active-style 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式
 * @event {Function} change 某个item被打开或者收起时触发
 * @example <collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</collapse-item>
 */
export default {
  name: 'collapse-item',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 标题的对齐方式
    align: {
      type: String,
      default: 'left'
    },
    // 是否可以点击收起
    disabled: {
      type: Boolean,
      default: false
    },
    // collapse显示与否
    open: {
      type: Boolean,
      default: false
    },
    // 唯一标识符
    name: {
      type: [Number, String],
      default: ''
    },
    // 活动样式
    activeStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标识当前为第几个
    index: {
      type: [String, Number],
      default: ''
    }
  },
  inject: ['collapse'],
  data() {
    return {
      isShow: false,
      height: 0, // body内容的高度
      headStyle: {}, // 头部样式，对象形式
      bodyStyle: {}, // 主体部分样式
      // itemStyle: {}, // 每个item的整体样式
      arrowColor: '', // 箭头的颜色
      hoverClass: '' // 头部按下时的效果样式类
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    open(val) {
      this.isShow = val
    }
  },
  computed: {
    arrow() {
      return this.collapse.arrow
    },
    itemStyle() {
      return this.collapse.itemStyle
    },
    contentId() {
      return 'content' + this.index
    }
  },
  created() {
    // 获取collapse的信息，放在collapse是为了方便，不用每个collapse-item写一遍
    this.isShow = this.open
    this.nameSync = this.name ? this.name : this.collapse.childrens.length
    this.collapse.childrens.push(this)
    // this.itemStyle = this.collapse.itemStyle;
    this.headStyle = this.collapse.headStyle
    this.bodyStyle = this.collapse.bodyStyle
    this.arrowColor = this.collapse.arrowColor
    this.hoverClass = this.collapse.hoverClass
  },
  methods: {
    // 异步获取内容，或者动态修改了内容时，需要重新初始化
    init() {
      this.$nextTick(() => {
        this.queryRect()
      })
    },
    // 点击collapsehead头部
    headClick() {
      if (this.disabled) return
      if (this.collapse.accordion === true) {
        this.collapse.childrens.map((val) => {
          // 自身不设置为false，因为后面有this.isShow = !this.isShow;处理了
          if (this !== val) {
            val.isShow = false
          }
        })
      }

      this.isShow = !this.isShow
      // 触发本组件的事件
      this.$emit('change', {
        index: this.index,
        show: this.isShow
      })
      // 只有在打开时才发出事件
      if (this.isShow) this.collapse.onChange()
      this.$forceUpdate()
    },
    // 查询内容高度
    queryRect() {
      // $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
      // 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
      this.$getRect('#' + this.contentId).then((res) => {
        this.height = res.height
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-head {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #222;
  font-size: 30rpx;
  line-height: 1;
  padding: 24rpx 0;
  text-align: left;
}

.collapse-title {
  flex: 1;
  overflow: hidden;
}

.arrow-down-icon {
  margin-right: 20rpx;
  margin-left: 14rpx;
  display: block;
  transition: all 0.3s;
}

.arrow-down-icon-active {
  transform: rotate(180deg);
  transform-origin: center center;
}

.collapse-body {
  overflow: hidden;
  transition: all 0.3s;
}

.collapse-content {
  overflow: hidden;
  font-size: 28rpx;
  color: #ccc;
  text-align: left;
}
</style>
