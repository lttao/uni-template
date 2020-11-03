<template>
  <view>
    <e-button @click="showLeft = true">展开左侧</e-button>
    <e-popup v-model="showLeft" position="left">
      <view style="width: 200px; height: 200px; background: red;">454654</view>
    </e-popup>

    <e-button @click="showRight = true">展开右侧</e-button>
    <e-popup v-model="showRight" position="right">
      <view style="width: 200px; height: 200px; background: red;">454654</view>
    </e-popup>

    <e-button @click="showTop = true">展开顶部</e-button>
    <e-popup v-model="showTop" position="top">
      <view style="width: 200px; height: 200px; background: red;">454654</view>
    </e-popup>

    <e-button @click="showBottom = true">展开底部</e-button>
    <e-popup v-model="showBottom" position="bottom">
      <view style="width: 200px; height: 200px; background: red;">454654</view>
    </e-popup>

    <e-button @click="showCenter = true">展开中间</e-button>
    <e-popup v-model="showCenter" position="center">
      <view style="width: 200px; height: 200px; background: red;">454654</view>
    </e-popup>
  </view>
</template>

<script>
import eButton from '@/components/e-button/e-button.vue'
import ePopup from '@/components/e-popup/e-popup.vue'
export default {
  components: {
    eButton,
    ePopup
  },
  data() {
    return {
      showLeft: false,
      showRight: false,
      showTop: false,
      showBottom: false,
      showCenter: false
    }
  }
}
</script>
