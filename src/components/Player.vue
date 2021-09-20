<template>
	<div class="play-box">
		<div class="open" @click="lyric">
			<span class="show" v-if="show">
				<i class="el-icon-arrow-up icon"></i>
				<img :src="img" class="img" />
			</span>
			<span class="name">{{ this.name }}</span>
		</div>
		<div class="operation">
			<i class="el-icon-caret-left left" @click="prev"></i>
			<div @click="button" class="btn">
				<i :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"></i>
			</div>
			<i class="el-icon-caret-right right" @click="next"></i>
		</div>
		<div class="time-pro-vol">
			<div class="time-pro">
				<div class="nowTime">{{ this.currentTime }}</div>
				<div class="progress" @click="get" ref="progress">
					<div class="now" :style="{ width: changeW }"></div>
				</div>
				<div class="end">{{ this.allTime }}</div>
			</div>
			<div class="list">
				<div class="vol-box">
					<el-slider v-model="volum" @change="getVolum"></el-slider>
				</div>
				<div class="model">
					<div class="model-box">
						<el-select v-model="playModel" placeholder="请选择播放模式" @change="changeModel">
							<el-option v-for="item in modelList" :key="item.type" :label="item.text" :value="item.type">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
		</div>
		<audio src="" @timeupdate="timeupdate" ref="audio"></audio>
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
			img: '',
			show: false,
			progress: '',
			volum: 100,
			modelList: [
				{ type: 'plain', text: '顺序模式' },
				{ type: 'random', text: '随机模式' },
			],
			playModel: 'plain',
		};
	},
	mounted() {
		this.audio = this.$refs.audio;
		this.progress = this.$refs.progress;
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
			this.$emit('songInfo', { songId: this.id, img: this.img });
		},
		play(para) {
			this.show = true;
			this.id = para.id;
			this.name = para.name;
			this.img = para.img;
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
		getVolum(v) {
			this.audio.volume = v / 100;
		},
		changeModel(type) {
			window.playModel = type;
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
	position: fixed;
	bottom: 0;
	left: 0;
	background: rgba(255, 255, 255, 0.4);
	vertical-align: middle;
	text-align: center;
	line-height: @h;
	display: flex;
	box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
	.open {
		flex: 2;
		cursor: pointer;
		display: flex;
		.show {
			width: 60px;
			box-sizing: border-box;
			position: relative;
			vertical-align: middle;
			line-height: @h;
			.icon {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: aqua;
			}
			.img {
				width: 30px;
				height: 40px;
				margin: 10px;
				&hover {
					filter: blur(10px);
				}
			}
		}
		.name {
			flex: 1;
			vertical-align: middle;
			line-height: @h;
			text-align: left;
			padding-left: 20px;
			cursor: pointer;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
	.operation {
		flex: 1;
		.left,
		.btn,
		.right {
			display: inline-block;
			font-size: 25px;
			cursor: pointer;
			margin: 0 8px;
			vertical-align: middle;
		}
	}
	.time-pro-vol {
		flex: 7;
		display: flex;
		.time-pro {
			flex: 7;
			display: flex;
			align-items: center;
			.nowTime,
			.end {
				width: 70px;
			}
			.progress {
				flex: 1;
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
		}
		.list {
			flex: 3;
			display: flex;
			align-items: center;
			.vol-box {
				flex: 4;
			}
			.model {
				flex: 6;
			}
		}
		.model-box {
			width: 60%;
			margin: 0 auto;
		}
	}
}
</style>
