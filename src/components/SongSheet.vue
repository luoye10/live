<template>
    <div class="songs">
        <ul class="song-list">
            <li class="song"></li>
        </ul>
    </div>
</template>
<script>
import api from '../api/index'
export default {
    props: [
        'id'
    ],
    data(){
        return {
            items: [],
            total:null,
            idList: [],
            songId: null
        }
    },
    mounted(){
        this.getSong()
        this.getMessage()
    },
    methods: {
        getSong(){
            api.getSong(this.id)
				.then(response => {
					console.log(response)
					this.total = response.data.playlist.trackCount
                    this.idList = response.data.playlist.trackIds
                    this.idList.forEach(item => {
                        this.songId = item.id
                    })
				})
				.catch(function(error){
					console.log(error)
				})
        },
        getMessage(){
            api.getMessage(this.songId)
                .then(response => {
                    console.log(response)
                })
        }
    }
}
</script>
<style lang="less" scoped>
.songs {
    .song {
        list-style: none;
        height: 100px;
        border: 1px solid aqua;
        border-radius: 5px;
        background: rgba(129, 89, 89, 0.493);
        vertical-align: middle;
        cursor: pointer;
        margin: 20px;
    }
}
</style>