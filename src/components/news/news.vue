<template>
    <div class="news">
        <!--头部-->
        <nav-bar title="消息" :border=border :leftArrow=leftArrow></nav-bar>
        <!--导航栏-->
        <van-tabs @change="onClick" 
        title-active-color="#FF6702" 
        title-inactive-color="#333"
        swipeable
        >
            <van-tab :title="item" v-for="(item,index) in navTitle" :key="index">
                <div class="msg-list containerView-main">
                    <div class="msg-list-item f-bgf" v-for="(list,index) in lists" :key="index">
                        <div class="item-img">
                            <img v-lazy="logisticsImg" v-if="active==0" alt="">
                            <img v-lazy="noticeImg" v-if="active==1" alt="">
                        </div>
                        <div class="item-con">
                            <div class="title-and-time">
                                <span class="title">{{list.title}}</span>
                                <span class="time">{{list.time}}</span>
                            </div>
                            <div class="item-con-txt">{{list.text}}</div>
                        </div>
                    </div>
                    <van-divider dashed class="botton-line" v-if="lists.length>0">
                        没有更多了
                    </van-divider>
                    <!--暂无数据-->
                    <no-data v-if="lists.length<=0"></no-data>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name:'news',
    data() {
        return {
            border:false,
            leftArrow:true,
            logisticsImg:require("@/assets/images/icon_wuliuxiaoxi@2x.png"),//物流消息icon 
            noticeImg:require("@/assets/images/icon_tongzhixiaoxi@2x.png"),//通知消息icon
            navTitle:[
                '物流消息','通知消息'
            ],
            lists:[
                {
                    title:'您的礼品审核通过',
                    text:'您的小米电视 55英寸礼品已发货',
                    time:'昨天'
                },
                {
                    title:'您的礼品审核通过',
                    text:'您的小米电视 55英寸礼品已发货',
                    time:'18:09'
                },
                {
                    title:'您的礼品审核通过',
                    text:'您的小米电视 55英寸礼品已发货',
                    time:'18:09'
                }
            ],
            active:0,//选中项
        }
    },
    created () {
        
    },
    methods: {
        onClick(name, title) {//name是索引，title是标题
            this.active=name;
            this.$toast(name,title);
        }
    },
}
</script>