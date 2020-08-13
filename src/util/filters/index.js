export const monmeyFormat = (val = 0) => {
	if (val) return Number(val).toFixed(2)
	return '0.00'
}