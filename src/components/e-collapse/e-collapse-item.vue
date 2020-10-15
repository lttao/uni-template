<template>
  <view class="e-collapse-item" :style="[itemStyle]">
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
export default {
  name: 'e-collapse-item',
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
    // 获取collapse的信息，放在collapse是为了方便，不用每个e-collapse-item写一遍
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
