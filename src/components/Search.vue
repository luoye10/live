<template>
	<div class="reveal">
		<ul class="song-list">
			<li class="song" v-for="item in items" :key="item.message" @click="button(item)">
				<img :src="item.img" class="img" />
				<span class="name item">{{ item.name }}</span>
				<span class="singer item">{{ item.singer }}</span>
				<span class="album item">{{ item.album }}</span>
				<span class="time item">{{ item.dt }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
import api from '../api/index';
import format from '../tool';
export default {
	props: ['word'],
	data() {
		return {
			items: [],
		};
	},
	mounted() {
		this.searchRequest();
	},
	methods: {
		searchRequest() {
			if (!this.word) {
				this.$message.warning('请输入要搜索的关键词');
				return;
			}
			api.query(this.word)
				.then(response => {
					const list = response.data.result.songs;
					const items = list.map(item => {
						item.img = item.artists[0].img1v1Url;
						item.dt = format(item.duration);
						item.singer = item.artists[0].name;
						item.album = item.album.name;
						return item;
					});
					this.items = items;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		button(item) {
			api.getMessage(item.id).then(response => {
				const url = response.data.data[0].url;
				if (!url) {
					this.$message.error('没有播放资源');
					return;
				}
				item.url = url;
				let obj = item;
				this.$emit('songnews', obj);
			});
		},
	},
};
</script>
<style lang="less" scoped>
.reveal {
	position: absolute;
	left: 30%;
	top: 100px;
	right: 0;
	margin: 10px;
	margin-bottom: 100px;
	.song {
		list-style: none;
		height: 100px;
		border-radius: 5px;
		vertical-align: middle;
		line-height: 100px;
		cursor: pointer;
		&:nth-child(odd) {
			background: rgba(129, 113, 113, 0.281);
		}
		.img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			vertical-align: middle;
			line-height: 100px;
			margin: 0 20px;
		}
		.item {
			display: inline-block;
			vertical-align: middle;
			font-size: 20px;
		}
		.name {
			width: 25%;
			margin-left: 50px;
		}
		.singer {
			width: 15%;
		}
		.album {
			width: 35%;
		}
		.time {
			width: 5%;
		}
	}
}
</style>
