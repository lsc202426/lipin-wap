<template>
    <div class="paySuccess">
        <!--头部-->
        <nav-bar :title="title" :border=border :leftArrow=leftArrow></nav-bar>
        <!--内容-->
        <div class="pay-content containerView-main">
            <div class="pay-content-bg" :class="{'pay-content-bg-fail':payTxt!='支付成功'&&payTxt=='待支付'}">
                <img :src="payBgImg" alt="">
            </div>
            <div class="pay-content-title">订单{{payTxt}}</div>
            <div class="pay-content-price">
                订单金额：<span class="price">￥{{price}}</span>
            </div>
            <div class="pay-content-btn">
                <div @click.stop="goDetail" class="seet-order f-bgc1">查看订单</div>
                <div @click.stop="goIndex" class="go-index">回首页</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'paySuccess',
    data() {
        return {
            title:'支付结果',
            border:true,
            leftArrow:false,
            payBgImg:require("@/assets/images/paySuccess_bg.png"),
            payTxt:'支付成功',//订单支付结果
            price:0,
        }
    },
    created () {
        localStorage.removeItem('orderId');
        this.init();//初始化
    },
    mounted() {
        //禁用浏览器返回
        (function(){
            if(window.history && window.history.pushState) {
                window.onpopstate=function () {
                        window.history.pushState('forward', null, '');
                        window.history.forward(1);
                };
            }
            window.history.pushState('forward', null, '');//在IE中必须得有这两行
            window.history.forward(1);
        })();
    },
    methods: {
        //初始化获取支付结果
        init() {
            if(this.$route.query.id){
                let id=this.$route.query.id;
                this.$axios.post('/v1/pay/getSuccess',{
                    transaction_id:id
                }).then((res)=>{
                    let data=res.data.data;
                    this.payTxt=data.status;
                    this.price=data.price;
                    if(this.payTxt=='支付成功'||this.payTxt=='待支付'){
                        this.payBgImg=require("@/assets/images/paySuccess_bg.png");
                    }else{
                        this.payBgImg=require("@/assets/images/pay_fail.png");
                    }
                    console.log(data);
                })
            }
        },
        //查看订单
        goDetail(){
            this.$router.push({
                path:'/orderDetail',
                query:{
                    id:this.$route.query.id
                }
            })
        },
        //返回首页
        goIndex(){
            this.$router.push({
                path:'/'
            })
        }
    },
}
</script>