<template>
	<div class="songs" v-loading="loading">
		<div class="list-box">
			<ul class="song-list">
				<li
					:class="['song', { active: item.id === songId }]"
					v-for="item in items"
					:key="item.message"
					@click="playSong(item)"
				>
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
export default {
	props: ['id'],
	data() {
		return {
			items: [],
			loading: false,
			songId: '',
		};
	},
	mounted() {
		// 这里不需要了，只有在点击查询列表详情时，才会需要调用getSong()方法
		// this.getSong();
	},
	methods: {
		getSong() {
			this.loading = true;
			api.getSong(this.id)
				.then(response => {
					const trackIds = response.data.playlist.trackIds
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
						this.loading = false;
					});
				})
				.catch(function (error) {
					console.log(error);
					this.loading = false;
				});
		},
		playSong(item) {
			this.songId = item.id;
			api.getMessage(item.id).then(response => {
				const url = response.data.data[0].url;
				if (!url) {
					this.$message.error('没有播放资源');
					return;
				}
				item.url = url;
				let obj = item;
				this.$emit('songList', obj);
			});
		},
	},
	watch: {
		id(newVal) {
			// oldVal 就是id原来的值，newVal就是id改变之后的新值
			this.getSong(newVal);
		},
	},
};
</script>
<style lang="less" scoped>
@h: 50px;
@c: #000;
.songs {
	position: absolute;
	top: 100px;
	bottom: 60px;
	left: 20%;
	right: 0;
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
		.name {
			width: 30%;
		}
		.singer {
			width: 20%;
		}
		.album {
			width: 40%;
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
