<template>
    <div class="order containerView-main">
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
                        <div class="order-item f-bgf" @click="goDetail(list.id)" v-for="(list,index) in lists" :key="index">
                            <div class="order-item-top">
                                <div class="order-time">
                                    {{list.created}}
                                </div>
                                <div class="order-state price" v-if="list.pay_status=='待支付'">
                                    {{list.pay_status}}
                                </div>
                                <div class="order-state price" v-else>
                                    {{list.status}}
                                </div>
                            </div>
                            <div class="order-item-pro" v-for="(order,index) in list.order_product" :key="index">
                                <div class="order-img">
                                    <img v-lazy="$config.api.public_domain+order.cover" alt="">
                                </div>
                                <div class="order-txt">
                                    <div class="order-title">
                                        <div class="title">{{order.product_name}}</div>
                                        <div class="num"><span>￥</span>{{order.totle}}</div>
                                    </div>
                                    <div class="order-specs">
                                        <div class="specs">{{order.spec}}</div>
                                        <div class="num">x {{order.product_count}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-item-total">
                                共{{list.goods_num}}件商品 合计：￥<span>{{list.totle}}</span>
                            </div>
                            <div class="order-item-btn">
                                <div v-if="list.pay_status=='支付成功'&&(list.status=='已发货'||list.status=='已完成')" class="order-btn order-btn-gay" @click.stop="goLogistics(list.id)">查看物流</div>
                                <div v-if="list.pay_status=='待支付'" class="order-btn order-btn-colour" @click.stop="goPay(list.id)">去付款</div>
                                <div v-if="list.pay_status=='支付成功'&&list.status=='已发货'" class="order-btn order-btn-colour" @click.stop="confirmReceipt(list.id)">确认收货</div>
                            </div>
                        </div>
                        <!--暂无数据-->
                        <no-data v-if="lists.length<=0"></no-data>
                    </div>
                </van-list>
                <van-divider dashed class="botton-line" v-if="finished&&lists&&lists.length>0">
                    没有更多了
                </van-divider> 
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
            lists:[],
            active:this.$route.query.state||0,//选中项
        }
    },
    created () {
        if(this.$route.query.token){
            sessionStorage.token=this.$route.query.token;
            this.$router.push({
                path:'/order'
            })
        }
        setTimeout(() => {
            this.active=parseInt(this.active);
            this.init(this.page);//初始化
        }, 50);
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
            this.$axios.post(`/v1/home/orderList?page=${page}&token=${sessionStorage.token}`,{
                status:this.active,//订单状态
            }).then(res => {
                let data = res.data.data;
                if (data.code === 1000) {
                    if (page <= 1) {
                        this.lists = data.list;
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
            });
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
            this.finished=true;
            this.loading = false;
            this.init(this.page);
        },
        //前往购物车
        goShopCart(){
            this.$router.push({
                path:'/shopCart'
            })
        },
        //前往订单详情
        goDetail(id){
            this.$router.push({
                path:'/orderDetail',
                query:{
                    id:id
                }
            })
        },
        //前往查看物流
        goLogistics(id){
            this.$router.push({
                path:'/logistics',
                query:{
                    id:id
                }
            })
        },
        //去付款
        goPay(id){
            sessionStorage.beforPath='order';
            window.location.href =`${this.$config.api.public_english_url}/settle?id=${id}&token=${sessionStorage.token}&beforPath=order`;
            // this.$router.push({
            //     path:'/settle',
            //     query:{
            //         id:id
            //     }
            // })
        },
        //确认收货
        confirmReceipt(id){
            this.$axios.post(`/v1/home/confirmTake?token=${sessionStorage.token}`,{
                order_id:id
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:'确认收货成功',
                        forbidClick:true
                    });
                    setTimeout(() => {
                        this.page=1;
                        this.finished=true;
                        this.loading=false;
                        this.init(this.page);
                    }, 2000);
                }
            })
            //console.log('确认收货啦')
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