<template>
  <view>
    <block v-for="(item, index) in list" :key="index">
      <swiper-action @click="toDetail(item)" @action-click="onDel" :options="options">
        <cell-item :title="item.title"></cell-item>
      </swiper-action>
    </block>
  </view>
</template>

<script>
import cellItem from '@/component/cell/cellItem.vue'
import swiperAction from '@/component/swipe-action/swipeAction'
export default {
  components: {
    cellItem,
    swiperAction
  },
  data() {
    return {
      list: [{ title: '大法' }, { title: 'dsdsfa' }],
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
      this.$toast('点击详情' + item.title)
    },
    onDel() {
      this.$toast('点击删除')
    }
  }
}
</script>

<style lang="scss" scoped></style>
