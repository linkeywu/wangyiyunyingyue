import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default  new Vuex.Store({
    state:{
        mapList:[],
        player:{
            isShowAlbum:false,
            album:[],
            index:null  //专辑的index
        },
        audio:{
            isShowAudio:false,
            albumList:[],   //歌曲列表
            index:null,     //第几首歌的下标
            albumImg:null,  //专辑歌手的头像，在热歌单曲中没有
            playerbg:null,  //播放器界面的背景图
            //专辑或单曲的index
            //如果 == null 表示播放单曲
            //如果 == 0 表示播放第1张专辑
            //如果 == 1 表示播放第2张专辑
            albumIndex:null
        }
    },
    mutations:{
        GETALL(state,payload){
            state.mapList = payload.mapList;
        },
        SHOWALBUM(state,payload){
            //控制点击显示专辑页面
            state.player.isShowAlbum = payload.isShowAlbum
            //给专辑页面传入整张专辑数据
            state.player.album = payload.album
            //专辑的下标
            state.player.index = payload.index
        },
        HIDEALBUM(state,payload){
            state.player.isShowAlbum = false
        },
        SHOWHIDEPLAYER(state,payload){
            //显示播放器
            state.audio.isShowAudio = !state.audio.isShowAudio;
        },
        //显示播放界面
        SHOWPLAYER(state,payload){
            //显示播放器
            state.audio.isShowAudio = payload.isShowAudio;
            //控制播放里面的 列表， 有可能是单曲 可能是专辑
            state.audio.albumList = payload.albumList;
            //点击显示播放器时，设置当前点击的是第几首歌曲
            state.audio.index = payload.index;
            //专辑或单曲作者的头像
            state.audio.albumImg = payload.albumImg;
            //当前播放器背景图
            state.audio.playerbg = payload.playerbg;
            //专辑或单曲的index
            //如果 == null 表示播放单曲
            //如果 == 0 表示播放第1张专辑
            //如果 == 1 表示播放第2张专辑
            state.audio.albumIndex = payload.albumIndex;
        },
        // 切换歌曲
        CHANGEMUSIC(state,payload){
            state.audio.index = payload.index;
            state.audio.playerbg = payload.playerbg;
            state.audio.albumImg = payload.albumImg;
        }
    },
    actions:{
        GETALL({commit}){
            //这里不能使用this，因为this是store的实例，而不是vue的实例
            Vue.axios.get("/static/data.json").then((res) => {
                commit('GETALL', res.data)
            })
        }
    }
})