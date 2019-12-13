<template>
    <div class="evaluateContent containerView-main">
        <!--头部-->
        <nav-bar title="评价中心" url="/user" :border=border :leftArrow=leftArrow></nav-bar>
        <!--导航栏-->
        <van-tabs @change="onClick" 
        title-active-color="#FF6702" 
        title-inactive-color="#333"
        v-model="active"
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
                    <div class="msg-list-eva">
                        <div class="msg-list-item f-bgf" v-for="(item,index) in lists" :key="index" @click.stop="goDetail(item.id)">
                            <div class="item-con">
                                <div class="item-con-img">
                                    <img v-lazy="item.cover" alt="">
                                </div>
                                <div class="item-con-txt">
                                    <div class="title">{{item.title}}</div>
                                    <div class="num" v-if="type===1">
                                        <span>评分</span>
                                        <van-rate v-model="item.scores" color="#FF6A00" void-icon="star" size="0.26rem" gutter="0.06rem" void-color="#D9D9D9" allow-half readonly />
                                    </div>
                                    <div class="txt-btn price" @click.stop="goPublish(item.id)" v-if="type===0">评价</div>
                                </div>
                            </div>
                            <div v-if="type===1" class="item-text">{{item.content}}</div>
                        </div>
                        <!-- <div class="msg-list-item f-bgf" v-for="(list,index) in lists" :key="index">
                            
                        </div> -->
                        <van-divider dashed class="botton-line" v-if="finished&&lists&&lists.length>0">
                            没有更多了
                        </van-divider> 
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
        <!--暂无数据-->
        <div class="order">
            <no-data v-if="lists.length<=0"></no-data>
        </div>
    </div>
</template>
<script>
export default {
    name:'evaluateContent',
    data() {
        return {
            border:false,
            leftArrow:true,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            type:this.$route.query.state||0,//明细类型
            navTitle:[
                '待评价','已评价'
            ],
            lists:[],
            num:4,
            active:this.$route.query.state||0,//默认选中项
        }
    },
    created () {
        this.active=parseInt(this.active);
        this.init(this.type,this.page);//初始化
    },
    methods: {
        onClick(name, title) {//name是索引，title是标题
            //this.$toast(name,title);
            this.type=name;
            if(this.type===0&&this.$route.query.state){
                this.$router.push({
                    path:'/evaluateContent'
                })
            }
            this.lists=[];//先清空，再重新获取赋值
            this.page=1;//重新赋值获取页码
            this.finished=true;
            this.loading = false;
            this.init(this.type,this.page);
        },
        //获取初始数据
        init(i,page){
            this.$axios.post(`/v1/evaluate/list?page=${page}&token=${sessionStorage.token}`,{
                status:i
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
        //去发表评价
        goPublish(id){
            this.$router.push({
                path:'/publishEvaluate',
                query:{
                    id:id
                }
            })
        },
        //查看订单详情
        goDetail(id){
            if(this.type===1){
                this.$router.push({
                    path:'/evaluateDetail',
                    query:{
                        id:id
                    }
                })
            }
        },
        //下拉加载更多
        onLoad() {
            if(this.finished===false){
                this.loading=true;
                setTimeout(() => {
                    if(!this.error){
                        this.page += 1;
                    }
                    this.init(this.type,this.page);
                }, 1500);
            }
        },
    },
}
</script>