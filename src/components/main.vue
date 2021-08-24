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
						<li
							:class="['list', { active: list.id === songListId }]"
							v-for="list in itemList"
							:key="list.id"
							@click="songDetail(list)"
						>
							{{ list.name }}
						</li>
					</ul>
				</div>
				<!-- 搜索结果 -->
				<Search v-if="isShow" :word="word" @songSearch="getSearch"></Search>
				<!-- 歌单列表详情 -->
				<SongSheet :id="songListId" v-if="!isShow" @songList="getList"></SongSheet>
			</div>
			<div class="container" v-if="isOpen">
				<SongLyric :id="songId"></SongLyric>
				<SongComment :id="songId"></SongComment>
			</div>

			<!-- 底部 -->
			<Player :songList="listMsg" :songSearch="searchMsg" @songInfo="getInfo"></Player>
			<div class="footer">
				<audio src="" class="audio-play"></audio>
			</div>
		</div>
	</div>
</template>
<script>
import api from '../api/index';
import Search from './Search';
import SongSheet from './SongSheet';
import Player from './Player';
import SongLyric from './SongLyric';
import SongComment from './SongComment';
export default {
	components: {
		Search,
		SongSheet,
		Player,
		SongLyric,
		SongComment,
	},
	data() {
		return {
			word: '',
			itemList: [],
			songListId: '',
			total: [],
			isShow: false,
			listMsg: '',
			searchMsg: '',
			songId: '',
			isOpen: false,
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
					this.itemList = response.data.playlist;
				})
				.catch(error => {
					console.log(error);
					this.$message.error('请求歌单详情错误');
				});
		},
		songDetail(list) {
			this.songListId = list.id; // 这里修改了songListId的值，同过id属性传递给songsheet的值也会发生变化，就会触发里面的watch
			this.isShow = false;
		},
		query() {
			this.isShow = true;
		},
		getList(listText) {
			this.listMsg = listText;
		},
		getSearch(searchText) {
			this.searchMsg = searchText;
		},
		getInfo(songId) {
			this.songId = songId;
			this.isOpen = true;
		},
	},
};
</script>
<style lang="less">
.main {
	width: 100%;
	height: 100%;
	font-family: my;
	color: #000;
	.layout {
		width: 100%;
		height: 100%;
	}
}
.head {
	height: 100px;
	vertical-align: middle;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 1;
	background: rgba(170, 170, 170);
	.logo {
		display: inline-block;
		vertical-align: middle;
		line-height: 100px;
		.mark {
			margin: 0 30px;
			vertical-align: middle;
		}
		.text {
			display: inline-block;
			height: 30px;
			font-size: 24px;
			vertical-align: middle;
			line-height: 30px;
			letter-spacing: 0.2em;
		}
	}
	.search {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.words {
			display: inline-block;
			width: 200px;
			height: 30px;
			border-radius: 5px;
			outline: none;
			vertical-align: middle;
		}
		.btn {
			display: inline-block;
			width: 100px;
			height: 30px;
			border-radius: 3px;
			text-align: center;
			line-height: 30px;
			vertical-align: middle;
			margin-left: 20px;
			cursor: pointer;
		}
	}
}
.inner {
	height: 100%;
	position: relative;
	.menu {
		width: 20%;
		position: absolute;
		left: 0;
		top: 100px;
		bottom: 60px;
		.song-sheet {
			height: 100%;
			overflow-y: auto;
		}
		.list {
			height: 50px;
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			cursor: pointer;
			padding: 0 10px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.active {
			background: rgba(170, 170, 170, 0.5);
		}
	}
}
.container {
	position: absolute;
	left: 0;
	top: 100px;
	right: 0;
	bottom: 60px;
	z-index: 10;
	overflow-y: auto;
	background: white;
}
</style>
