<!-- @format -->

<template>
  <button @click="onClick" :hover-class="hoverClass" :open-type="openType" :style="style" :class="{ disabled: disabled, plain }" class="e-button">
    <e-loading-icon v-if="loading" :type="loadingType" />
    <slot v-else></slot>
    <view v-if="loading && mask" @touchmove.stop.prevent :style="{ zIndex: zIndex }" class="mask no-move"></view>
  </button>
</template>

<script>
import eLoadingIcon from '../e-loading-icon/e-loading-icon'

export default {
  name: 'e-button',
  components: {
    eLoadingIcon
  },
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否加载
    loading: {
      type: Boolean,
      default: false
    },
    // 大小
    size: {
      type: String,
      default: ''
    },
    // 样式
    type: {
      type: String,
      default: ''
    },
    // 按钮是否镂空，背景色透明
    plain: {
      type: Boolean,
      default: false
    },
    // 开放能力
    // feedback	打开“意见反馈”页面，用户可提交反馈内容并上传日志    (App、微信小程序、QQ小程序)
    // share	触发用户转发	(微信小程序、百度小程序、支付宝小程序、字节跳动小程序、QQ小程序)
    // getUserInfo	获取用户信息，可以从@getuserinfo回调中获取到用户信息，包括头像、昵称等信息	(微信小程序、百度小程序、QQ小程序)
    // contact	打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息	(微信小程序、百度小程序)
    // getPhoneNumber	获取用户手机号，可以从@getphonenumber回调中获取到用户信息	(微信小程序、百度小程序、字节跳动小程序、支付宝小程序)
    // launchApp	打开APP，可以通过app-parameter属性设定向APP传的参数	(微信小程序、QQ小程序)
    // openSetting	打开授权设置页	(微信小程序、百度小程序)
    // getAuthorize	支持小程序授权	(支付宝小程序)
    // contactShare	分享到通讯录好友	(支付宝小程序)
    // lifestyle	关注生活号	(支付宝小程序)
    openType: {
      type: String,
      default: ''
    },
    // 是否需要 mask
    mask: {
      type: Boolean,
      default: true
    },
    // mask 层级
    zIndex: {
      type: Number,
      default: 99
    }
  },
  computed: {
    hoverClass() {
      const { loading, plain, type } = this
      if (loading) return ''
      else if (plain) {
        if (type === 'primary') return 'plain-primary-hover'
        else if (type === 'error') return 'plain-error-hover'
        else if (type === 'success') return 'plain-success-hover'
        else return 'plain-default-hover'
      }
      return 'btn-hover'
    },
    loadingType() {
      const { plain, type } = this
      if (plain) return type
      return 'white'
    },
    style() {
      const style = {}
      const { type, plain, size } = this
      switch (type) {
        case 'primary':
          style.background = '#00B1F1'
          style.borderColor = '#00B1F1'
          break
        case 'success':
          style.background = '#07c160'
          style.borderColor = '#07c160'
          break
        case 'error':
          style.background = '#FE491A'
          style.borderColor = '#FE491A'
          break
        default:
          style.background = '#5e6479'
          style.borderColor = '#5e6479'
      }
      // 镂空
      if (plain) {
        style.background = 'transparent'
        // 更改镂空字体色
        switch (type) {
          case 'primary':
            style.color = '#00B1F1'
            break
          case 'success':
            style.color = '#07c160'
            break
          case 'error':
            style.color = '#FE491A'
            break
          default:
            style.color = '#5e6479'
        }
      }
      // 更改按钮大小
      switch (size) {
        case 'middle':
          style.width = 'auto'
          style.minWidth = '324rpx'
          style.height = '88rpx'
          style.borderRadius = '12rpx'
          style.display = 'inline-flex'
          style.fontSize = '16px'
          break
        case 'mini':
          style.width = 'auto'
          style.minWidth = '136rpx'
          style.height = '56rpx'
          style.borderRadius = '8rpx'
          style.display = 'inline-flex'
          style.fontSize = '12px'
          break
      }
      return style
    }
  },
  methods: {
    onClick(e) {
      if (this.loading || this.disabled) return false
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.e-button {
  width: 100%;
  height: 88rpx;
  border: solid 1px #5e6479;
  border-radius: 12rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-weight: 500;
  font-size: 17px;
  color: #fff;
  letter-spacing: 0.5px;
  &::after {
    width: 0;
    height: 0;
    border: none;
  }
}
.plain-primary-hover {
  background: #00b1f1 !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-success-hover {
  background: #07c160 !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-error-hover {
  background: #fe491a !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-default-hover {
  background: #5e6479 !important;
  color: #fff !important;
  opacity: 0.3;
}
.btn-hover,
.disabled {
  opacity: 0.3;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent;
}
</style>