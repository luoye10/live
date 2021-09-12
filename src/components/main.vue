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
				<div class="user-info">
					<div class="avatar">
						<el-avatar v-if="user" :size="'medium'" :src="user.profile.avatarUrl"></el-avatar>
					</div>
					<el-dropdown @command="signOut">
						<span class="el-dropdown-link">
							{{ user && user.profile.nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="signOut">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
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
				<div class="song-list">
					<!-- 搜索结果 -->
					<Search v-if="isShow" :word="word" @songSearch="getSearch"></Search>
					<!-- 歌单列表详情 -->
					<SongSheet :id="songListId" v-if="!isShow" @songList="getList" :index="index"></SongSheet>
				</div>
			</div>
			<div class="container" v-if="isOpen">
				<div class="head-set">
					<div class="hidden" @click="isOpen = false"><i class="el-icon-arrow-down"></i></div>
				</div>
				<SongLyric :id="songId" :img="songImg"></SongLyric>
				<SongComment :id="songId"></SongComment>
			</div>

			<!-- 底部 -->
			<Player :songList="listMsg" :songSearch="searchMsg" @songInfo="getInfo" @playChange="playChange"></Player>
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
			songImg: '',
			isOpen: false,
			index: 0, // 当前播放的音乐的下标
			user: null,
		};
	},
	mounted() {
		this.songListRequest();
		this.user = JSON.parse(localStorage.getItem('userInfo'));
	},
	methods: {
		songListRequest() {
			var obj = JSON.parse(localStorage.getItem('userInfo'));
			var id = obj.account.id;
			api.getSongList(id)
				.then(res => {
					console.log(res);
					this.itemList = res.data.playlist;
					for (var i = 0; i < this.itemList.length; i++) {
						this.itemList[0].name = '我喜欢的音乐';
					}
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
			this.index = listText.index; // 保存下标，切换上一首，下一首需要用到
		},
		getSearch(searchText) {
			this.searchMsg = searchText;
		},
		getInfo(param) {
			this.songId = param.songId;
			this.songImg = param.img;
			this.isOpen = true;
		},
		playChange(type) {
			if (type === 'prev') {
				// 上一首
				this.index--;
			} else {
				// 下一首
				this.index++;
			}
		},
		signOut(cmd) {
			this.$message.success('退出登录');
			cmd === 'signOut' && this.$router.push({ name: 'login' });
		},
	},
};
</script>
<style lang="less" scoped>
@h: 80px;
@bottom: 60px;
.main {
	width: 100%;
	height: 100%;
	font-family: my;
	color: #000;
	.layout {
		width: 100%;
		height: 100%;
		position: relative;
	}
}
.head {
	height: @h;
	vertical-align: middle;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 1;
	background-color: rgba(255, 255, 255, 0.4);
	box-shadow: 0 0 15px rgba(102, 204, 255, 0.3);
	.logo {
		display: inline-block;
		vertical-align: middle;
		line-height: @h;
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
			outline: none;
			vertical-align: middle;
			padding: 0 10px;
			border-radius: 5px;
			border: 1px solid #6cf;
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
	.user-info {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 80px;
		cursor: pointer;
		line-height: 80px;
		height: 80px;
		display: flex;
		.avatar {
			display: flex;
			align-items: center;
			margin-right: 20px;
		}
		.el-dropdown {
			font-size: 20px;
		}
	}
}
.inner {
	position: absolute;
	top: @h;
	left: 0;
	right: 0;
	bottom: 0;
	.menu {
		width: 20%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: @bottom;
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
	.song-list {
		width: 80%;
		position: absolute;
		left: 20%;
		top: 0;
		bottom: @bottom;
	}
}
.container {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 60px;
	z-index: 10;
	overflow-y: auto;
	background: white;
	padding-top: 40px;
	.head-set {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 40px;
		background: #fff;
		box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
		z-index: 10;
	}
	.hidden {
		display: inline-block;
		cursor: pointer;
		font-size: 22px;
		margin-left: 20px;
		top: 15px;
	}
}
</style>
