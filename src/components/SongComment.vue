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
		<div class="page-box">
			<el-pagination
				layout="prev, pager, next"
				@current-change="pageChange"
				:total="total"
				v-show="total > limit"
			></el-pagination>
		</div>
	</div>
</template>
<script>
import api from '../api/index';
export default {
	props: ['id'],
	data() {
		return {
			items: [],
			limit: 20,
			page: 1,
			total: 0,
		};
	},
	mounted() {
		this.getComment();
	},
	methods: {
		getComment() {
			const params = {
				id: this.id,
				limit: this.limit,
				offset: (this.page - 1) * this.limit,
			};
			api.getComment(params)
				.then(res => {
					if (this.page === 1) {
						this.total = res.data.total;
					}
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
		pageChange(page) {
			this.page = page;
			this.getComment();
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
};
</script>
<style lang="less" scoped>
.comments {
	margin: 30px auto;
	.comment {
		list-style: none;
		height: 100px;
		margin: 20px;
		width: 75%;
		margin: 0 auto;
		text-shadow: 0 0 10px rgba(51, 84, 100, 0.5);
		position: relative;
		.left {
			display: inline-block;
			width: 100px;
			vertical-align: middle;
			cursor: pointer;
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
	.page-box {
		margin: 15px 0;
		text-align: center;
	}
}
</style>
