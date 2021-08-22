<template>
	<div class="comments">
		<ul class="comment-list">
			<li class="comment" v-for="item in items" :key="item.message">
				<div class="left">
					<img :src="item.img" class="img" />
				</div>
				<div class="right">
					<div class="text">
						<span class="name">{{ item.name + ': ' }}</span>
						<span class="content">{{ item.text }}</span>
						<div class="time">{{ item.tm }}</div>
					</div>
				</div>
			</li>
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
		};
	},
	methods: {
		getComment(id) {
			api.getComment(id)
				.then(res => {
					console.log(res);
					const list = res.data.comments;
					const items = list.map(item => {
						item.img = item.user.avatarUrl;
						item.name = item.user.nickname;
						item.text = item.content;
						item.tm = this.format(item.time, 'yyyy-MM-dd hh:mm:ss');
						return item;
					});
					this.items = items;
				})
				.catch(function (error) {
					console.log(error);
				});
		},
		format(paraTime, format) {
			let time = new Date(paraTime);
			let y = time.getFullYear(),
				M = time.getMonth() + 1,
				d = time.getDate(),
				h = time.getHours(),
				m = time.getMinutes(),
				s = time.getSeconds();
			let list = {
				'y+': y,
				'M+': ('0' + M).slice(-2),
				'd+': ('0' + d).slice(-2),
				'h+': ('0' + h).slice(-2),
				'm+': ('0' + m).slice(-2),
				's+': ('0' + s).slice(-2),
			};
			Object.keys(list).forEach(key => {
				format = format.replace(new RegExp(key), list[key]);
			});
			return format;
		},
	},
	watch: {
		id(newVal) {
			this.getComment(newVal);
		},
	},
};
</script>
<style lang="less" scoped>
.comments {
	margin: 30px auto;
	.comment {
		list-style: none;
		height: 100px;
		border-radius: 5px;
		margin: 20px;
		background: rgba(177, 164, 164, 0.788);
		cursor: pointer;
		position: relative;
		.left {
			display: inline-block;
			width: 100px;
			vertical-align: middle;
			.img {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				margin: 20px;
			}
		}
		.right {
			position: absolute;
			left: 100px;
			top: 20px;
			color: #000;
			.name {
				color: rgba(153, 29, 190, 0.788);
				margin-right: 5px;
			}
		}
	}
}
</style>
