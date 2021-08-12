<template>
	<div class="main">
		<el-skeleton v-if="isLoading" :rows="6" animated />
		<div class="layout">
			<!-- 头部 -->
			<!-- 左侧菜单 -->
			<!-- 右侧展示 -->
			<!-- 底部 -->
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isLoading: true,
		};
	},
};
</script>
