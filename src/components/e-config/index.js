/**
 * 组件库配置选项
 */

// Color Palette
export const COLOR_PALETTE = {
  black: '#000',
  white: '#fff',
  'gray-1': '#f7f8fa',
  'gray-2': '#f2f3f5',
  'gray-3': '#ebedf0',
  'gray-4': '#dcdee0',
  'gray-5': '#c8c9cc',
  'gray-6': '#969799',
  'gray-7': '#646566',
  'gray-8': '#323233',
  red: '#ee0a24',
  blue: '#1989fa',
  orange: '#ff976a',
  green: '#07c160'
}

export const BUTTON = {
  type: {
    warning: COLOR_PALETTE.red,
    info: COLOR_PALETTE.blue,
    primary: COLOR_PALETTE.green,
    danger: COLOR_PALETTE.orange
  },
  text: {
    color: COLOR_PALETTE['gray-8'],
    fontSize: '16px'
  },
  border: {
    color: COLOR_PALETTE['gray-3']
  },
  height: {
    default: '88rpx'
  }
}

// export const IMAGE = {
//   placeHolder: imagePlaceholder
// }

export const LOAD_MORE = {
  statusTypeMap: {
    more: '上拉显示更多',
    loading: '正在加载...',
    noMore: '没有更多数据了'
  }
}

export const TRANSITION = {
  animationMap: {
    fade: {
      enter: { opacity: 0 },
      'enter-to': { opacity: 1 },
      leave: { opacity: 1 },
      'leave-to': { opacity: 0 }
    },
    'fade-up': {
      enter: { opacity: 0, transform: `translateY(100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateY(100%)` }
    },
    'fade-down': {
      enter: { opacity: 0, transform: `translateY(-100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateY(-100%)` }
    },
    'fade-left': {
      enter: { opacity: 0, transform: `translateX(-100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateX(-100%)` }
    },
    'fade-right': {
      enter: { opacity: 0, transform: `translateX(100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateX(100%)` }
    },
    'slide-up': {
      enter: { transform: `translateY(100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateY(100%)` }
    },
    'slide-down': {
      enter: { transform: `translateY(-100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateY(-100%)` }
    },
    'slide-left': {
      enter: { transform: `translateX(-100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateX(-100%)` }
    },
    'slide-right': {
      enter: { transform: `translateX(100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateX(100%)` }
    },
    'zoom-in': {
      enter: { opacity: 0, transform: `scale(0.8)` },
      'enter-to': { opacity: 1, transform: `scale(1)` },
      leave: { opacity: 1, transform: `scale(1)` },
      'leave-to': { opacity: 0, transform: `scale(0.8)` }
    },
    'zoom-out': {
      enter: { opacity: 0, transform: `scale(1.2)` },
      'enter-to': { opacity: 1, transform: `scale(1)` },
      leave: { opacity: 1, transform: `scale(1)` },
      'leave-to': { opacity: 0, transform: `scale(1.2)` }
    }
  }
}
