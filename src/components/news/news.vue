<template>
    <div class="news containerView-main">
        <!--头部-->
        <nav-bar title="消息" :url="url" :border=border :leftArrow=leftArrow></nav-bar>
        <!--导航栏-->
        <van-tabs @change="onClick" 
        title-active-color="#FF6702" 
        title-inactive-color="#333"
        swipeable
        >
            <van-tab :title="item" v-for="(item,index) in navTitle" :key="index">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                  >
                    <div class="msg-list">
                        <div @click.stop="goDetail(list.guid)" class="msg-list-item f-bgf" v-for="(list,index) in lists" :key="index">
                            <div class="item-img">
                                <img v-lazy="logisticsImg" v-if="active==0" alt="">
                                <img v-lazy="noticeImg" v-if="active==1" alt="">
                                <div class="item-img-read" v-if="list.is_read!='是'"></div>
                            </div>
                            <div class="item-con">
                                <div class="title-and-time">
                                    <span class="title">{{list.title}}</span>
                                    <span class="time">{{list.time}}</span>
                                </div>
                                <div class="item-con-txt">{{list.content}}</div>
                            </div>
                        </div>
                        <van-divider dashed class="botton-line" v-if="finished&&lists&&lists.length>0">
                            没有更多了
                        </van-divider> 
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
        <!--暂无数据-->
        <no-data v-if="lists.length<=0"></no-data>
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
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            navTitle:[
                '物流消息','通知消息'
            ],
            lists:[],
            active:0,//选中项
            url:sessionStorage.beforPath?sessionStorage.beforPath:'/'
        }
    },
    created () {
        this.init(this.page);//初始化
    },
    methods: {
        //初始化获取列表数据
        init(page){
            this.$axios.post(`/v1/home/message?page=${page}&token=${sessionStorage.token}`,{
                type:this.active
            }).then((res)=>{
                let data=res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.lists=data.list;
                    } else {
                        this.lists.push.apply(this.lists, data.list);
                    }
                    //加载状态结束
                    this.loading = false;
                    //数据全部加载完成
                    if (this.lists.length==data.totalCount) {
                        this.finished = true;
                    }else{
                        this.finished=false;
                    }
                }else{
                    this.error=true;
                }
            })
        },
        onClick(name, title) {//name是索引，title是标题
            this.active=name;
            this.page=1;//重新赋值获取页码
            this.finished=true;
            this.loading = false;
            this.init(this.page);
        },
        //前往消息详情
        goDetail(id){
            this.$router.push({
                path:'/newsDetail',
                query:{
                    id:id
                }
            })
        },
        //下拉加载更多
        onLoad() {
            if(this.finished===false){
                this.loading=true;
                setTimeout(() => {
                    if(!this.error){
                        this.page += 1;
                    }
                    this.init(this.page);
                }, 1500);
            }
        },
    },
}
</script>