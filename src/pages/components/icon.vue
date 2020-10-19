<template>
  <view class="list flex flex-wrap">
    <block v-for="(item, index) in list" :key="index">
      <view class="item flex flex-col row-around col-center">
        <e-icon :name="item" :size="60" />
        <view class="text line-1">{{ item }}</view>
      </view>
    </block>
  </view>
</template>

<script>
import eIcon from '@/components/e-icon/e-icon.vue'
export default {
  components: {
    eIcon
  },
  data() {
    return {
      list: [
        'kejian',
        'bukejian',
        'xinxi',
        'xinxi1',
        'dengdai',
        'dingdan',
        'dingdan1',
        'gouwuche',
        'gouwuche1',
        'sousuo',
        'bianji',
        'fenxiang',
        'fenxiang1',
        'shezhi',
        'xiazai',
        'bofang',
        'postion',
        'tongzhi',
        'tongzhi1',
        'dianhu',
        'dianhua1',
        'shezhi2',
        'youjian',
        'kefu',
        'shuaxin',
        'guanbi',
        'chenggong',
        'guanbi1',
        'chengong1',
        'gantan',
        'gantan1',
        'wenhao',
        'wenhao1',
        'shoucang',
        'shoucang1',
        'xin',
        'xin1',
        'up',
        'left',
        'down',
        'right',
        'left1',
        'right1',
        'up1',
        'down1',
        'https://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLAQ8HgjFKLlXHQSaHxOYZ7JTGILNjQFEagvm7ys2pVQDEtvSNffRhHw97xRqkOibomqex8haysrWbmNCB2sfm7Ld02hRzvMSLM4/132'
      ]
    }
  }
}
</script>

<style lang="scss">
.list {
  .item {
    padding: 20rpx 0;
    width: calc(100% / 4);
    height: 150rpx;
    border-right: solid 1px #dbdbdb;
    border-bottom: solid 1px #dbdbdb;
    &:nth-of-type(4n) {
      border-right: none;
    }
    .text {
      width: 100%;
      text-align: center;
      padding: 0 10rpx;
      font-size: 12px;
      color: #808080;
    }
  }
}
</style>
