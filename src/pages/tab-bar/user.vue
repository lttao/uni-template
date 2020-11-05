<template>
  <view class="page">
    <view class="main flex-col col-center row-center">
      <e-image src="/static/images/logo.png" :width="160" :height="160" class="logo" />
      <text @click="loginIn" class="text font">{{ hasLogin ? 'Elegant-UI' : '请登录' }}</text>
    </view>
    <eCell v-if="hasLogin" @click="loginOut" title="退出登录" :border="false" />
  </view>
</template>

<script>
import eImage from '@/components/e-image/e-image.vue'
import eCell from '@/components/e-cell/e-cell.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    eImage,
    eCell
  },
  computed: {
    ...mapGetters(['token']),
    hasLogin() {
      return !!this.token
    }
  },
  methods: {
    ...mapActions(['clearToken']),
    loginIn() {
      const { hasLogin } = this
      if (!hasLogin) this.$toUrl('/pages/login/index')
    },
    loginOut() {
      this.clearToken()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  background: #fff;
}
@media (prefers-color-scheme: dark) {
  .page {
    background: #1f1f1f;
    color: #fff;
  }
}
@media (prefers-color-scheme: light) {
  .page {
    background: #fff;
  }
}
.main {
  height: 80%;
  .logo {
    margin-bottom: 30rpx;
  }
  .text {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
