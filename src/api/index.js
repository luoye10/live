import axios from './config';

export default {
	login: params => {
		return axios.get('/login/cellphone', params);
	},
	query: word => {
		return axios.get('/search?keywords=' + word);
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
};
