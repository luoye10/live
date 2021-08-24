<template>
	<div class="lyrics">
		<ul class="lyric-list">
			<li
				:class="['lyric', { active: index === activeLyric }]"
				v-for="(item, index) in items"
				:key="item.message"
			>
				{{ item }}
			</li>
		</ul>
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
			time: [],
			activeLyric: '',
		};
	},
	mounted() {
		this.getLyric();
		this.getTime();
	},
	methods: {
		getLyric() {
			api.getLyric(this.id)
				.then(res => {
					this.items = res.data.lrc.lyric.split(/\[\d{2}:\d{2}.\d{2,}\]/g);
					this.time = res.data.lrc.lyric.match(/\d{2}:\d{2}/g);
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		highLight(playTime) {
			playTime = format(playTime * 1000);
			for (var i = 0; i < this.time.length; i++) {
				if (playTime >= this.time[i] && playTime < this.time[i + 1]) {
					this.activeLyric = i;
					let lyric = document.querySelector('.lyric-list');
					lyric.scrollTop = i * 20;
				}
			}
		},
		getTime() {
			let audio = document.querySelector('audio');
			audio.addEventListener('timeupdate', this.timeupdate);
		},
		timeupdate(ev) {
			const t = ev.target.currentTime;
			this.highLight(t);
		},
	},
};
</script>
<style lang="less" scoped>
.lyrics {
	.lyric-list {
		width: 400px;
		height: 500px;
		overflow-y: auto;
		margin: 0 auto;
		text-align: center;
		.lyric {
			margin: 10px auto;
			height: 20px;
			text-align: center;
			color: rgba(122, 98, 98, 0.747);
		}
		.lyric.active {
			color: red;
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
		height: 10px;
		border-radius: 10px;
		background: rgba(116, 112, 93, 0.747);
	}
}
</style>
