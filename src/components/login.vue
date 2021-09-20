<template>
	<div class="login">
		<div class="container">
			<el-form :model="ruleForm" :rules="rules" ref="loginForm">
				<el-form-item placeholder="用户名" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item placeholder="密码" prop="password">
					<el-input v-model="ruleForm.password" type="password"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="login">登录</el-button>
		</div>
	</div>
</template>
<script>
import api from '../api/index';
export default {
	data() {
		const pwdVal = (rule, value, callback) => {
			var reg = /.{8,}/;
			if (!value) {
				callback(new Error('密码不能为空'));
			} else if (!reg.test(value)) {
				callback(new Error('密码最少为8个字符'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				username: '',
				password: '',
			},
			rules: {
				username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
				password: [{ required: true, validator: pwdVal, trigger: 'blur' }],
			},
		};
	},
	mounted() {
		window.addEventListener('keyup', this.keyogin);
	},
	beforeDestroy() {
		window.removeEventListener('keyup', this.keyogin);
	},
	methods: {
		keyogin(e) {
			if (e.code === 'Enter') {
				// if (this.ruleForm.username && this.ruleForm.password) {
				// 	this.login();
				// }
				this.$refs.loginForm.validate(valid => {
					if (!valid) {
						return;
					}
					this.login();
				});
			}
		},
		login() {
			this.$refs['loginForm'].validate(valid => {
				if (!valid) {
					console.log('rules验证没通过');
					return;
				}
				// rules 通过了，可以正式开始调接口登录
				// console.log('start login');
				this.loginRequest();
				// 调用登录接口，登录成功之后，开始跳转到别的组件
			});
		},
		loginRequest() {
			api.login({
				params: {
					phone: this.ruleForm.username,
					password: this.ruleForm.password,
				},
			})
				.then(response => {
					const data = response.data;
					if (data.code !== 200) {
						this.$message.error(data.msg || '账号或密码错误');
						return;
					}
					var obj = JSON.stringify(data);
					localStorage.setItem('userInfo', obj);
					this.$message.success('登录成功');
					this.$router.push({ name: 'main' });
				})
				.catch(function (error) {
					console.log(error);
				});
		},
	},
};
</script>
<style lang="less" scoped>
.login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.container {
		background: rgba(47, 220, 242, 0.1);
		width: 350px;
		height: 250px;
		border-radius: 5px;
		box-shadow: 0 0 10px 15px #f7f5f5;
		text-align: center;
		/deep/ .el-form {
			width: 200px;
			margin: 0 auto;
			.el-form-item {
				margin: 30px 0;
			}
		}
	}
}
</style>
