import Vue from 'vue'
import App from './App'

import mixin from '@/util/mixin/index.js'
import eIcon from '@/components/e-icon/e-icon.vue'

Vue.mixin(mixin)
Vue.component('icons', eIcon)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
