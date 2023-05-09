import axios from './config';

export default {
	createKey: () => {
		return axios.get('/login/qr/key');
	},
	createMsg: params => {
		return axios.get('/login/qr/create?key=' + params + '&qrimg=true');
	},
	check: params => {
		return axios.get('/login/qr/check?key=' + params);
	},
	query: word => {
		return axios.get('/search?keywords=' + word);
	},
	status: () => {
		return axios.get('/login/status');
	},
	userInfo: id => {
		return axios.get('/user/detail/?uid=' + id);
	},
	getSongList: id => {
		return axios.get('/user/playlist?uid=' + id);
	},
	getSong: songListId => {
		return axios.get('/playlist/detail?id=' + songListId);
	},
	// 通过 playlist/detail 接口返回的歌单列表tracks默认只有10条，但返回的trackIds是完整的，可以通过ids来获取所有歌单详情
	getSongs: ids => {
		return axios.get('/song/detail?ids=' + ids);
	},
	getMessage: songId => {
		return axios.get('/song/url?id=' + songId);
	},
	getLyric: id => {
		return axios.get('/lyric?id=' + id);
	},
	getComment: params => {
		const data = Object.keys(params)
			.map(key => {
				return key + '=' + params[key];
			})
			.join('&');
		return axios.get('/comment/music?' + data);
	},
	getPlayRecord: params => {
		const data = Object.keys(params)
			.map(key => {
				return key + '=' + params[key];
			})
			.join('&');
		return axios.get('/user/record?' + data);
	},
};
