<template>
    <div class="order">
        <!--头部-->
        <nav-bar title="我的订单" url="/user" :border=border :leftArrow=leftArrow></nav-bar>
        <!--头部右上角按钮-->
        <div class="title-right">
            <div class="icon-shopcart" @click="goShopCart"></div>
        </div>
        <!--导航栏-->
        <van-tabs @change="onClick" 
        title-active-color="#FF6702" 
        title-inactive-color="#333"
        swipeable
        v-model="active"
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
                        <div class="order-item f-bgf" v-for="(list,index) in lists" :key="index">
                            <div class="order-item-top">
                                <div class="order-time">
                                    {{list.time}}
                                </div>
                                <div class="order-state price">
                                    {{list.state}}
                                </div>
                            </div>
                            <div class="order-item-pro" v-for="(order,index) in list.product" :key="index">
                                <div class="order-img">
                                    <img v-lazy="order.img" alt="">
                                </div>
                                <div class="order-txt">
                                    <div class="order-title">
                                        <div class="title">{{order.title}}</div>
                                        <div class="num"><span>￥</span>{{order.price}}</div>
                                    </div>
                                    <div class="order-specs">
                                        <div class="specs">{{order.specs}}</div>
                                        <div class="num">{{order.num}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-item-total">
                                共{{list.sum}}件商品 合计：￥<span>{{list.total}}</span>
                            </div>
                            <div class="order-item-btn">
                                <div class="order-btn order-btn-gay">查看物流</div>
                                <div class="order-btn order-btn-colour">去付款</div>
                                <div class="order-btn order-btn-colour">确认收货</div>
                            </div>
                        </div>
                        <van-divider dashed class="botton-line" v-if="lists.length>0">
                            没有更多了
                        </van-divider>
                        <!--暂无数据-->
                        <no-data v-if="lists.length<=0"></no-data>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    name:'order',
    data() {
        return {
            border:false,
            leftArrow:true,
            navTitle:[
                '全部','待付款','待收货'
            ],
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            lists:[
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
                {
                    time:'2017-05-23 22:16:58',
                    state:'已出库',
                    total:7899,
                    sum:2,
                    product:[
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        },
                        {
                            title:'小米电视4A 70英寸',
                            specs:'黑色',
                            price:3799,
                            num:1,
                            img:require("@/assets/images/05.png"),
                        }
                    ]
                },
            ],
            active:this.$route.query.state||0,//选中项
        }
    },
    created () {
        this.active=parseInt(this.active);
        this.init(this.page);//初始化
    },
    watch: {
        // active:function(val){

        // },
        // '$route.query.state':function(val){
        //     // console.log(val,this.active);
        //     this.active=parseInt(val);
        // }
    },
    methods: {
        //初始化获取数据
        init(page){
            // this.$axios.post(`v1/goods/list?page=${page}`,{
            //     category_id:this.proId,//分类id
            // }).then(res => {
            //     let data = res.data.data;
            //     if (data.code === 1000) {
            //     if (page <= 1) {
            //         this.listItem = data.list;
            //     } else {
            //         this.listItem.push.apply(this.listItem, data.list);
            //     }
            //     //加载状态结束
            //     this.loading = false;
            //     //数据全部加载完成
            //     if (this.listItem.length==data.totalCount) {
            //         this.finished = true;
            //     }
            //     }else{
            //         this.error=true;
            //     }
            // });
        },
        //状态栏点击
        onClick(name, title) {//name是索引，title是标题
            this.active=name;
            this.$router.push({
                path:'/order',
                query:{
                    state:name,
                }
            })
            this.page=1;//重新赋值获取页码
            this.init(this.page);
        },
        //前往购物车
        goShopCart(){
            this.$router.push({
                path:'/shopCart'
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
        }
    },
}
</script>