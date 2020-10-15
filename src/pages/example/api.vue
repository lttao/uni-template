<template>
  <view>
    <view>5456465465</view>
    <!-- <e-button loading>点击</e-button> -->

    <view style="background: blue;">
      <image src="/static/images/components/loading2.gif" mode="aspectFit" style="width: 100rpx; height: 100rpx;" />
    </view>
  </view>
</template>

<script>
import { moment } from '@/util'

import eButton from '@/components/e-button/e-button.vue'
// import { eInput, eNoData, eButton } from '@/components'

export default {
  components: { eButton }
}
console.log(moment())
// for (var i = 0; i < 6; i++) {
//   console.log('外面', i)
//   setTimeout(() => {
//     console.log(i)
//   })
// }

// function pro() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1)
//     })
//     resolve(resolve)
//   }).then((resolve) => {
//     console.log(resolve)
//     resolve(4)
//   })
// }

// pro().then((res) => {
//   console.log(res)
// })

setTimeout(() => console.log(4))

new Promise((resolve) => {
  resolve()
  console.log(1)
}).then(() => {
  console.log(3)
})
</script>
