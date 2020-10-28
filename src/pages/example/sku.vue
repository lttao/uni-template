<template>
  <view>
    <view v-if="Object.keys(checkedObj)">
      <image :src="checkedObj.picUrl" mode="" class="logo" />
      <view>库存：{{ checkedObj.remainStock }}</view>
      <view class="font">价格：{{ checkedObj.price }}</view>
      <view class="font">SkuID：{{ checkedObj.skuId }}</view>
      <view>0123456789</view>
      <view class="font">0123456789</view>
      <view class="number-font">0123456789</view>

      <view>checked：{{ checked }}</view>
      <view>noCheckItem：{{ noCheckItem }}</view>
    </view>
    <block v-for="(item, index) in skuNameList" :key="index">
      <view class="sku">
        <view class="sku-title">{{ item.skuName }}</view>
        <view class="sku-list">
          <block v-for="(e, i) in item.skuValues" :key="i">
            <view @click="onCheck(e, index, isDisabled(e))" :class="{ 'sku-item-disabled': isDisabled(e), 'sku-item-check': checked[index] === e }" class="sku-item">{{ e }}</view>
          </block>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  data() {
    return {
      skuList: [
        {
          skuId: '0',
          skuGroup: ['红色', '大'],
          remainStock: 7,
          price: 2,
          picUrl: 'https://dummyimage.com/100x100/ff00b4/ffffff&text=大'
        },
        {
          skuId: '1',
          skuGroup: ['红色', '小'],
          remainStock: 0,
          price: 4,
          picUrl: 'https://dummyimage.com/100x100/ff00b4/ffffff&text=小'
        },
        {
          skuId: '2',
          skuGroup: ['蓝色', '大'],
          remainStock: 5,
          price: 0.01,
          picUrl: 'https://dummyimage.com/100x100/0084ff/ffffff&text=大'
        },
        {
          skuId: '3',
          skuGroup: ['蓝色', '小'],
          remainStock: 1,
          price: 1,
          picUrl: 'https://dummyimage.com/100x100/0084ff/ffffff&text=小'
        }
      ],
      skuNameList: [
        {
          skuName: '颜色',
          skuValues: ['红色', '蓝色']
        },
        {
          skuName: '尺寸',
          skuValues: ['大', '小']
        }
      ],
      noCheckList: [], // 没有库存的数组
      noCheckItem: [], // 不可点击
      checked: [], // 选中的每项的集合
      checkedObj: {} // 选中可用的sku
    }
  },
  onLoad() {
    const { skuList } = this
    const noCheckList = skuList.filter((item) => item.remainStock <= 0) || [] // 没有库存的数组
    this.noCheckList = noCheckList.map((item) => item.skuGroup)

    this.initChecked()

    this.$showLoading()
    setTimeout(() => {
      this.src = 'https://www.uviewui.com/common/logo.png'
      this.$hideLoading()

      // this.$previewImage(['https://www.uviewui.com/common/logo.png'], 4)
    }, 1500)
  },
  methods: {
    initChecked() {
      const { skuNameList } = this
      const checked = []
      skuNameList.forEach((item) => {
        checked.push('')
      })
      this.checked = checked
      console.log(this.checked)
    },
    onCheck(item, index, isCheck) {
      if (isCheck) return false
      const oldCheck = this.checked[index]
      if (item === oldCheck) {
        this.$set(this.checked, index, '')
      } else {
        if (this.checked[index]) this.initChecked() // 如果点击同一种类 清空
        this.$set(this.checked, index, item)
      }
      this.findDisbled(this.checked[index])
      this.contrast()
    },
    findDisbled(name) {
      const { noCheckList, checked } = this
      let noCheckItem = []
      noCheckList.forEach((item) => {
        if (item.findIndex((e) => e === name) >= 0) {
          noCheckItem = noCheckItem.concat(item)
        }
      })
      noCheckItem = [...new Set(noCheckItem)] // 去重

      checked.forEach((item) => {
        const nameIndex = noCheckItem.findIndex((e) => e === item)
        if (nameIndex >= 0) {
          noCheckItem.splice(nameIndex, 1) // 删除本身
        }
      })

      this.noCheckItem = noCheckItem
      console.log('不可点击', noCheckItem)
    },
    contrast() {
      const { skuList, checked } = this
      console.log(checked)
      const checkedObj = skuList.find((item) => {
        return item.skuGroup.toString() === checked.toString()
      })
      console.log('选中结果', checkedObj)
      this.checkedObj = checkedObj || { remainStock: 20, price: '1-25', picUrl: 'https://dummyimage.com/100x100/f2f2f2/000000&text=无' }
    },
    isDisabled(name) {
      const result = this.noCheckItem.findIndex((item) => item === name) >= 0
      console.log('isDisabled: ', name, result ? '不能点击' : '可以点击')
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100rpx;
  height: 100rpx;
  background: #f2f2f2;
}
.sku {
  border-bottom: solid 1rpx #f2f2f2;
  padding: 0 40rpx;
  &-title {
    line-height: 100rpx;
  }
  &-list {
    display: flex;
  }
  &-item {
    margin: 0 20rpx 20rpx 0;
    width: 150rpx;
    height: 60rpx;
    border: solid 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    &-disabled {
      background: #ccc;
      border: solid 1px #ccc;
      color: #fff;
    }
    &-check {
      border: solid 1px red;
      color: red;
    }
  }
}
</style>
