<template>
    <div class="reveal">
        <ul class="song-list">
            <li class="song" v-for="item in items" :key="item.message" @click="button">
                <img :src="item.album.artist.img1v1Url" class="img" />
                <div class="content">
                    <span class="name">{{ item.name }}</span>
                    <span class="singer">{{ item.artists[0].name }}</span>
                    <span class="album">{{ item.album.name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import api from '../api/index'
export default {
    props: [
        'word'
    ],
    data(){
        return {
            items: []
        }
    },
    mounted(){
        this.searchRequest()
    },
    methods: {
        searchRequest(){
            if (!this.word) {
				this.$message.warning('请输入要搜索的关键词');
				return;
			}
			api.query(this.word)
				.then(response => {
					console.log(response);
					this.items = response.data.result.songs;
				})
				.catch(function (error) {
					console.log(error);
				});
        },
        button(){

		},
    }
}
</script>
<style lang="less" scoped>
img,div,span,ul,li{
    margin: 0;
    padding: 0;
}
.reveal {
    position: absolute;
    left: 400px;
    top: 100px;
    right: 0;
    .song {
        list-style: none;
        height: 100px;
        border: 1px solid aqua;
        border-radius: 5px;
        background: rgba(129, 89, 89, 0.493);
        vertical-align: middle;
        line-height: 100px;
        cursor: pointer;
        margin: 20px;
        position: relative;
        .img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            vertical-align: middle;
            margin: 0 20px;
        }
        .content {
            display: inline-block;
            vertical-align: middle;
            span{
                display: inline-block;
                margin: 0 60px;
                color: aqua;
            }
            
        }
    }
}
</style>