<template>
  <view class="content">
    <image class="logo" src="/static/images/logo.png"></image>
    <view>
      <text class="title sss">{{ title }}</text>
      <navigator url="/pages/example/index" redirect hover-class="className">例子</navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'LUOTAO'
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
