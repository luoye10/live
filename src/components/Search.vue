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
import format from '../util/format';
import bus from '../util/bus';
export default {
	props: ['word'],
	data() {
		return {
			items: [],
			loading: false,
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
			this.loading = true;
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
					this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
					this.loading = false;
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
				bus.$emit('songSearch', obj);
			});
		},
	},
};
</script>
<style lang="less" scoped>
.reveal {
	height: 100%;
	.song-list {
		height: 100%;
		overflow-y: auto;
	}
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
			width: 30%;
		}
		.singer {
			width: 15%;
		}
		.album {
			width: 35%;
		}
		.time {
			width: 10%;
		}
	}
}
</style>
