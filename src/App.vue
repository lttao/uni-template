<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
    this.getUiStyle()
    uni.onUIStyleChange((res) => {
      if (res.style === 'dark') {
        this.setDarkUiStyle()
      } else {
        this.setLightUiStyle()
      }
    })
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    getUiStyle() {
      // #ifdef APP-PLUS
      var style = plus.navigator.getUiStyle()
      if (style === 'dark') {
        this.setDarkUiStyle()
      } else {
        console.log('当前为普通模式')
      }
      // #endif
    },
    setDarkUiStyle() {
      setTimeout(() => {
        // 关于导航栏的深色模式修改
        // uni.setNavigationBarColor({
        //   frontColor: '#ffffff',
        //   backgroundColor: '#1f1f1f',
        //   animation: {
        //     duration: 400,
        //     timingFunc: 'easeIn'
        //   }
        // })
      }, 100)
      // 关于tabBar的深色模式修改
      uni.setTabBarStyle({
        color: '#B6B6B6',
        backgroundColor: '#1F1F1F',
        selectedColor: '#129aee',
        borderStyle: 'black'
      })
    },
    setLightUiStyle() {
      // 关于tabBar的深色模式修改
      uni.setTabBarStyle({
        color: '#7b7b7b',
        backgroundColor: '#f8f8f8',
        selectedColor: '#129aee',
        borderStyle: 'black'
      })
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/common/scss/default.scss';
@import '@/common/scss/common.scss';

uni-page-body,
#app {
  height: 100%;
}
</style>
