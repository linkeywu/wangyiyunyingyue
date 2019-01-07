<template>
    <div class="indexmusic" v-height="50">
        <VueSwiper :swiperArr="swiperArr"></VueSwiper>

        <div class="album">
            <h3>推荐专辑</h3>
            <ul>
                <li v-for="(item,index) in album" @click="showAlbum(item,index)">
                    <img :src="item.albumImg">
                    <p>{{item.albumTitle}}</p>
                </li>
            </ul>
        </div>

        <div class="recommend">
            <h3>热歌列表</h3>
            <ul>
                <li v-for="(item,index) in recommend"
                    @click="showPlayer(recommend,index)"
                    :class="{cur:index == $store.state.audio.index && $store.state.audio.albumIndex == null}"
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
import VueSwiper from "../../components/Swiper.vue";
export default {
    data() {
        return {
            swiperArr:[
                {"url":"http://p1.music.126.net/-UdDGKQe2c8rgCt3uXxmig==/109951163702712597.jpg"},
                {"url":"http://p1.music.126.net/LK3uRSNY89byOpmJU3Eu3Q==/109951163705290307.jpg"},
                {"url":"http://p1.music.126.net/rMDMFF_e5c7IbZLR50mEow==/109951163705286491.jpg"},
                {"url":"http://p1.music.126.net/fxrvGDLIDjHbDSukZzhvxg==/109951163704892813.jpg"}
            ]
        }
    },
    components:{
        VueSwiper
    },
    created(){
        this.$store.dispatch("GETALL"); //请求data.json文件的数据
    },
    computed:{
        album(){
            //得到全局state的专辑数据
            return this.$store.state.mapList.album
        },
        recommend(){
            //得到全局state的单曲数据
            return this.$store.state.mapList.recommend
        }
    },
    methods:{
        showAlbum(item,index){
            //点击传入整张专辑数据（item） 和 点击的是第几张专辑（index）
            this.$store.commit("SHOWALBUM", {
                isShowAlbum:true,
                album:item,
                index:index
            })
        },
        showPlayer(recommend,index){
            //点击传入recommend是 所有单曲列表 和 index 点击的是第几首歌曲
            this.$store.commit("SHOWPLAYER",{
                isShowAudio: true,  //显示播放器
                albumList: recommend, //单曲的列表
                index: index,         //歌曲下标
                albumImg: recommend[index].singerImg, //作者头像
                playerbg: recommend[index].playerbg,  //播放背景
                albumIndex: null    //null表示单曲
            })
        }
    }
}
</script>
<style lang='stylus' scoped>
    .indexmusic{
        overflow-y:scroll;
        h3{font-weight:normal;font-size:18px;line-height: 40px;height: 40px;}
        h3:before{
            content: "|";
            color: #c20c0c;
            font-size: 15px;
            background: #c20c0c;
            margin: 0 6px;
        }
        .album{
            ul{
                overflow: hidden;
                li{
                    float: left;width: 33.333%;text-align:center;
                    img{
                        width: 99%;display: block;padding:1%;
                    }
                }
            }
        }
    }
    .recommend{
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
</style>
