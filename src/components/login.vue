<template>
	<div class="container">
		<img :src="this.url" />
	</div>
</template>
<script>
import api from '../api/index';
export default {
	data() {
		return {
			url: '',
		};
	},
	mounted() {
		this.loginRequest();
	},
	methods: {
		loginRequest() {
			api.createKey().then(res => {
				let key = res.data.data.unikey;
				// console.log(key);
				api.createMsg(key).then(res => {
					this.url = res.data.data.qrimg;
					console.log(this.url);
				});
				const inter = setInterval(() => {
					api.check(key).then(res => {
						const cookie = res.data.cookie;
						if (cookie) {
							clearInterval(inter);
							console.log(cookie);
							api.status().then(res => {
								const id = res.data.data.account.id;
								api.userInfo(id).then(info => {
									console.log(info);
								});
								console.log(res);
							});
						}
					});
				}, 3000);
			});
		},
	},
};
</script>
<style lang="less" scoped>
.container {
	width: 200px;
	height: 200px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	img {
		flex: 1;
	}
}
</style>
