<template>
    <div class="albumPage">
        <div class="header" :style="{background:`url(${player.album.albumbg}) 0 0/100% 100%`}">
            <header>
                <span class="iconfont icon-houtui1" @click="hideAlbum"></span>
                {{player.album.albumTitle}}
            </header>
            <div class="content">
                <div class="albumImg">
                    <img :src="player.album.albumImg">
                </div>
                <div class="albumDetail">
                    <p class="albumTitle">专辑：{{player.album.albumTitle}}</p>
                    <p class="singer">
                        <img :src="player.album.albumImg">
                        <span>歌手：{{player.album.albumSinger}}</span>
                    </p>
                </div>
            </div>
            <ul class="setting">
                <li class="iconfont icon-addfile"></li>
                <li class="iconfont icon-BAI-pinglun"></li>
                <li class="iconfont icon-fenxiang1"></li>
                <li class="iconfont icon-icon--"></li>
            </ul>
        </div>
        <div class="albumList">
            <ul>
                <li v-for="(item,index) in player.album.albumList"
                    @click="showPlayer(index)"
                    :class="{cur:index == $store.state.audio.index && player.index == $store.state.audio.albumIndex}"
                >
                    <span class="index">{{index + 1}}</span>
                    <div>
                        <p>{{item.musicName}}</p>
                        <p>{{item.musicSinger}}</p>
                    </div>
                    <span class="iconfont icon-laba"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
     export default {
        computed:{
            player(){
                return this.$store.state.player
            }
        },
        methods:{
            hideAlbum(){
                this.$store.commit("HIDEALBUM")
            },
            showPlayer(index){
                this.$store.commit("SHOWPLAYER",{
                    isShowAudio:true,
                    albumList:this.player.album.albumList, //当前专辑列表
                    index:index,    //歌曲的下标
                    //设置播放的第几张专辑 对应 0 1 2 3，null表示单曲列表
                    albumIndex:this.player.index, //专辑或单曲的下标
                    albumImg:this.player.album.albumImg,
                    playerbg:this.player.album.playerbg
                })
            }
        }
     }
</script>
<style lang='stylus' scoped>
    .albumPage{
        position: fixed;top:0;left:0;width: 100%;height: 100%;background: #fff;z-index:1;
        .header{
            height: 280px;
            header{
                position: relative;color:#fff;height: 50px;text-align:center;line-height: 50px;
                span.icon-houtui1{
                    position: absolute;top:0;left:0;width: 50px;height: 50px;
                    text-align:center;font-size:26px;
                }
            }
            .content{
                padding:5% 3.5%;overflow: hidden;
                .albumImg{
                    width: 36%;float: left;
                    img{width: 100%;}
                }
                .albumDetail{
                    width: 64%;padding-left:3%;float: left;color:#fff;
                    p.albumTitle{height: 30px;line-height: 30px;margin:3px 0;}
                    p.singer{
                        height: 30px;
                        img{
                            width: 30px;border-radius:50%;float: left;margin-right:10px;
                        }
                        span{float: left;line-height: 30px;}
                    }
                }
            }
            .setting{
                overflow: hidden;margin-top:10px;
                li{
                    float: left;width: 25%;height: 50px;line-height: 50px;
                    text-align:center;font-size:36px;color:#fff;
                }
            }
        }
        .albumList{
            ul{
                li{
                    overflow: hidden;padding-top:5px;
                    .index{
                        width: 50px;height: 50px;line-height: 50px;
                        text-align:center;float: left;
                    }
                    div{ float: left;
                        p{height: 25px;line-height: 25px;}
                        p:nth-child(1){font-size:16px;color:#3b3c3d;}
                        p:nth-child(2){font-size:14px;color:#888;}
                    }
                    .icon-laba{
                        height: 50px;width: 50px;line-height: 50px;
                        float: right;text-align:center;font-size:26px;
                    }
                }
                li.cur{
                    color:red;
                    div p {color:red;}
                }
            }
        }
    }
</style>