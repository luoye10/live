/**
 * @desc 获取指定元素的样式
 * @param {HTMLElement} el 需要获取样式的元素
 * @param {string} key 需要获取的属性的值，可以不传，如果不传的话，默认就返回所有样式
 * @returns {string | number | object}
 */
export default function getStyle(el, key) {
	if (!(el instanceof HTMLElement)) {
		console.error(el + '不是一个有效的html元素');
		return '';
	}
	const style = window.getComputedStyle(el, null);
	if (key) {
		return style[key];
	}
	return style;
}
