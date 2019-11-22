<template>
    <div class="order giftList">
        <!--头部-->
        <nav-bar title="预选购礼品" :border=border :leftArrow=leftArrow></nav-bar>
        <div class="gift-list-content containerView-main">
            
            <!--头部右上角按钮-->
            <!-- <div class="title-right">
                <div class="icon-shopcart" @click="goShopCart"></div>
            </div> -->
            <!--内容-->
            <div class="msg-list">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :immediate-check="false"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                  >
                    <div class="f-bgf msg-list-box f-mgb" v-for="(list,index) in lists" :key="index">
                        <div class="order-item f-bdb">
                            <div class="order-item-top">
                                <div class="order-time">
                                    {{list.number}}
                                </div>
                                <div class="order-state price" v-if="list.pay_status=='待支付'&&list.status=='待审核'">
                                    {{list.status}}
                                </div>
                                <div class="order-state price" v-else-if="list.pay_status=='待支付'">
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
                                        <div class="num">{{order.product_count}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order-item-total">
                                共{{list.goods_num}}件商品 合计：￥<span>{{list.totle}}</span>
                            </div>
                        </div>
                        <div class="link-msg">
                            <div class="link-msg-item">
                                <span>客户名称：</span>
                                <span>{{list.account.contact}}</span>
                            </div>
                            <div class="link-msg-item">
                                <span>联系人：</span>
                                <span>{{list.account.contact_name}}</span>
                            </div>
                            <div class="link-msg-item">
                                <span>联系电话：</span>
                                <span>{{list.account.mobile_phone}}</span>
                            </div>
                            <div class="link-msg-item">
                                <span>申请时间：</span>
                                <span>{{list.created}}</span>
                            </div>
                        </div>
                    </div>
                </van-list>
                <van-divider dashed class="botton-line" v-if="finished&&lists&&lists.length>0">
                    没有更多了
                </van-divider> 
            </div>
            <!--暂无数据-->
            <no-data v-if="lists.length<=0"></no-data>
        </div>
    </div>
</template>
<script>
export default {
    name:'giftList',
    data() {
        return {
            border:false,
            leftArrow:true,
            loading: false, //是否触发加载
            finished: false, //数据加载完毕
            error:false,//若列表数据加载失败，将error设置成true即可显示错误提示，用户点击错误提示后会重新触发 load 事件
            page: 1, //页码
            lists:[],//列表信息
            status:0,//订单状态(0：全部1：待付款)
        }
    },
    created () {
        this.init(this.page);//初始化
    },
    watch: {

    },
    methods: {
        //初始化获取列表数据
        init(page){
            this.$axios.post(`/v1/home/applyOrderList?page=${page}&token=${sessionStorage.token}`,{
                status:this.status
            }).then((res)=>{
                let data=res.data.data;
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
            })
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
        },
    },
}
</script>