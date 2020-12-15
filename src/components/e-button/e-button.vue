<!-- @format -->

<template>
  <button @click="onClick" :hover-class="hoverClass" :open-type="openType" :style="[style]" :class="{ disabled, loading, plain }" class="e-button">
    <view v-if="loading" class="e-flex e-row-center e-col-center">
      <e-loading-icon :type="loadingType" :size="loadingIconSize" />
      <text class="loading-text">{{ loadingText }}</text>
    </view>
    <slot v-else></slot>
    <view v-if="loading && mask" @touchmove.stop.prevent :style="{ zIndex: zIndex }" class="mask no-move"></view>
  </button>
</template>

<script>
import ELoadingIcon from '../e-loading-icon/e-loading-icon.vue'
import mixin from '../e-mixin'

const styleConfig = {
  type: {
    primary: {
      plain: {
        background: 'transparent',
        border: 'solid 1px #0091FF',
        color: '#0091FF',
        hoverClass: 'plain-primary-hover'
      },
      default: {
        background: 'linear-gradient(38deg, #07BDFF 0%, #0091FF 100%)',
        border: 'none',
        color: '#fff'
      }
    },
    warning: {
      plain: {
        background: 'transparent',
        border: 'solid 1px #FB684F',
        color: '#FB684F',
        hoverClass: 'plain-warning-hover'
      },
      default: {
        background: 'linear-gradient(90deg, #FF8C4D 0%, #FB684F 100%)',
        border: 'none',
        color: '#fff'
      }
    },
    default: {
      plain: {
        background: 'transparent',
        border: 'solid 1px #ccc',
        color: '#333',
        hoverClass: 'plain-default-hover'
      },
      default: {
        background: '#fff',
        border: 'none',
        color: '#333'
      }
    }
  },
  size: {
    mini: {
      display: 'inline-flex',
      width: 'auto',
      minWidth: '168rpx',
      height: '64rpx',
      fontWeight: 400,
      fontSize: '13px',
      borderRadius: '24rpx'
    },
    middle: {
      display: 'inline-flex',
      width: 'auto',
      minWidth: '168rpx',
      height: '68rpx',
      fontWeight: 400,
      fontSize: '14px',
      borderRadius: '24rpx'
    },
    default: {
      height: '88rpx',
      fontWeight: 400,
      fontSize: '16px',
      borderRadius: '24rpx'
    }
  }
}

export default {
  name: 'eButton',
  mixins: [mixin],
  components: {
    ELoadingIcon
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
    loadingText: {
      type: String,
      default: ''
    },
    loadingSize: {
      type: [String, Number],
      default: 0
    },
    // 大小
    size: {
      type: String,
      default: 'default'
    },
    // 样式
    type: {
      type: String,
      default: 'default'
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
      default: false
    },
    // mask 层级
    zIndex: {
      type: Number,
      default: 99
    },
    // 按钮最小宽度
    width: {
      type: [Number, String],
      default: ''
    },
    // 按钮高度
    height: {
      type: [Number, String],
      default: ''
    },
    // 按钮圆角
    borderRadius: {
      type: [Number, String],
      default: ''
    },
    // 圆形按钮
    round: {
      type: Boolean,
      default: false
    },
    // 方形按钮
    square: {
      type: Boolean,
      default: false
    },
    // 圆形按钮
    bold: {
      type: Boolean,
      default: false
    },
    // 字体大小
    fontSize: [Number, String],
    // 终极样式
    buttonStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hoverClass() {
      const { loading, disabled, plain, type } = this
      if (loading || disabled) return ''
      if (plain) return styleConfig.type[type].plain.hoverClass
      return 'btn-hover'
    },
    // TODO: loading的颜色
    loadingType() {
      const { plain, type } = this
      if (plain) return type
      return 'white'
    },
    // TODO: loading的大小
    loadingIconSize() {
      const { size, loadingSize } = this
      if (loadingSize) return loadingSize
      switch (size) {
        case 'middle':
          return 36
        case 'mini':
          return 34
        default:
          return 40
      }
    },
    style() {
      const { type, plain, size, width, height, bold, borderRadius, addUnit, round, square, fontSize, buttonStyle } = this

      let style = {}
      if (plain && styleConfig.type[type]) {
        style = { ...styleConfig.type[type].plain }
      } else {
        style = { ...styleConfig.type[type].default }
      }
      style = { ...style, ...styleConfig.size[size], ...buttonStyle }
      if (fontSize) style.fontSize = addUnit(fontSize)
      if (width) style.width = addUnit(width)
      if (height) style.height = addUnit(height)
      if (bold) style.fontWeight = 'bold'
      if (round) style.borderRadius = height ? addUnit(height) : styleConfig.size[size].height
      if (square) style.borderRadius = 0
      if (borderRadius) style.borderRadius = addUnit(borderRadius)

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
@import '../e-styles/index.scss';
.e-button {
  width: 100%;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  &::after {
    width: 0;
    height: 0;
    border: none;
  }
  .loading-text {
    margin-left: 10rpx;
  }
}
.plain-primary-hover {
  background: #0091ff !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-success-hover {
  background: #07c160 !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-warning-hover {
  background: #fb684f !important;
  color: #fff !important;
  opacity: 0.3;
}
.plain-default-hover {
  background: #ccc !important;
  color: #fff !important;
  opacity: 0.3;
}
.btn-hover {
  opacity: 0.3;
}
.disabled {
  background: #ccc !important;
  border: none !important;
  color: #fff !important;
}
.loading {
  opacity: 0.8;
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
