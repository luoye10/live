<template>
	<div class="main">
		<!-- <el-skeleton v-if="isLoading" :rows="6" animated /> -->
		<div class="layout">
			<!-- 头部 -->
			<div class="head">
				<div class="logo">
					<img src="https://s1.music.126.net/style/favicon.ico?v20180823" class="mark" />
					<span class="text">网易云音乐</span>
				</div>
				<div class="search">
					<input type="text" class="words" v-model="word" />
					<div class="btn" @click="query">查询</div>
				</div>
			</div>
			<div class="inner">
				<!-- 左侧菜单 -->
				<div class="menu">
					<ul class="song-sheet">
						<li class="list" v-for="item in itemList" :key="item.id" @click="press">
							{{ item.name }}
						</li>
					</ul>
				</div>
				<!-- 右侧展示 -->
				<div class="reveal">
					<ul class="song-list">
						<li class="song" v-for="item in items" :key="item.message" @click="button">
							<img :src="item.album.artist.img1v1Url" class="img" />
							<div class="content">
								<span class="name">{{ item.name }}</span>
								<span class="singer">{{ item.artists[0].name }}</span>
								<span class="album">{{ item.album.name }}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- 底部 -->
		</div>
	</div>
</template>
<script>
import api from '../api/index';
export default {
	data() {
		return {
			isLoading: true,
			word: '',
			items: [],
			itemList: [],
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
					this.$message.error('请求歌单列表错误');
				});
		},
		query() {
			if (!this.word) {
				this.$message.warning('请输入要查询的关键词');
				return;
			}
			api.query(this.word)
				.then(function (response) {
					console.log(response);
					this.items = response.data.result.songs;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		press() {},
		button() {},
		format(para) {
			var m = Math.floor(para / 60000),
				s = String(para - (m % 60000)).slice(0, 2);
			para = '0' + m + ':' + s;
			return para;
		},
	},
};
</script>
<style lang="less">
body {
	width: 100%;
	height: 100%;
	background: url(https://img-qn-2.51miz.com/Element/00/73/41/22/3d6d6458_E734122_dcb07fcd.jpg!/quality/90/unsharp/true/compress/true/format/jpg/fh/260);
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	.main {
		width: 100%;
		height: 100%;
		.layout {
			width: 100%;
			height: 100%;
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
					.song-sheet {
						.list {
							height: 50px;
							border: 1px dashed aqua;
							color: white;
							text-align: center;
							line-height: 50px;
						}
					}
				}
				.reveal {
					.song-list {
						.song {
							list-style: none;
							height: 100px;
							border: 1px solid aqua;
							border-radius: 5px;
							background: rgba(129, 89, 89, 0.493);
							vertical-align: middle;
							cursor: pointer;
							margin: 20px;
							.img {
								width: 50px;
								height: 50px;
								border-radius: 50%;
								vertical-align: middle;
							}
							.content {
								display: inline-block;
								vertical-align: middle;
								.name,
								.singer,
								.album,
								.time {
									display: inline-block;
									vertical-align: middle;
									color: aqua;
									margin: 0 20px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
