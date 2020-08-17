import Vue from 'vue'
import App from './App'

import mixin from '@/util/mixin/index.js'
import icons from '@/component/icons/icons.vue'

Vue.mixin(mixin)
Vue.component('icons', icons)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
