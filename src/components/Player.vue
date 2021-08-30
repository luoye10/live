<template>
	<div class="play-box">
		<div class="open">
			<i class="el-icon-arrow-up show" @click="lyric"></i>
			<span class="name">{{ this.name }}</span>
		</div>
		<i class="el-icon-caret-left left" @click="prev"></i>
		<div @click="button" class="btn">
			<i :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"></i>
		</div>
		<i class="el-icon-caret-right right" @click="next"></i>
		<div class="nowTime">{{ this.currentTime }}</div>
		<div class="progress" @click="get">
			<div class="now" :style="{ width: changeW }"></div>
		</div>
		<div class="end">{{ this.allTime }}</div>
		<audio src="" @timeupdate="timeupdate"></audio>
	</div>
</template>
<script>
import getStyle from '../util/getStyle';
export default {
	props: ['songList', 'songSearch'],
	data() {
		return {
			isPlay: false,
			currentTime: '00:00',
			changeW: '',
			allTime: '',
			audio: null,
			timer: null,
			name: '',
			id: '',
			progress: '',
		};
	},
	mounted() {
		this.audio = document.querySelectorAll('audio')[0];
		this.progress = document.querySelectorAll('.progress')[0];
		// 注：返回的width值是一个包含单位('px')的字符串，所以要把最后两个字符去掉，同时把值转化为数字
		this.width = +getStyle(this.progress, 'width').slice(0, -2);
	},
	methods: {
		button() {
			if (this.isPlay) {
				this.audio.pause();
			} else {
				this.audio.play();
			}
			this.isPlay = !this.isPlay;
		},
		lyric() {
			this.$emit('songInfo', this.id);
		},
		play(para) {
			this.id = para.id;
			this.name = para.name;
			if (typeof para.duration === 'string') {
				this.allTime = para.duration;
			} else {
				this.allTime = para.dt;
			}
			this.audio.src = para.url;
			this.audio.play();
			this.isPlay = true;
		},
		timeupdate(event) {
			const t = event.target.currentTime;
			const m = Math.floor(t / 60);
			const s = Math.floor(t % 60);
			this.currentTime = '0' + m + ':' + (s < 10 ? '0' + s : s);
			const M = Number(String(this.allTime).slice(0, 2)) * 60;
			const S = Number(String(this.allTime).slice(-2));
			this.changeW = Math.floor((Math.floor(t) / (M + S)) * 100) + '%';
			if (this.currentTime === this.allTime) {
				this.next();
			}
		},
		get(e) {
			// 没有歌曲在播放的时候忽略点击操作
			// if (!this.isPlay) {
			// 	return;
			// }
			const x = e.offsetX;
			const per = x / this.width;
			const times = this.allTime.split(':'); // 此时的时间是一个时分格式的字符串，要转成纯数字的秒时间
			const all = times[0] * 60 + times[1] * 1;
			const currentTime = all * per;
			this.changeW = per * 100 + '%';
			this.audio.currentTime = currentTime;
		},
		prev() {
			this.$emit('playChange', 'prev');
		},
		next() {
			this.$emit('playChange', 'next');
		},
	},
	watch: {
		songList(newVal) {
			this.play(newVal);
		},
		songSearch(newVal) {
			this.play(newVal);
		},
	},
};
</script>
<style lang="less" scoped>
@h: 60px;
.play-box {
	width: 100%;
	height: @h;
	border-top: 1px solid #aaa;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #fff;
	vertical-align: middle;
	text-align: center;
	line-height: @h;
	.open {
		display: inline-block;
		width: 20%;
		.show {
			width: 10%;
			text-align: left;
			cursor: pointer;
		}
		.name {
			display: inline-block;
			width: 90%;
			vertical-align: middle;
			line-height: @h;
			text-align: left;
			cursor: pointer;
		}
	}

	.left,
	.btn,
	.right {
		display: inline-block;
		font-size: 25px;
		cursor: pointer;
		margin: 0 10px;
		vertical-align: middle;
	}
	.nowTime {
		display: inline-block;
		width: 10%;
		height: 20px;
		margin: 0 10px;
		vertical-align: middle;
		line-height: 20px;
	}
	.progress {
		display: inline-block;
		width: 40%;
		height: 10px;
		background: rgba(170, 170, 170, 0.3);
		border-radius: 10px;
		vertical-align: middle;
		cursor: pointer;
		.now {
			width: 0;
			height: 10px;
			cursor: pointer;
			border-radius: 10px;
			background: rgba(209, 44, 22, 0.5);
		}
	}
	.end {
		display: inline-block;
		width: 10%;
		height: 20px;
	}
}
</style>
