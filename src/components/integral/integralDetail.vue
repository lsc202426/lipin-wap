<template>
    <div class="integralDetail containerView-main">
        <!--头部-->
        <nav-bar title="积分明细" :border=border :leftArrow=leftArrow></nav-bar>
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
                        <div class="msg-list-item f-bgf" v-for="(list,index) in lists" :key="index">
                            <div class="item-con">
                                <div class="title-and-time">
                                    <span class="title">{{list.memo}}</span>
                                </div>
                                <div class="item-con-txt">{{list.created}}</div>
                            </div>
                            <div class="item-price">
                                <span class="price">
                                    {{list.integral}}
                                </span>
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
    name:'integralDetail',
    data() {
        return {
            border:false,
            leftArrow:true,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            type:1,//明细类型
            navTitle:[
                '消费明细','充值明细'
            ],
            lists:[]
        }
    },
    created () {
        this.init(this.type,this.type);//初始化
    },
    methods: {
        onClick(name, title) {//name是索引，title是标题
            //this.$toast(name,title);
            if(name===0){
                this.type=1;
            }else if(name===1){
                this.type=2;
            }
            this.page=1;//重新赋值获取页码
            this.finished=true;
            this.loading = false;
            this.init(this.type,this.page);
        },
        //获取初始数据
        init(i,page){
            this.$axios.post(`/v1/home/integralDetail?page=${page}`,{
                type:i
            }).then((res)=>{
                let data=res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.lists=data.integral_record;
                    } else {
                        this.lists.push.apply(this.lists, data.integral_record);
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
        //下拉加载更多
        onLoad() {
            if(this.finished===false){
                console.log(2)
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