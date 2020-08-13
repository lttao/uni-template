<template>
  <view>
    <view
      v-for="(item, index) in dotList"
      :key="item.id"
      class="dot"
      :style="{
        visibility: dotList[index].show ? 'visible' : 'hidden',
        left: dotList[index].left + 'px',
        top: dotList[index].top + 'px',
        transform: 'scale(' + dotList[index].scale + ')'
      }"
    >
      <image class="animate-image" mode="aspectFill" src="/static/images/home/join-cart.png"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'cartAnimate',
  data() {
    return {
      dotList: []
    }
  },
  methods: {
    joinCart(joinCartDom) {
      const query = uni.createSelectorQuery()

      query
        .select(joinCartDom)
        .boundingClientRect((res = {}) => {
          let { top, left } = res
          // #ifdef H5
          top = top + 44 // H5 距离顶部少了标题高度44px
          // #endif
          const id = +new Date()

          const dot = {
            id,
            top: top,
            left: left,
            scale: 1,
            show: true
          }
          this.dotList.push(dot)
          const index = this.dotList.length - 1
          setTimeout(() => {
            this.$set(this.dotList, index, {
              id,
              top: uni.upx2px(700 * 2),
              left: uni.upx2px(440),
              scale: 0.9,
              show: true
            })
          }, 30)

          setTimeout(() => {
            this.dotList.shift()
          }, 530)
        })
        .exec()
    }
  }
}
</script>

<style lang="scss" scoped>
.dot {
  position: fixed;
  border-radius: 50%;
  z-index: 9999;
  transform-origin: 50% 50%;
  transform: translate3d(0, 0, 0);
  transition: transform linear 0.5s, left linear 0.5s, top cubic-bezier(0.3, -0.2, 1, 0) 0.5s !important; //cubic-bezier(0.3, -0.2, 1, 0),cubic-bezier(0, 0.3, 0, 1)
  width: 45upx;
  height: 45upx;
  border-radius: 50%;
  background: $main-color;
}
.animate-image {
  width: 100%;
  height: 100%;
}
</style>
