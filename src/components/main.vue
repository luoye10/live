<template>
	<div class="main">
		<div class="layout">
			<!-- 头部 -->
			<div class="head">
				<div class="logo">
					<img src="https://s1.music.126.net/style/favicon.ico?v20180823" class="mark" />
					<span class="text">网易云音乐</span>
				</div>
				<div class="search">
					<input type="text" class="words" v-model="word" />
					<div class="btn" @click="query">搜索</div>
				</div>
			</div>
			<div class="inner">
				<!-- 左侧菜单 -->
				<div class="menu">
					<ul class="song-sheet">
						<li class="list" v-for="list in itemList" :key="list.id" @click="press(list)">{{ list.name }}</li>
					</ul>
				</div>
				<!-- 右侧展示 -->
				<Search v-if="isShow" :word="word"></Search>
				<SongSheet v-if="isOpen" :id="songListId"></SongSheet>
			</div>

			<!-- 底部 -->
		</div>
	</div>
</template>
<script>
import api from '../api/index';
import Search from './Search'
import SongSheet from './SongSheet'
export default {
	components: {
		Search,
		SongSheet
	},
	data() {
		return {
			word: '',
			itemList: [],
			songListId: '',
			total: [],
			isShow: false,
			isOpen: false
		};
	},
	mounted() {
		this.songListRequest();
	},
	methods: {
		songListRequest() {
			var obj = JSON.parse(localStorage.getItem('userInfo'));
			var id = obj.account.id;
			api.getSongList(id)
				.then(response => {
					console.log(response)
					this.itemList = response.data.playlist;
				})
				.catch(error => {
					console.log(error);
					this.$message.error('请求歌单列表错误');
				});
		},
		press(list){
			this.songListId = list.id
			this.isOpen = !this.isOpen
			this.isShow = false
		},
		query() {
			this.isShow = !this.isShow
			this.isOpen = false
		}
	},
};
</script>
<style lang="less">
div,img,span,ul,li{
	margin: 0;
	padding: 0;
}
body {
	width: 100%;
	height: 100%;
	background: url(https://img-qn-2.51miz.com/Element/00/73/41/22/3d6d6458_E734122_dcb07fcd.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/260);
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;
}
</style>
<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	.layout {
		width: 100%;
		height: 100%;
	}
}
.head {
	height: 100px;
	background: rgba(11, 209, 209, 0.774);
	position: relative;
	.logo {
		display: inline-block;
		vertical-align: middle;
		.mark {
			margin: 30px;
			vertical-align: middle;
		}
		.text {
			display: inline-block;
			height: 30px;
			font-size: 20px;
			font-family: my;
			color: aqua;
			vertical-align: middle;
			letter-spacing: 0.2em;
		}
	}
	.search {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-family: my;
		.words {
			width: 200px;
			height: 30px;
			border: 1px solid aqua;
			border-radius: 3px;
			outline: none;
			color: rgb(206, 27, 206);
			background: pink;
		}
		.btn {
			display: inline-block;
			width: 100px;
			height: 30px;
			border: 1px solid aqua;
			border-radius: 3px;
			text-align: center;
			line-height: 30px;
			vertical-align: middle;
			margin-left: 20px;
			color: rgb(206, 27, 206);
			cursor: pointer;
		}
	}
}
.inner {
	height: 100%;
	.menu {
		width: 400px;
		height: 100%;
		background: rgba(18, 218, 124, 0.767);
		.list {
			height: 50px;
			border: 1px dashed aqua;
			color: white;
			text-align: center;
			line-height: 50px;
			cursor: pointer;
		}
	}
}
</style>
