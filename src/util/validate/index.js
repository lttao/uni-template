// 数字
export function numValid(val) { 
    return validate(/^[0-9]*$/, val)
}

// n位的数字
export function nNumValid(val) { 
    return validate(/^\d{n}$/, val)
}

// 手机号验证
export function mobileValid(val) { 
    return validate(/^1[3456789]\d{9}$/, val)
}

// 验证
function validate(reg, val) {
    if (!val) return false
    if (!reg.test(val)) return false
    return true
}