// 获取定位
export function getLocation({ success, fail }) {
    const options = {
        scopeType: 'scope.userLocation',
        scopeText: '附近地址',
        callback: getLocationApi,
        success,
        fail 
    }
  getAuth(options)
}

function getLocationApi(success, fail) {
  // 获取定位信息
  uni.getLocation({
    type: 'gcj02',
    success: (res = {}) => {
      const { longitude = '', latitude = '' } = res
      if (success) success({ longitude, latitude })
    },
    fail: (err) => {
        if (fail) fail(err)
    }
  })
}

function getAuth(options = {}) {
  // 可以通过 uni.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
  const { scopeType,  scopeText, callback, success, fail } = options
  uni.getSetting({
    success: (res) => {
        if (!scopeType) return false
      if (!res.authSetting[scopeType]) {
        // 接口调用询问
        uni.authorize({
          scope: scopeType,
          success: () => {
            if (callback) callback(success, fail)
          },
          fail: () => {
            // 用户拒绝了授权
            uni.showModal({
              title: scopeText,
              content: scopeText + '需要您授权',
              showCancel: true,
              confirmText: '确定',
              success: (res) => {
                if (res.confirm) {
                  // 打开设置页面
                  uni.openSetting({
                    success: (data) => {
                      if (data.authSetting[scopeType]) {
                        // 授权成功
                        if (callback) callback(success, fail)
                      } else {
                        uni.showToast({
                          title: '拒绝授权会导致此功能无法正常使用',
                          duration: 1500,
                          icon: 'none'
                        })
                      }
                    }
                  })
                } else if (res.cancel) {
                  uni.showToast({
                    title: '拒绝授权会导致此功能无法正常使用',
                    duration: 1500,
                    icon: 'none'
                  })
                }
              }
            })
          }
        })
      } else {
        if (callback) callback(success, fail)
      }
    },
    fail(res) {
      console.log('getSetting: fail')
      console.log(res)
    }
  })
}

function getAuth(scopeType = 'scope.userLocation', scopeText = '附近地址', callback = getLocation) {
    // 可以通过 uni.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
    uni.getSetting({
      success: (res) => {
        if (!res.authSetting[scopeType]) {
          // 接口调用询问
          uni.authorize({
            scope: scopeType,
            success: () => {
              if (callback) callback()
            },
            fail: () => {
              // 用户拒绝了授权
              uni.showModal({
                title: scopeText,
                content: scopeText + '需要您授权',
                showCancel: true,
                confirmText: '确定',
                success: (res) => {
                  if (res.confirm) {
                    // 打开设置页面
                    uni.openSetting({
                      success: (data) => {
                        if (data.authSetting[scopeType]) {
                          // 授权成功
                          if (callback) callback()
                        } else {
                          uni.showToast({
                            title: '拒绝授权会导致此功能无法正常使用',
                            duration: 1500,
                            icon: 'none'
                          })
                        }
                      }
                    })
                  } else if (res.cancel) {
                    uni.showToast({
                      title: '拒绝授权会导致此功能无法正常使用',
                      duration: 1500,
                      icon: 'none'
                    })
                  }
                }
              })
            }
          })
        } else {
          if (callback) callback()
        }
      },
      fail(res) {
        console.log('getSetting: fail')
        console.log(res)
      }
    })
  }
