<template>
	<div class="play-box">
		<span class="name">{{ this.name }}</span>
		<i class="el-icon-caret-left left" @click="prev"></i>
		<div @click="button" class="btn">
			<i class="el-icon-video-pause" v-show="isPlay"></i>
			<i class="el-icon-video-play" v-show="!isPlay"></i>
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
div,
span,
i {
	margin: 0;
	padding: 0;
}
.play-box {
	width: 100%;
	height: 100px;
	border-top: 1px solid aqua;
	position: fixed;
	bottom: 0;
	left: 0;
	background: rgba(138, 175, 223, 0.616);
	vertical-align: middle;
	text-align: center;
	line-height: 100px;
	.name {
		display: inline-block;
		width: 20%;
		color: rgba(196, 25, 153, 0.699);
		vertical-align: middle;
		line-height: 100px;
		text-align: left;
	}
	.left,
	.btn,
	.right {
		display: inline-block;
		font-size: 30px;
		color: aqua;
		cursor: pointer;
		margin: 0 10px;
		vertical-align: middle;
	}
	.nowTime {
		display: inline-block;
		width: 10%;
		height: 20px;
		margin: 0 10px;
		color: rgba(146, 22, 204, 0.747);
		vertical-align: middle;
		line-height: 20px;
	}
	.progress {
		display: inline-block;
		width: 40%;
		height: 20px;
		border: 1px solid aqua;
		border-radius: 20px;
		vertical-align: middle;
		.now {
			width: 0;
			height: 20px;
			cursor: pointer;
			border-radius: 20px;
			background: rgba(209, 44, 22, 0.87);
		}
	}
	.end {
		display: inline-block;
		width: 10%;
		height: 20px;
		color: rgba(202, 39, 162, 0.753);
	}
}
</style>
