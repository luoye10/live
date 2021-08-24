<template>
	<div class="lyrics">
		<div class="no-lyric" v-if="nolyric">纯音乐，请欣赏</div>
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
	props: ['id'],
	data() {
		return {
			items: [],
			time: [],
			activeLyric: '',
			nolyric: false,
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
					this.items = res.data.lrc.lyric.split(/\[\d{2}:\d{2}.\d{2,}\]/g);
					this.time = res.data.lrc.lyric.match(/\d{2}:\d{2}/g);
					this.time.sort(function (a, b) {
						return a - b;
					});
					console.log(this.items, this.time);
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
	.no-lyric {
		text-align: center;
		padding: 20px 0;
	}
	.lyric-list {
		width: 600px;
		height: 400px;
		overflow-y: auto;
		margin: 0 auto;
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
</style>
