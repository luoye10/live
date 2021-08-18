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
};
