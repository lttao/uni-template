<template>
  <view>
    <block v-for="(item, index) in list" :key="index">
      <e-swiper-action @click="toDetail(item)" @action-click="onDel(item)" :options="options">
        <e-cell :title="item.title"></e-cell>
      </e-swiper-action>
    </block>
  </view>
</template>

<script>
import eCell from '@/components/e-cell/e-cell.vue'
import eSwiperAction from '@/components/e-swiper-action/e-swiper-action.vue'
export default {
  components: {
    eCell,
    eSwiperAction
  },
  data() {
    return {
      list: [{ title: 'A' }, { title: 'B' }],
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    }
  },
  methods: {
    toDetail(item) {
      this.$toast('点击' + item.title)
    },
    onDel(item) {
      this.$toast(`点击 ${item.title} 删除`)
    }
  }
}
</script>

<style lang="scss" scoped></style>
