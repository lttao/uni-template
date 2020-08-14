<template>
  <view>
    <swiper-action :options="options">
      <view>你的说法</view>
    </swiper-action>
  </view>
</template>

<script>
import swiperAction from '@/component/swipe-action/swipeAction'
export default {
  components: {
    swiperAction
  },
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ]
    }
  }
}
</script>
