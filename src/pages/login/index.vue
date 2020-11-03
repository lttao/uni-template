<template>
  <view class="login-page">
    <e-image src="/static/images/logo.png" :width="300" :height="300" class="logo" />
    <view style="width: 100%;">
      <e-button @click="login" :loading="loading" loading-text="登录中..." round type="success">微信登录</e-button>
      <e-button @click="$toast('暂未开通')" type="success" round plain :button-style="{ 'margin-top': '30rpx' }">手机号登录</e-button>
    </view>
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    eButton
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['setToken']),
    login() {
      this.loading = true
      setTimeout(() => {
        this.setToken('abc')
        this.$back()
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 80%;
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    margin-bottom: 100rpx;
  }
}
</style>
