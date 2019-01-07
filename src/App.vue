<template>
    <div id="app">
        <div class="header">
            <span class="iconfont icon-caidan caidan"></span>
            <header>
                <ul>
                    <li class="iconfont" :class="[item.fontClass, {cur: $route.name == item.fontClass}]" v-for="item in tabNav" @click="routerGo(item.url)">
                    </li>
                </ul>
            </header>
            <span class="iconfont icon-zhuanjiguangpan" @click="showPlayer"></span>
        </div>
        <transition name="haha">
            <router-view/>
        </transition>
        <transition name="haha">
            <album v-show="$store.state.player.isShowAlbum"></album>
        </transition>
        <transition name="haha">
            <AutoPlayer v-show="$store.state.audio.isShowAudio"></AutoPlayer>
        </transition>
    </div>
</template>
<script>
    import album from "./components/Album.vue";
    import AutoPlayer from "./components/AutoPlayer.vue";
    export default {
        data(){
            return {
                tabNav:[
                    {url:"/indexmusic",fontClass:"icon-music"},
                    {url:"/faxianmusic",fontClass:"icon-wangyiyunyinlezizhi-copy"},
                    {url:"/radiomusic",fontClass:"icon-diantai"}
                ]
            }
        },
        methods:{
            routerGo(url){
                this.$router.push(url);
            },
            //显示播放器
            showPlayer(){
                this.$store.commit("SHOWHIDEPLAYER")
            }
        },
        components:{
            album,
            AutoPlayer
        }
    }
</script>
<style scoped lang='stylus'>
    html,body{height: 100%;}
    #app{height: 100%;overflow: hidden;}
    .header{
        position: relative;color:#fff;
        .caidan,.icon-zhuanjiguangpan{
            width:50px;height: 50px;line-height: 50px;
            position: absolute;top:0;left:0;text-align:center;
            font-size:26px;
        }
        .icon-zhuanjiguangpan{left:auto;right:0;}
        header{
            height: 50px;line-height: 50px;background: #c20c0c;
            ul{
                overflow: hidden;width: 60%;margin:0 auto;
                li{float: left;font-size:26px;width: 33.33%;text-align:center;}
                li.cur{background: #9b0909;}
            }
        }
    }
</style>
