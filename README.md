# 网易云音乐 #

----------

它会成为用vue实现网易云音乐最全的webapp，我们的目标是更像，更快，更优雅

友情提示：老用户更新可能需要重新npm install，开启webpack2新征程

## 技术栈 ##
- Vue2：采用最新Vue2的语法
- Vuex：管理公共组件状态量
- vue-router：管理单页面应用路由
- axios：发起http请求
- stylus：css预处理语言
- Express：vue-cli使用Express做服务器。
- Webpack：自动化构建工具，主要配置vue-cli脚手架提供。
- ES6：采用ES6语法。
- CSS3：CSS3动画及样式。
## 功能介绍 ##

网易云（轮播，推荐专辑，热歌列表）
播放页面（歌词逐字播放，碟片切换）
歌手，专辑，歌单，用户等详情展示
音乐播放功能（切歌，播放列表，播放进度显示）
## 安装运行（安装运行前请确定已安装node环境） ##
环境安装：npm install
启动服务：npm run dev
## 功能效果图 ##
![](https://github.com/linkeywu/wangyiyunyingyue/blob/master/assets/index_md.png)  ![](https://github.com/linkeywu/wangyiyunyingyue/blob/master/assets/zj.jpg)
![](https://github.com/linkeywu/wangyiyunyingyue/blob/master/assets/bof.jpg) ![](https://github.com/linkeywu/wangyiyunyingyue/blob/master/assets/gc.jpg)

## 项目构成 ##
- ├── build                    // 构建服务和webpack配置
- ├── config            		 // 项目不同环境的配置
- ├── dist               		 // 项目build目录
- ├── index.html          	 // 项目入口文件
- ├── package.json      		 // 项目配置文件
- ├── static       			 // 放置静态资源
- ├── src                		 // 生产目录
- │   ├── components       		// 各种组件
- │   ├── plugins              // 插件
- │   ├── router          	// 路由配置器
- │   ├── store     		// vuex状态管理器
- │   ├── views             // 各个视图           	   
- │   ├── App.vue         	// 主页面
- │   └── main.js       	// Webpack 预编译入口

## 安装运行（安装运行前请确定已安装node环境） ##
- 环境安装：npm install
- 启动服务：npm run dev
