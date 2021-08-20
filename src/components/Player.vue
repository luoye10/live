<template>
	<div class="play-box">
		<span class="name">{{ this.name }}</span>
		<i class="el-icon-caret-left left" @click="prev"></i>
		<div @click="button" class="btn">
			<i :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"></i>
			<!-- <i class="el-icon-video-pause" v-show="isPlay"></i> -->
			<!-- <i class="el-icon-video-play" v-show="!isPlay"></i> -->
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
// import api from '../api/index'
export default {
	data() {
		return {
			isPlay: false,
			currentTime: '00:00',
			changeW: '',
			allTime: '',
			audio: null,
			timer: null,
			name: '',
		};
	},
	mounted() {
		this.audio = document.querySelectorAll('audio')[0];
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
		play(para) {
			this.name = para.name;
			this.allTime = para.duration;
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
				this.audio.pause();
				this.isPlay = false;
			}
		},
		get() {},
		prev() {},
		next() {},
	},
};
</script>
<style lang="less" scoped>
// 这里没必要，这几个默认就是margin和padding都为0
// 而且你这种统一的样式处理没必要每个组件都写，你只要写在一个css文件里面，然后再main.js引入一次就行了
// div,
// span,
// i {
// 	margin: 0;
// 	padding: 0;
// }
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
	.name {
		display: inline-block;
		width: 20%;
		// color: rgba(196, 25, 153, 0.699);
		vertical-align: middle;
		line-height: @h;
		text-align: left;
	}
	.left,
	.btn,
	.right {
		display: inline-block;
		font-size: 30px;
		// color: aqua;
		cursor: pointer;
		margin: 0 10px;
		vertical-align: middle;
	}
	.nowTime {
		display: inline-block;
		width: 10%;
		height: 20px;
		margin: 0 10px;
		// color: rgba(146, 22, 204, 0.747);
		vertical-align: middle;
		line-height: 20px;
	}
	.progress {
		display: inline-block;
		width: 40%;
		height: 10px;
		// border: 1px solid #aaa;
		background: rgba(170, 170, 170, 0.3);
		border-radius: 10px;
		vertical-align: middle;
		overflow: hidden;
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
		// color: rgba(202, 39, 162, 0.753);
	}
}
</style>
