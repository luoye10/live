function format(para) {
	var one_minute = 60 * 1000;
	var m = Math.floor(para / one_minute);
	var s = Math.floor((para % one_minute) / 1000);
	m = m.padStart(2, '0');
	s = s.padStart(2, '0');
	return m + ':' + s;
}
export default format;
