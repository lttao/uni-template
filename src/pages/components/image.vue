<template>
  <view>
    <view class="flex row-center col-center">
      <e-image :width="100" :height="100" :loading-size="45" shape="circle" :src="src" />
    </view>
    <view class="flex row-center col-center">
      <e-image :width="100" :height="100" :loading-size="45" :src="src" />
    </view>
    <view class="flex row-center col-center">
      <e-image :width="100" :height="100" :src="src" loading-icon="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/github.svg" />
    </view>
    <view class="flex row-center col-center">
      <e-image :width="100" :height="100" src="" />
    </view>
    <view class="flex row-center col-center">
      <e-image :width="100" :height="100" src="1" />
    </view>
  </view>
</template>

<script>
import eImage from '@/components/e-image/e-image.vue'
export default {
  components: { eImage },
  data() {
    return {
      src: ''
    }
  },
  onLoad() {
    setTimeout(() => {
      this.src = 'https://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLAQ8HgjFKLlXHQSaHxOYZ7JTGILNjQFEagvm7ys2pVQDEtvSNffRhHw97xRqkOibomqex8haysrWbmNCB2sfm7Ld02hRzvMSLM4/132'
    }, 1000)
  }
}
</script>
