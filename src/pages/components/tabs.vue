<template>
  <view>
    <e-tabs @change="change" :current="current" :list="list" :item-style="{ fontSize: '30rpx' }" fixed></e-tabs>
    <view>5455</view>
    <e-tabs @change="change" :current="current" :list="list" :item-style="{ fontSize: '30rpx' }" sticky :offsetTop="80"></e-tabs>

    <view @click="current = index" v-for="(item, index) in list" :key="index">{{ item }}</view>
    <e-tabs @change="change" :current="current" :list="list" :height="100">
      <view slot="tabLine">
        <image style="width: 50rpx; height: 20rpx; background: red;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1570848938,378600287&fm=26&gp=0.jpg" mode="" />
      </view>
    </e-tabs>
    <view style="height: 1000px"></view>
  </view>
</template>

<script>
import eTabs from '@/components/e-tabs/e-tabs.vue'
export default {
  components: {
    eTabs
  },
  data() {
    return {
      current: 0,
      list: ['A', 'B']
    }
  },
  onLoad() {
    setTimeout(() => {
      this.list = ['A', 'BBBBBBBB', 'CC', 'A', 'BBBBBBBB', 'CC', 'A', 'BBBBBBBB', 'CC']
    }, 1000)
  },
  methods: {
    change(index) {
      this.current = index
    }
  }
}
</script>
