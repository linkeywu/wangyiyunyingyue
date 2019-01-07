<template>
    <div class="audioPlayerPage" :style="{background: `#14277a url(${audio.playerbg}) 0 0/100% 100%`}">
        <!-- 透明遮罩 -->
        <div class="popwindow" :class="{cur:isShowPlayList}" @click="isShowPlayListBtn"></div>
        <header>
            <span class="iconfont icon-houtui1" @click="goBack"></span>
            <!-- 需要判断index的类型去显示相应的歌曲名字 -->
            {{typeof audio.index == 'number' ? audio.albumList[audio.index].musicName : '播放器'}}
        </header>

        <!-- 播放器 -->
        <span v-if="typeof audio.index == 'number'">
            <audio autoplay @ended="onEnd" :src="audio.albumList[audio.index].musicUrl" @timeupdate="play()" ref="audio">
            </audio>
        </span>
        <!-- 播放器 -->

        <!-- 歌词 -->
        <div class="lyric" v-if="isShowLyric" @click="hideLyric" v-height="280">
            <ul>
                <!-- 下一行歌词时间 减去 当前行歌词时间，就是当前这行歌词唱了多少秒时间 -->
                <!-- 1.如当前播放时间(currentTime) > 当前这行的歌词时间lyric[index][0] -->
                <!-- 2.并且(&&) 当前播放时间 + 当前行的时间 -->
                <!-- 3.但下一行不能超过本首歌的歌词总数（不能超过数组长度） -->
                <!-- 如果到了歌词的最后一行，停留在最后一行 -->
                <!-- index+1 > lyric.length-1 ? lyric.length-1 : index+1 -->
                <!-- <li v-for="(item,index) in lyric"
                    :class="{cur:currentTime > lyric[index][0] && currentTime + (lyric[index+1 > lyric.length-1 ? lyric.length-1 : index+1][0] - lyric[index][0])}"
                >
                   <span class="animationLyric_origin">
                        {{item[1]}}
                        <span class="animationLyric_current"
                            :style="[
                                {'animation-play-state':isPlay ? 'running' : 'paused'},
                                {'animation-duration': lyric[index+1 > lyric.length-1 ? lyric.length-1 : index+1][0] - lyric[index][0] +'s'},
                            ]"
                        >
                            {{item[1]}}
                        </span>
                   </span>
                </li> -->
                <li v-for="(item,index) in lyric"
                    :class="{cur:currentTime > lyric[index][0] && currentTime + (lyric[lyricPlayTime(index)][0] - lyric[index][0])}"
                >
                   <span class="animationLyric_origin">
                        {{item[1]}}
                        <span class="animationLyric_current"
                            :style="[
                                {'animation-play-state':isPlay ? 'running' : 'paused'},
                                {'animation-duration': lyric[lyricPlayTime(index)][0] - lyric[index][0] +'s'},
                            ]"
                        >
                            {{item[1]}}
                        </span>
                   </span>
                </li>
            </ul>
        </div>
        <!-- 歌词 -->

        <div class="content" v-if="!isShowLyric" @click="showLyric">
            <div class="cd">
                <img src="../../static/img/cd.png">
                <div class="singerbg" :class="{cur:isPlay}">
                    <img :src="audio.albumImg">
                </div>
            </div>
            <div class="swith" :class="{cur:isPlay}">
                <img src="../../static/img/swith.png">
            </div>
        </div>

        <!-- 分割线 -->
        <ul class="setting">
            <li class="iconfont icon-xin1"></li>
            <li class="iconfont icon-icon--"></li>
            <li class="iconfont icon-BAI-pinglun"></li>
            <li class="iconfont icon-more-vert"></li>
        </ul>
        <!-- 控制器 播放按钮 -->
        <div class="progressBar">
            <p class="start">{{currentTime | date}}</p>
            <p class="range">
                <span class="duration" ref="duration" @click="gotoTime($event)">
                    <span class="currentTime" :style="{width:currentTime / duration * 100+'%'}">
                    </span>
                </span>
            </p>
            <p class="end">{{duration | date}}</p>
        </div>
        <div class="controller">
            <p class="playModeBtn iconfont"
                :class="[
                    {'icon-xunhuan': playState == 'all'},
                    {'icon-singlecycle':playState == 'once'},
                    {'icon-bofangye-caozuolan-suijibofang':playState == 'random'}
                ]"
                @click="changePlayState"
            >

            </p>
            <ul>
                <li class="iconfont icon-previous" @click="goPrev()"></li>
                <li class="iconfont" @click="pause_play()"
                    :class="[isPlay ? 'icon-pause-20': 'icon-bofang']"
                >
                </li>
                <li class="iconfont icon-next" @click="goNext()"></li>
            </ul>
            <p class="playListBtn iconfont icon-zhankaicaidan" @click="isShowPlayListBtn"></p>
        </div>

        <div class="playList" :class="{cur:isShowPlayList}">
            <ul>
                <li v-for="(item,index) in audio.albumList" :class="{'cur': index == audio.index}"
                    @click="playList(index)"
                >
                    <span class="iconfont laba"
                        :class="{'icon-laba': index == audio.index}"
                        :style="{fontSize: index != audio.index ? '14px' : '28px' }"
                    >
                        {{index != audio.index ? index + 1 : ""}}
                    </span>
                    <span>{{item.musicName}}</span>
                </li>
                <footer>
                    <span class="iconfont icon-guanbi" @click="isShowPlayListBtn"></span>
                </footer>
            </ul>
        </div>
    </div>
