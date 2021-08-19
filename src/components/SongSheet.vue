<template>
	<div class="songs">
		<ul class="song-list">
			<li class="song" v-for="item in items" :key="item.message" @click="playSong(item)">
				<span class="name item">{{ item.name }}</span>
				<span class="singer item">{{ item.singer }}</span>
				<span class="album item">{{ item.album }}</span>
				<span class="time item">{{ item.duration }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
import api from '../api/index';
import format from '../tool';
export default {
	props: ['id'],
	data() {
		return {
			items: [],
			total: null,
			idList: [],
			songId: null,
		};
	},
	mounted() {
		this.getSong();
	},
	methods: {
		getSong() {
			api.getSong(this.id)
				.then(response => {
					this.total = response.data.playlist.trackCount;
					// 你知道这一步是在做什么吗？循环，你把每一个id都赋值给songId，后面的会覆盖前面的，最终就是把最后一个id赋值给this.songId,这有什么意义吗？
					// this.idList.forEach(item => {
					// 	this.songId = item.id;
					// });
					const list = response.data.playlist.tracks;
					const items = list.map(item => {
						item.duration = format(item.dt);
						item.singer = item.ar.map(ar => ar.name).join('/');
						item.album = item.al.name;
						return item;
					});
					this.items = items;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		// 这里是获取歌曲详情，要先把歌单里每一首歌的名字查询出来之后进行点击才能明确查询哪一首歌
		// 你直接在mounted里面进行调用，组件一开始渲染这里就会马上调用，此时的this.songId根本不存在，肯定不对
		playSong(item) {
			api.getMessage(item.id).then(response => {
				const url = response.data.data[0].url;
				if (!url) {
					this.$message.error('没有播放资源');
					return;
				}
				const audio = document.querySelector('.audio-play');
				audio.src = url;
				audio.play();
			});
		},
	},
};
</script>
<style lang="less" scoped>
@h: 35px;
.songs {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 400px;
	right: 0;
	background: rgba(170, 170, 170, 0.5);
	.song {
		height: @h;
		list-style: none;
		cursor: pointer;
		// 偶数选择器
		&:nth-child(even) {
			background: rgba(170, 170, 170, 0.6);
		}
		.item {
			display: inline-block;
			height: @h;
			line-height: @h;
			vertical-align: middle;
			padding-left: 10px;
		}
		.name {
			width: 40%;
		}
		.singer,
		.album {
			width: 25%;
		}
		.time {
			width: 10%;
		}
	}
}
</style>
