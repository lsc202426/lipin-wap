<template>
    <div class="evaluateSuccess containerView-main">
        <!--顶部内容-->
        <div class="evaluate-success-top">
            <div class="title">
                <span class="title-icon" @click.stop="goEvaluateCon"></span>
                <span class="title-txt">感谢评价</span>
            </div>
            <div class="top-tip">
                <span class="tip-icon"></span>
                <span class="tip-txt">评价成功，感谢您！</span>
            </div>
            <div class="top-txt">
                您的评价将是其他用户选购前的重要参考
            </div>
            <div class="top-btn" @click.stop="goEvaluateCon">
                查看我的评价
            </div>
        </div>
        <!--继续评价-->
        <div class="continue-evaluate" v-if="lists&&lists.length>0">
            <div class="continue-evaluate-title f-bdb f-bgf">继续评价</div>
            <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :immediate-check="false"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            >
                <div class="continue-evaluate-list">
                    <div class="msg-list-item f-bgf" v-for="(item,index) in lists" :key="index">
                        <div class="item-con f-bdb">
                            <div class="item-con-img">
                                <img v-lazy="item.cover" alt="">
                            </div>
                            <div class="item-con-txt">
                                <div class="title">{{item.title}}</div>
                                <div class="txt-btn price" @click.stop="goPublish(item.id)">评价</div>
                            </div>
                        </div>
                    </div>
                    <van-divider dashed class="botton-line" v-if="finished&&lists&&lists.length>0">
                        没有更多了
                    </van-divider> 
                </div>
            </van-list>
        </div>
    </div>
</template>
<script>
export default {
    name:"evaluateSuccess",
    data() {
        return {
            border:false,
            leftArrow:true,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            lists:[],//列表数据
            type:0,//待评价状态
        }
    },
    created () {
        //初始化
        this.init(this.type,this.page);
    },
    methods: {
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
        //查看评价
        goEvaluateCon(){
            this.$router.push({
                path:'/evaluateContent',
                query:{
                    state:1
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