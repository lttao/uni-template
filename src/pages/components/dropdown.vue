<template>
  <view>
    <e-dropdown ref="eDropdown">
      <e-dropdown-item v-model="value1" title="距离" :options="options1"></e-dropdown-item>
      <e-dropdown-item v-model="value2" title="温度" :options="options2"></e-dropdown-item>
      <e-dropdown-item title="属性">
        <view class="slot-content">
          <view style="background: #fff; height: 200rpx">其他自定义内容</view>
          <button type="primary" @click="closeDropdown">确定</button>
        </view>
      </e-dropdown-item>
    </e-dropdown>
  </view>
</template>

<script>
import eDropdown from '@/components/e-dropdown/e-dropdown.vue'
import eDropdownItem from '@/components/e-dropdown-item/e-dropdown-item.vue'
export default {
  components: {
    eDropdown,
    eDropdownItem
  },
  data() {
    return {
      value1: 1,
      value2: 2,
      options1: [
        {
          label: '默认排序',
          value: 1
        },
        {
          label: '距离优先',
          value: 2
        },
        {
          label: '价格优先',
          value: 3
        }
      ],
      options2: [
        {
          label: '去冰',
          value: 1
        },
        {
          label: '加冰',
          value: 2
        }
      ]
    }
  },
  methods: {
    closeDropdown() {
      this.$refs.eDropdown.close()
    }
  }
}
</script>
