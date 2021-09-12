/**
 * @desc 根据传入的区间，获取随机数
 * @param {number} max 最大值
 * @param {number} min 最小值
 * @param {boolean} isInteger 是否取整
 * @returns 返回一个区间的随机数
 */
export default function getnerateRan(max, min, isInteger) {
	if (max <= min) {
		console.error('区间最大值应该大于最小值');
		return -1;
	}
	let v = Math.random() * (max - min) + 1;
	if (isInteger) {
		v = Math.floor(v);
	}
	return v;
}
