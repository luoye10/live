function format(para) {
	var one_minute = 60 * 1000;
	var m = Math.floor(para / one_minute);
	var s = Math.floor((para % one_minute) / 1000);
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	return m + ':' + s;
}
export default format;