</template>
<script>
     export default {
        data(){
            return {
                isShowPlayList:false,   //是否显示播放列表
                duration:0,         //歌曲总时长
                currentTime:0,      //当前播放的时间
                isPlay:true,        //因为audio标签有autoplay，所以默认是true
                isAddClass:true,    //需要一个量去控制什么时候加cur类
                playState:'all',    //播放模式all once random
                isShowLyric:false,  //是否显示歌词
                lyric:[]            //歌词数组
            }
        },
        computed:{
            audio(){
                return this.$store.state.audio;
            },
            // playerIndex(){
            //     return this.audio.index;
            // }
        },
        filters:{
            date(s){
                var t;
                if(s > -1){
                    var min = Math.floor(s/60) % 60;
                    var sec = s % 60;

                    if(min < 10){t += "0";}
                    t = min + ":";
                    if(sec < 10){t += "0";}
                    t += ~~sec;
                }
                return t;
            }
        },
        methods:{
            lyricPlayTime(index){
                return index + 1 > this.lyric.length-1 ? this.lyric.length-1 : index + 1
            },
            hideLyric(){
                this.isShowLyric = false;
            },
            showLyric(){
                // 显示歌词的同时得到歌词
                this.isShowLyric = true;

                this.$http.get(this.audio.albumList[this.audio.index].musicLyric).then(res=>{
                    //将歌词文本传递到函数中，经过格式化后，再存储到lyric数组
                    this.lyric = this.parseLyric(res.data)
                    console.log(this.lyric)
                })
            },
            //格式化歌词函数
            parseLyric(lyric){
                var arr = [];
                //根据换行，分割成每一行字符串
                var lines =  lyric.split(/\n/)
                var getLyricTime = /\[\d{2}:\d{2}.\d{2}\]/g; //正则

                //使用while语句，得到有时间的歌词
                while(!getLyricTime.test(lines[0])){
                    lines = lines.splice(1);  //没时间的则删除
                }

                //如果最后一行有空行没有时间会出现问题，所以去掉最后的空行
                if(lines[lines.length-1].length === 0){
                    lines.pop();
                }
                //遍历歌词，把时间和歌词分开，并且将歌词的时间转换成秒
                lines.forEach(item=>{
                    //得到时间 和 歌词的分界点
                    var index = item.indexOf("]")
                    //字符串方法截取，得到时间
                    var time = item.substr(1, index-1);
                    //将这样的时间02:24.61转换成['02','24.61']数组形式
                    //然后让数组[0]项 * 60，得到秒 + 24.61秒
                    var timeArr = time.split(":");

                    //得到歌词
                    var lyricStr = item.substr(index + 1);
                    //["120", "爱上对方就哭了"],将处理过的歌词，放进arr数组中
                    arr.push([timeArr[0] * 60 + parseFloat(timeArr[1]), lyricStr])
                })
                return arr;
            },
            goBack(){
                this.$store.commit("SHOWHIDEPLAYER")
            },
            isShowPlayListBtn(){
                //显示或隐藏 抽屉
                this.isShowPlayList = !this.isShowPlayList;
            },
            play(){
                this.duration = this.$refs.audio.duration  //获取音频的总时长
                this.currentTime = this.$refs.audio.currentTime //获取音频当前的播放时间

                if(this.$refs.audio.paused){
                    this.isPlay = false;
                }else{
                    this.isPlay = true;
                }

                console.log(this.currentTime)  //当前播放时间
                // console.log(this.lyric[i][0])  //每一行的时间
                for(var i = 0; i < this.lyric.length;i++){
                    if(this.currentTime > this.lyric[i][0]){
                        //让盒子向上运动
                        $('.lyric ul').css("top", $('.lyric').height() / 2 -26 * (i + 1))
                        // $('.lyric ul li').removeClass('cur');
                        // $('.lyric ul li').eq(i).addClass('cur');
                    }
                }
                //ended 属性返回音频/视频是否已结束
                // if(this.$refs.audio.ended){
                //     switch(this.playState){
                //         case 'all': //顺序播放
                //             if(this.audio.index >= this.audio.albumList.length - 1){
                //                 this.changeMusic(0)
                //             }else{
                //                 this.changeMusic(this.audio.index + 1)
                //             }
                //             break;
                //         case 'random': //随机播放
                //             var index = ~~(Math.random() * this.audio.albumList.length)
                //             console.log(index)
                //             this.changeMusic(index)
                //             break;
                //         case 'once':  //单曲循环
                //             this.changeMusic(this.audio.index);
                //             this.$refs.audio.load() //重新播放
                //             break;
                //     }
                // }
            },
            gotoTime(e){
                var clickTime = e.offsetX / $(".duration").width()
                this.$refs.audio.currentTime = clickTime * this.$refs.audio.duration;
            },
            changePlayState(){
                //点击切换播放模式
                switch(this.playState){
                    case 'all':
                        this.playState = 'random'
                        break;
                    case 'random':
                        this.playState = 'once'
                        break;
                    case 'once':
                        this.playState = 'all'
                        break;
                }
            },
            pause_play(){
                this.isPlay = !this.isPlay
                //暂停时，条件为真，则播放
                if(this.$refs.audio.paused){
                    this.$refs.audio.play();
                }else{
                    this.$refs.audio.pause();
                }
            },
            //切换歌曲方法
            changeMusic(index){
                if(this.audio.albumIndex == null){
                    //单曲切换
                    this.$store.commit("CHANGEMUSIC",{
                        index: index,
                        playerbg:this.audio.albumList[index].playerbg,
                        albumImg:this.audio.albumList[index].singerImg
                    })
                }else if(typeof this.audio.albumIndex == 'number'){
                    //专辑中的歌曲切换
                    this.$store.commit("CHANGEMUSIC",{
                        index: index,
                        playerbg:this.audio.playerbg,
                        albumImg:this.audio.albumImg
                    })
                }
            },
            //切换下一首歌
            goNext(){
                if(this.playState === 'random'){
                    var index = ~~(Math.random() * this.audio.albumList.length)
                    this.changeMusic(index)
                }else if(this.playState === 'all'){
                    if(this.audio.index >= this.audio.albumList.length - 1){
                        this.changeMusic(0)
                    }else{
                        this.changeMusic(this.audio.index + 1)
                    }
                }
            },

            goPrev(){
                if(this.audio.index <= 0){
                    //切换到最后一首
                    this.changeMusic(this.audio.albumList.length-1)
                }else{
                    this.changeMusic(this.audio.index - 1)
                }
            },
            playList(index){
                //播放器列表内的 切换歌曲
                this.changeMusic(index)
            },
            //当音频结束播放后执行的方法
            onEnd(){
                switch(this.playState){
                    case 'all': //顺序播放
                        if(this.audio.index >= this.audio.albumList.length - 1){
                            this.changeMusic(0)
                        }else{
                            this.changeMusic(this.audio.index + 1)
                        }
                        break;
                    case 'random': //随机播放
                        var index = ~~(Math.random() * this.audio.albumList.length)
                        console.log(index)
                        this.changeMusic(index)
                        break;
                    case 'once':  //单曲循环
                        this.changeMusic(this.audio.index);
                        this.$refs.audio.load() //重新播放
                        break;
                }
            }
        },
        watch:{
            // playerIndex(){
            '$store.state.audio.index'(){
                this.$http.get(this.audio.albumList[this.audio.index].musicLyric).then(res=>{
                    //将歌词文本传递到函数中，经过格式化后，再存储到lyric数组
                    this.lyric = this.parseLyric(res.data)
                })
            }
        }
     }
</script>
<style scoped lang='stylus' src="./AutoPlayer.styl">
</style>