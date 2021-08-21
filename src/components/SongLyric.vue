<template>
	<div class="lyrics">
		<ul class="lyric-list">
			<li class="lyric" v-for="item in items" :key="item.message">{{ item }}</li>
		</ul>
	</div>
</template>
<script>
import api from '../api/index';
export default {
	props: ['id'],
	data() {
		return {
			items: [],
			time: [],
		};
	},
	methods: {
		getLyric() {
			api.getLyric(this.id)
				.then(res => {
					this.items = res.data.lrc.lyric.split(/\[\d{2}:\d{2}.\d{2,}\]/g);
					this.time = res.data.lrc.lyric.match(/\d{2}:\d{2}/g);
					console.log(this.items, this.time);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		highLight(playTime) {
			for (var i = 0; i < this.time.length; i++) {
				if (playTime >= this.time[i] && playTime < this.time[i + 1]) {
					this.time[i].style.color = '';
					this.time[i + 1].style.color = 'red';
					this.time[i + 1].parentNode.scrollTop = i * 20;
				}
			}
		},
	},
	watch: {
		id(newVal) {
			this.getLyric(newVal);
		},
	},
};
</script>
<style lang="less" scoped>
.lyrics {
	.lyric-list {
		width: 400px;
		height: 600px;
		overflow-y: auto;
		margin: 100px auto;
		text-align: center;
		.lyric {
			margin: 10px auto;
			height: 20px;
			text-align: center;
			color: rgba(122, 98, 98, 0.747);
		}
	}
	.lyric-list::-webkit-scrollbar {
		width: 10px;
	}
	.lyric-list::-webkit-scrollbar-track {
		width: 10px;
		border-radius: 10px;
		background: rgba(172, 160, 160, 0.747);
	}
	.lyric-list::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: rgba(116, 112, 93, 0.747);
	}
}
</style>
