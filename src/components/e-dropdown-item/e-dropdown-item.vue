<template>
  <view class="e-dropdown-item" v-if="active" @touchmove.stop.prevent="() => {}" @tap.stop.prevent="() => {}">
    <block v-if="!$slots.default && !$slots.$default">
      <scroll-view
        scroll-y="true"
        :style="{
          height: addUnit(height)
        }"
      >
        <view class="e-dropdown-item_options">
          <block v-for="(item, index) in options" :key="index">
            <view @click="cellClick(item.value)" class="e-dropdown-item_cell e-flex col-center row-between" hover-class="e-cell-hover">
              <view :style="{ color: item.value === value ? activeColor : inactiveColor }">{{ item.label }}</view>
              <e-icon v-if="item.value === value" name="chengong1" :color="activeColor" size="38"></e-icon>
            </view>
          </block>
        </view>
      </scroll-view>
    </block>
    <slot v-else />
  </view>
</template>

<script>
import mixin from '../e-mixin'
export default {
  name: 'e-dropdown-item',
  mixins: [mixin],
  props: {
    // 当前选中项的value值
    value: {
      type: [Number, String, Array],
      default: ''
    },
    // 菜单项标题
    title: {
      type: [String, Number],
      default: ''
    },
    // 选项数据，如果传入了默认slot，此参数无效
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否禁用此菜单项
    disabled: {
      type: Boolean,
      default: false
    },
    // 下拉弹窗的高度
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      active: false, // 当前项是否处于展开状态
      activeColor: '#2979ff', // 激活时左边文字和右边对勾图标的颜色
      inactiveColor: '#606266' // 未激活时左边文字和右边对勾图标的颜色
    }
  },
  computed: {
    // 监听props是否发生了变化，有些值需要传递给父组件e-dropdown，无法双向绑定
    propsChange() {
      return `${this.title}-${this.disabled}`
    }
  },
  watch: {
    propsChange(n) {
      // 当值变化时，通知父组件重新初始化，让父组件执行每个子组件的init()方法
      // 将所有子组件数据重新整理一遍
      if (this.parent) this.parent.init()
    }
  },
  created() {
    // 父组件的实例
    this.parent = false
    console.log('created', this.options)
  },
  methods: {
    init() {
      // 获取父组件e-dropdown
      const parent = this.getParent('e-dropdown')
      if (parent) {
        this.parent = parent
        // 将子组件的激活颜色配置为父组件设置的激活和未激活时的颜色
        this.activeColor = parent.activeColor
        this.inactiveColor = parent.inactiveColor
        // 将本组件的this，放入到父组件的children数组中，让父组件可以操作本(子)组件的方法和属性
        // push进去前，显判断是否已经存在了本实例，因为在子组件内部数据变化时，会通过父组件重新初始化子组件
        const exist = parent.children.find((val) => {
          return this === val
        })
        if (!exist) parent.children.push(this)
        if (parent.children.length === 1) this.active = true
        // 父组件无法监听children的变化，故将子组件的title，传入父组件的menuList数组中
        parent.menuList.push({
          title: this.title,
          disabled: this.disabled
        })
      }
    },
    getParent(name = undefined) {
      let parent = this.$parent
      // 通过while历遍，这里主要是为了H5需要多层解析的问题
      while (parent) {
        // 父组件
        if (parent.$options && parent.$options.name !== name) {
          // 如果组件的name不相等，继续上一级寻找
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },
    // cell被点击
    cellClick(value) {
      // 修改通过v-model绑定的值
      this.$emit('input', value)
      // 通知父组件(e-dropdown)收起菜单
      this.parent.close()
      // 发出事件，抛出当前勾选项的value
      this.$emit('change', value)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
@import '../e-styles/index.scss';
.e-dropdown-item {
  &_cell {
    height: 90rpx;
    background: #fff;
    padding: 0 30rpx;
    font-size: 15px;
  }
}
</style>
