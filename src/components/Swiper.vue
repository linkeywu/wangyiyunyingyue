<template>
    <div>
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in swiperArr" :key="index">
                <img :src="item.url" >
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
    </div>
</template>
<script>
export default {
    props:["swiperArr"],
    data() {
        return {
            //使用轮播图小圆点
            swiperOption: {
                pagination:{
                    el:'.swiper-pagination'
                }
            }
        }
    },
}
</script>
<style scoped>
    img{width: 100%;display: block;}
</style>
