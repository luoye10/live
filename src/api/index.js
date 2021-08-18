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
		return axios.get('/playlist/detail?id=' + songListId)
	},
	getMessage: songId => {
		return axios.get('/song/url?id=' + songId)
	}
};
