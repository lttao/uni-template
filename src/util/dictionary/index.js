export const arr2map = function(arr, k = 'value', v = 'name') {
  const m = {}
  arr.forEach((item) => {
    m[item[k]] = item[v]
  })
  return m
}

export const goodsType = [
  { value: '01', name: '甜品类' },
  { value: '02', name: '餐饮类' }
]
goodsType.map = arr2map(goodsType)
