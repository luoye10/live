<template>
	<div class="lyrics">
		<div class="filter-layer play" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
		<div class="no-lyric" v-if="nolyric">还没有歌词哦~</div>
		<ul class="lyric-list" v-else>
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
	props: ['id', 'img'],
	data() {
		return {
			items: [],
			time: [],
			activeLyric: '',
			nolyric: true,
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
					// 纯音乐没有歌词，或者有歌词但还没人上传
					this.nolyric = res.data.nolyric;
					if (res.data.nolyric) {
						return;
					}
					console.log(res);
					this.items = res.data.lrc.lyric.split(/\[\d{2}:\d{2}.\d{2,}\]|\[\d{2}:\d{2}\]/g);
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
					this.activeLyric = i + 1;
					if (this.activeLyric > 5) {
						let lyric = document.querySelector('.lyric-list');
						lyric.scrollTop = (this.activeLyric - 5) * 40;
					}
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
	// 组件销毁时，给audio取消绑定的timeupdate事件
	beforeDestroy() {
		let audio = document.querySelector('audio');
		audio.removeEventListener('timeupdate', this.timeupdate);
	},
};
</script>
<style lang="less" scoped>
.lyrics {
	margin: 10px auto;
	position: relative;
	width: 75%;
	height: 400px;
	.filter-layer {
		position: absolute;
		left: 0;
		top: 100px;
		// transform: translateY(-50%);
		width: 200px;
		height: 200px;
		border-radius: 50%;
		z-index: 1;
		background-size: cover;
		background-position: center center;
		transform-origin: center;
		// filter: blur(0);
		&.play{
			animation: play 20s linear infinite;
		}
	}
	.no-lyric {
		text-align: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		line-height: 400px;
	}
	.lyric-list {
		position: absolute;
		left: 50%;
		margin-left: -300px;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		width: 600px;
		height: 400px;
		overflow-y: auto;
		text-align: center;
		.lyric {
			// width: 100%;
			height: 40px;
			padding: 10px 0;
			text-align: center;
			color: rgba(122, 98, 98, 0.747);
			box-sizing: border-box;
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
@keyframes play {
	0%{
		transform: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
}
</style>
