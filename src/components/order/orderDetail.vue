<template>
    <div class="orderDetail">
        <div class="order-detail-content containerView-main">
            <!--头部-->
            <div class="settle-top">
                <div class="settle-title">
                    <span class="go-back" @click.stop="goBack"></span>
                    <div class="title">订单详情</div>
                </div>
                <div class="order-detail-title" v-if="orderInfo.pay_status=='待支付'">
                    {{orderInfo.pay_status}}
                </div>
                <div class="order-detail-title" v-else>
                    {{orderInfo.status}}
                </div>
            </div>
            <!--地址信息-->
            <div class="detail-address f-bgf f-mgb" v-if="addressInfo">
                <div class="detail-address-img">
                    <img :src="img" alt="">
                </div>
                <div class="detail-address-txt">
                    <div class="txt-name">
                        <span class="name">{{addressInfo.name}}</span>
                        <span class="phone">{{addressInfo.cellphone}}</span>
                    </div>
                    <div class="txt-address">
                        {{addressInfo.address}}
                    </div>
                </div>
            </div>
            <!--商品信息-->
            <div class="detail-goods f-mgb f-bgf">
                <div class="detail-goods-title">商品信息</div>
                <div class="detail-goods-item" v-for="(item,index) in orderInfo.order_product" :key="index">
                    <div class="item-img-box">
                        <img v-lazy="$config.api.public_domain+item.cover" alt="">
                    </div>
                    <div class="item-con-box">
                        <div class="item-con-title">
                            <div class="title">{{item.product_name}}</div>
                            <div class="con-price">
                                <span>￥</span>{{item.totle}}
                            </div>
                        </div>
                        <div class="item-con-type">
                            <div>{{item.spec}}</div>
                            <div>x {{item.product_count}}</div>
                        </div>
                    </div>
                </div>
                <div class="f-bdb">
                    <div class="detail-goods-rules">
                        <span>运费</span>
                        <span>￥0.00</span>
                    </div>
                    <div class="detail-goods-rules">
                        <span>积分支付</span>
                        <span>{{orderInfo.integral}}</span>
                    </div>
                    <div class="detail-goods-rules">
                        <span>实付款（含运费）</span>
                        <span>￥{{orderInfo.realsum}}</span>
                    </div>
                </div>
                <div class="detail-goods-total">
                    合计：<span class="total-num"><span>￥</span>{{orderInfo.totle}}</span>
                </div>
            </div>
            <!--订单信息-->
            <div class="detail-msg f-mgb f-bgf">
                <div class="detail-msg-title">订单信息</div>
                <div class="detail-msg-item">
                    <span>订单编号</span>
                    <span>{{orderInfo.number}}</span>
                </div>
                <div class="detail-msg-item">
                    <span>创建时间</span>
                    <span>{{orderInfo.created}}</span>
                </div>
            </div>
        </div>
        <!--底部按钮-->
        <div class="detail-bottom f-bgf">
            <div v-if="orderInfo.pay_status=='支付成功'&&(orderInfo.status=='已发货'||orderInfo.status=='已完成')" class="detail-bottom-btn" @click.stop="goLogistics(orderInfo.id)">查看物流</div>
            <div v-if="orderInfo.pay_status=='待支付'" class="detail-bottom-btn price" @click.stop="goPay(orderInfo.id)">去付款</div>
            <div v-if="orderInfo.pay_status=='支付成功'&&orderInfo.status=='已发货'" class="detail-bottom-btn price" @click.stop="confirmReceipt(orderInfo.id)">确认收货</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'orderDetail',
    data() {
        return {
            img:require('@/assets/images/icon_kuaidixinxi1@2x.png'),
            addressInfo:{},//地址信息
            orderInfo:{},//订单信息
        }
    },
    created () {
        this.init();//初始化
    },
    methods: {
        //返回订单列表
        goBack() {
            this.$router.push({
                path:'/order'
            })
        },
        //初始化获取数据
        init(){
            this.$axios.post('/v1/home/orderDetail',{
                order_id:this.$route.query.id
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.addressInfo=data.address_info;
                    this.orderInfo=data.order_info;
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
            sessionStorage.beforPath='orderDetail';
            this.$router.push({
                path:'/settle',
                query:{
                    id:id
                }
            })
        },
        //确认收货
        confirmReceipt(id){
            this.$axios.post('/v1/home/confirmTake',{
                order_id:id
            }).then((res)=>{
                let data=res.data.data;
                if(data.code===1000){
                    this.$toast({
                        message:'确认收货成功',
                        forbidClick:true
                    });
                    setTimeout(() => {
                        this.init();
                    }, 2000);
                }
            })
        },
    },
}
</script>