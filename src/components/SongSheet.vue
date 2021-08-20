<template>
	<div class="songs">
		<ul class="song-list">
			<li
				:class="['song', { active: item.id === id }]"
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
</template>
<script>
import api from '../api/index';
import format from '../tool';
export default {
	props: ['id'],
	data() {
		return {
			items: [],
		};
	},
	mounted() {
		this.getSong();
	},
	methods: {
		getSong() {
			api.getSong(this.id)
				.then(response => {
					// this.total = response.data.playlist.trackCount;
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
				item.url = url;
				let obj = item;
				this.$emit('songdata', obj);
			});
		},
	},
	watch: {
		id(newVal, oldVal) {
			// oldVal 就是id原来的值，newVal就是id改变之后的新值
			console.log(oldVal);
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
	bottom: 0;
	left: 30%;
	right: 0;
	background: rgba(170, 170, 170, 0.1);
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
	.active {
		background: rgba(39, 96, 143, 0.582);
	}
}
</style>
