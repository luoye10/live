<template>
	<div class="songs" v-loading="loading">
		<div class="list-box">
			<ul class="song-list">
				<li
					:class="['song', { active: item.id === songId }]"
					v-for="(item, index) in items"
					:key="item.message"
					@click="playSong(item, index)"
				>
					<span class="num item">{{ index >= 9 ? index + 1 : '0' + (index + 1) }}</span>
					<span class="name item">{{ item.name }}</span>
					<span class="singer item">{{ item.singer }}</span>
					<span class="album item">{{ item.album }}</span>
					<span class="time item">{{ item.duration }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import api from '../api/index';
import format from '../util/format';
import ran from '../util/getRandom';
export default {
	props: ['id', 'index'],
	data() {
		return {
			items: [],
			loading: false,
			songId: '',
		};
	},
	mounted() {},
	methods: {
		getSong() {
			this.loading = true;
			api.getSong(this.id)
				.then(res => {
					const trackIds = res.data.playlist.trackIds
						.map(track => {
							return track.id;
						})
						.join(',');
					api.getSongs(trackIds).then(res => {
						const songs = res.data.songs;
						const items = songs.map(item => {
							item.duration = format(item.dt);
							item.singer = item.ar.map(ar => ar.name).join('/');
							item.album = item.al.name;
							return item;
						});
						this.items = items;
						window.playList = items;
						this.loading = false;
					});
				})
				.catch(function (error) {
					console.log(error);
					this.loading = false;
				});
		},
		playSong(item, index) {
			const img = item.al.picUrl;
			this.songId = item.id;
			item.img = img;
			api.getMessage(item.id).then(res => {
				const url = res.data.data[0].url;
				if (!url) {
					this.$message.error('没有播放资源');
					return;
				}
				item.url = url;
				item.index = index;
				this.$emit('songList', item);
			});
		},
	},
	watch: {
		id(newVal) {
			// oldVal 就是id原来的值，newVal就是id改变之后的新值
			this.getSong(newVal);
		},
		index(newVal) {
			const type = this.playModel;
			if (type === 'random') {
				// 随机模式，在这里处理逻辑
				newVal = ran(this.items.length - 1, 0, true);
			} else {
				// 下标可能小于0，或者大于数组长度
				if (newVal < 0) {
					newVal = this.items.length - 1 + newVal;
				}
				if (newVal > this.items.length - 1) {
					newVal = newVal - this.items.length;
				}
			}
			const item = this.items[newVal];
			this.playSong(item, newVal);
		},
	},
};
</script>
<style lang="less" scoped>
@h: 50px;
@c: #000;
.songs {
	height: 100%;
	position: relative;
	background: rgba(170, 170, 170, 0.1);
	.list-box {
		height: 100%;
		overflow-y: auto;
	}
	.song {
		height: @h;
		color: @c;
		font-size: 20px;
		list-style: none;
		cursor: pointer;
		// 偶数选择器
		&:nth-child(even) {
			background: rgba(170, 170, 170, 0.2);
		}
		.item {
			display: inline-block;
			height: @h;
			line-height: @h;
			vertical-align: middle;
			padding-left: 10px;
		}
		.num {
			width: 5%;
		}
		.name {
			width: 30%;
		}
		.singer {
			width: 20%;
		}
		.album {
			width: 35%;
		}
		.time {
			width: 10%;
		}
	}
	.song.active {
		background: rgba(39, 96, 143, 0.582);
	}
}
</style>
